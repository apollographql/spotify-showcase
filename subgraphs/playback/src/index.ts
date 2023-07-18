import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginSubscriptionCallback } from '@apollo/server/plugin/subscriptionCallback';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import resolvers from './resolvers';
import { ContextValue } from './types/ContextValue';
const port = process.env.PORT ?? '4002';
const routerSecret = process.env.ROUTER_SECRET;
import { addMocksToSchema } from '@graphql-tools/mock';
import morgan from 'morgan';

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import chalk from 'chalk';

import express from 'express';
import http from 'http';
import { readEnv } from './utils/env';
import SpotifyAPI from './dataSources/spotify';
import { json } from 'body-parser';
import cors from 'cors';
import { GraphQLError, execute, parse } from 'graphql';
import { MockedSpotifyDataSource, mocks } from './utils/mocks';
import logger from './logger';

morgan.token('operationName', (req) => {
  return chalk.blue(req.body.operationName);
});

morgan.token('variables', (req) => {
  if (!req.body.variables) {
    return '';
  }

  return JSON.stringify({ variables: req.body.variables });
});

const loggerMiddleware = morgan(
  ':method :url :status :response-time ms :operationName :variables',
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  }
);

async function main() {
  let typeDefs = gql(
    readFileSync('schema.graphql', {
      encoding: 'utf-8',
    })
  );
  const schema = buildSubgraphSchema({
    typeDefs,
    resolvers,
  });
  const app = express();
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/ws',
  });
  const defaultCountryCode = readEnv('DEFAULT_COUNTRY_CODE', {
    defaultValue: 'US',
  });
  const serverCleanup = useServer(
    {
      schema,
      onConnect: (ctx) => {
        if (ctx.connectionParams?.['authorization']) return true;
        if (ctx.extra.request.headers?.['authorization']) return true;

        //If there is no authorization, we will mock everything and use the remote/local address for the users identifier in local mocked data
        if (
          ctx.extra.request.socket.remoteAddress ||
          ctx.extra.request.socket.localAddress
        )
          return true;

        return false;
      },
      context: (ctx) => {
        const routerAuthorization =
          (ctx.connectionParams?.['authorization'] as string) ??
          (ctx.extra.request.headers?.['authorization'] as string) ??
          '';
        checkRouterSecret(routerAuthorization);
        const token =
          (ctx.connectionParams?.['authorization'] as string) ??
          (ctx.extra.request.headers?.['authorization'] as string);

        if (!token) {
          const userIdForMocks =
            ctx.extra.request.socket.remoteAddress ??
            ctx.extra.request.socket.localAddress ??
            'default';

          MockedSpotifyDataSource.instance().addUser(userIdForMocks);

          return {
            defaultCountryCode,
            dataSources: {
              spotify: MockedSpotifyDataSource.instance(),
            },
            userIdForMocks,
          };
        }

        return {
          defaultCountryCode,
          dataSources: {
            spotify: new SpotifyAPI({
              cache: callbackApolloServer.cache,
              token,
            }),
          },
        };
      },
    },
    wsServer
  );

  // We currently are building 2 instances of Apollo Server to host subscriptions
  // in both callback and websocket form.
  //
  // The Cloud Apollo Router offering currently only support websockets while the
  // self-hosted Enterprise Apollo Router also support the HTTP callback protocol
  // https://www.apollographql.com/docs/router/executing-operations/subscription-callback-protocol
  //
  // You would normally only want to implement one of these
  // You cannot run callback subscriptions and websocket subscriptions in the same Apollo Server instance
  const callbackApolloServer = new ApolloServer<ContextValue>({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginSubscriptionCallback({ logger })],
  });
  const wsApolloServer = new ApolloServer<ContextValue>({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({
            embed: { endpointIsEditable: true },
          }),
    ],
  });

  await callbackApolloServer.start();
  await wsApolloServer.start();

  const context = async ({ req }) => {
    checkRouterSecret(req.headers['router-authorization'] as string);
    const token = req.get('authorization');

    if (!token) {
      const userIdForMocks = req.ip ?? 'default';
      MockedSpotifyDataSource.instance().addUser(userIdForMocks);

      return {
        defaultCountryCode,
        dataSources: {
          spotify: MockedSpotifyDataSource.instance(),
        },
        //This is for mocking responses if user doesn't have Spotify token
        userIdForMocks,
      };
    }

    return {
      defaultCountryCode,
      dataSources: {
        spotify: new SpotifyAPI({
          cache: callbackApolloServer.cache,
          token,
        }),
      },
    };
  };

  app.use(loggerMiddleware);

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(callbackApolloServer, {
      context,
    })
  );
  app.use(
    '/',
    cors(),
    json(),
    expressMiddleware(wsApolloServer, {
      context,
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 Subscription endpoint ready at ws://localhost:${port}`);
}

function checkRouterSecret(secret: string) {
  if (routerSecret && secret !== routerSecret) {
    throw new GraphQLError('Missing router authentication', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
}

main();
