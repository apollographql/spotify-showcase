import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import {
  ApolloServer,
  GraphQLResponse,
  ApolloServerPlugin,
} from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from './resolvers';
import { ContextValue } from './types/ContextValue';
const port = process.env.PORT ?? '4001';
const routerSecret = process.env.ROUTER_SECRET;
import { addMocksToSchema } from '@graphql-tools/mock';
import morgan from 'morgan';
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
import { server } from './utils/server';

morgan.token('operationName', (req) => {
  if (!req?.body?.operationName) {
    return '';
  }

  return chalk.blue(req.body.operationName);
});

morgan.token('variables', (req) => {
  if (!req?.body?.variables) {
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
  const app = express();
  const httpServer = http.createServer(app);
  const defaultCountryCode = readEnv('DEFAULT_COUNTRY_CODE', {
    defaultValue: 'US',
  });

  await server.start();

  app.use(loggerMiddleware);

  app.use(
    '/',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        checkRouterSecret(req.headers['router-authorization'] as string);
        const token = req.get('authorization');

        if (!token) {
          const userIdForMocks = req.get('referer') ?? 'default';

          return {
            defaultCountryCode,
            dataSources: {
              spotify: new MockedSpotifyDataSource(userIdForMocks),
            },
          };
        }

        return {
          defaultCountryCode,
          dataSources: {
            spotify: new SpotifyAPI({
              cache: server.cache,
              token,
            }),
          },
        };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 GraphQL endpoint ready at http://localhost:${port}`);
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
