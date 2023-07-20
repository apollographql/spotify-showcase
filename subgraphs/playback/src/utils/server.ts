import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginSubscriptionCallback } from '@apollo/server/plugin/subscriptionCallback';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import resolvers from '../resolvers';
import { ContextValue } from '../types/ContextValue';
const port = process.env.PORT ?? '4002';
const routerSecret = process.env.ROUTER_SECRET;

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import SpotifyAPI from '../dataSources/spotify';
import { GraphQLError } from 'graphql';
import { MockedSpotifyDataSource, addUser } from '../utils/mocks';
import logger from '../logger';

export const app = express();
export const httpServer = http.createServer(app);

let typeDefs = gql(
  readFileSync('schema.graphql', {
    encoding: 'utf-8',
  })
);
const schema = buildSubgraphSchema({
  typeDefs,
  resolvers,
});
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/ws',
});
const serverCleanup = useServer(
  {
    schema,
    onConnect: (ctx) => {
      console.log(JSON.stringify(ctx));
      if (ctx.connectionParams?.['authorization']) return true;
      if (ctx.extra.request.headers?.['authorization']) return true;

      //If there is no authorization, we will mock everything and use the referer for the users identifier in local mocked data
      if (ctx.extra.request.headers?.referer) return true;

      //For local developmentt
      if (ctx.extra.request.headers?.host) return true;

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

      const defaultCountryCode =
        (ctx.connectionParams?.['country-code'] as string) ??
        (ctx.extra.request.headers?.['country-code'] as string) ??
        'US';

      if (!token) {
        const userIdForMocks =
          ctx.extra.request.headers?.referer ??
          ctx.extra.request.headers?.host ??
          'default';
        addUser(userIdForMocks);

        return {
          defaultCountryCode,
          dataSources: {
            spotify: new MockedSpotifyDataSource(userIdForMocks),
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

export const callbackApolloServer = new ApolloServer<ContextValue>({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginSubscriptionCallback({ logger })],
});
export const wsApolloServer = new ApolloServer<ContextValue>({
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

export function checkRouterSecret(secret: string) {
  if (routerSecret && secret !== routerSecret) {
    throw new GraphQLError('Missing router authentication', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
}
