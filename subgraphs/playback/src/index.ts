import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer, GraphQLResponse } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginSubscriptionCallback } from '@apollo/server/plugin/subscriptionCallback';
import resolvers from './resolvers';
import { ContextValue } from './types/ContextValue';
const port = process.env.PORT ?? '4002';
const subgraphName = require('../package.json').name;
const routerSecret = process.env.ROUTER_SECRET;
import { addMocksToSchema } from '@graphql-tools/mock';

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { TOPICS } from './utils/constants';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import { PubSub } from 'graphql-subscriptions';
import { readEnv } from './utils/env';
import SpotifyAPI from './dataSources/spotify';
import Publisher from './publisher';
import { json } from 'body-parser';
import cors from 'cors';
import { GraphQLError, execute, parse } from 'graphql';
import { mocks } from './utils/mocks';

const logger = {
  debug(msg) {
    console.log(msg);
  },
  info(msg) {},
  warn(msg) {},
  error(msg) {
    console.log(msg);
  },
};

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
  const pubsub = new PubSub();
  const defaultCountryCode = readEnv('DEFAULT_COUNTRY_CODE', {
    defaultValue: 'US',
  });
  const mockPlugin = {
    async requestDidStart() {
      return {
        responseForOperation: async (operation) => {
          const { request, contextValue } = operation;
          if (!contextValue.mock) return;

          const { query, variables, operationName } = request;
          const response = await execute({
            schema: addMocksToSchema({
              schema: buildSubgraphSchema({ typeDefs }),
              mocks,
              preserveResolvers: true,
            }),
            document: parse(query),
            contextValue,
            variableValues: variables,
            operationName,
          });

          return {
            http: request.http,
            body: { kind: 'single', singleResult: response },
          } as GraphQLResponse;
        },
      };
    },
  };
  const serverCleanup = useServer(
    {
      schema,
      onConnect: (ctx) => {
        if (ctx.connectionParams?.['authorization']) return true;
        if (ctx.extra.request.headers?.['authorization']) return true;
        return false;
      },
      onDisconnect: () => {
        pubsub.publish(TOPICS.DISCONNECT, true);
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
        return {
          defaultCountryCode,
          publisher: new Publisher(pubsub),
          pubsub,
          dataSources: {
            spotify: new SpotifyAPI({
              cache: wsApolloServer.cache,
              token,
            }),
          },
          mock: token ? false : true,
        } satisfies ContextValue;
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
    plugins: [mockPlugin, ApolloServerPluginSubscriptionCallback({ logger })],
  });
  const wsApolloServer = new ApolloServer<ContextValue>({
    schema,
    introspection: true,
    plugins: [
      mockPlugin,
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
    ],
  });

  await callbackApolloServer.start();
  await wsApolloServer.start();

  const context = async ({ req }) => {
    checkRouterSecret(req.headers['router-authorization'] as string);
    const token = req.get('authorization');

    return {
      defaultCountryCode,
      dataSources: {
        spotify: new SpotifyAPI({
          cache: callbackApolloServer.cache,
          token,
        }),
      },
      publisher: new Publisher(pubsub),
      pubsub,
      mock: token ? false : true,
    };
  };

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
