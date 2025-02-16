import { existsSync, readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { ApolloServerPluginSubscriptionCallback } from '@apollo/server/plugin/subscriptionCallback';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import { addSyntheticsToSchema } from '@shared/field-synthetics';
import resolvers from '../resolvers';
import { ContextValue } from '../types/ContextValue';
const routerSecret = process.env.ROUTER_SECRET;

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import { GraphQLError } from 'graphql';
import { MockSpotifyClient, SpotifyClient } from 'spotify-api';
import logger from '../logger';
import * as Sentry from '@sentry/node';
import { resolve } from 'path';

export const app = express();
export const httpServer = http.createServer(app);

const schemaPath = existsSync('schema.graphql')
  ? 'schema.graphql'
  : resolve('subgraphs', 'playback', 'schema.graphql');

const typeDefs = gql(
  readFileSync(schemaPath, {
    encoding: 'utf-8',
  })
);

const schema = addSyntheticsToSchema(
  buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/ws',
});
const serverCleanup = useServer(
  {
    schema,
    onConnect: (ctx) => {
      if (ctx.connectionParams?.['authorization']) return true;
      if (ctx.extra.request.headers?.['authorization']) return true;

      //If there is no authorization, we will mock everything and use the referer for the users identifier in local mocked data
      return true;
    },
    context: (ctx) => {
      const routerAuthorization =
        (ctx.connectionParams?.['authorization'] as string) ??
        ctx.extra.request.headers?.['authorization'] ??
        '';
      checkRouterSecret(routerAuthorization);
      const token =
        (ctx.connectionParams?.['authorization'] as string) ??
        ctx.extra.request.headers?.['authorization'];

      const defaultCountryCode =
        (ctx.connectionParams?.['country-code'] as string) ??
        (ctx.extra.request.headers?.['country-code'] as string) ??
        'US';

      if (!token) {
        const userIdForMocks =
          ctx.extra.request.rawHeaders['x-graphos-id'] ??
          ctx.connectionParams?.['x-graphos-id'] ??
          ctx.extra.request.headers?.['x-graphos-id'] ??
          'default';

        return {
          defaultCountryCode,
          dataSources: {
            spotify: new MockSpotifyClient(userIdForMocks),
          },
          userIdForMocks,
        };
      }

      return {
        defaultCountryCode,
        dataSources: {
          spotify: new SpotifyClient({
            cache: callbackApolloServer.cache,
            token,
          }),
        },
      };
    },
  },
  wsServer
);

const sentryPlugin: ApolloServerPlugin<ContextValue> = {
  // eslint-disable-next-line @typescript-eslint/require-await
  async requestDidStart() {
    return {
      // eslint-disable-next-line @typescript-eslint/require-await
      async didEncounterErrors(ctx) {
        for (const err of ctx.errors) {
          if (err.extensions?.code == 'GRAPHQL_VALIDATION_FAILED') {
            Sentry.withScope((scope) => {
              // Annotate whether failing operation was query/mutation/subscription
              scope.setTag('message', err.message);
              // Log query and variables as extras
              // (make sure to strip out sensitive data!)
              scope.setExtra('query', ctx.request.query);
              scope.setExtra('variables', ctx.request.variables);
              if (err.path) {
                // We can also add the path as breadcrumb
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: 'debug',
                });
              }
              Sentry.captureException(err);
            });
          } else if (!ctx.operation) {
            return;
          } else {
            Sentry.withScope((scope) => {
              // Annotate whether failing operation was query/mutation/subscription
              scope.setTag('kind', ctx.operation.operation);
              // Log query and variables as extras
              // (make sure to strip out sensitive data!)
              scope.setExtra('query', ctx.request.query);
              scope.setExtra('variables', ctx.request.variables);
              if (err.path) {
                // We can also add the path as breadcrumb
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: 'debug',
                });
              }
              Sentry.captureException(err);
            });
          }
        }
      },
    };
  },
};

export const callbackApolloServer = new ApolloServer<ContextValue>({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginSubscriptionCallback({
      logger,
    }),
    sentryPlugin,
  ],
});
export const wsApolloServer = new ApolloServer<ContextValue>({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      // eslint-disable-next-line @typescript-eslint/require-await
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
    sentryPlugin,
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
