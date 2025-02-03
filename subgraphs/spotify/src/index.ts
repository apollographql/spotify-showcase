import { expressMiddleware } from '@apollo/server/express4';
import morgan from 'morgan';
import chalk from 'chalk';

import express from 'express';
import http from 'http';
import { readEnv } from './utils/env';
import { json } from 'body-parser';
import cors from 'cors';
import { GraphQLError } from 'graphql';
import { MockSpotifyClient, SpotifyClient } from 'spotify-api';
import logger from './logger';
import { server } from './utils/server';
import * as Sentry from '@sentry/node';

const port = process.env.PORT ?? '4001';
const routerSecret = process.env.ROUTER_SECRET;

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

const app = express();
Sentry.init({
  dsn: process.env.SENTRY_URL,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
});

// eslint-disable-next-line @typescript-eslint/require-await
export const contextFunction = async ({ req }) => {
  const defaultCountryCode = readEnv('DEFAULT_COUNTRY_CODE', {
    defaultValue: 'US',
  });

  checkRouterSecret(req.headers['router-authorization'] as string);
  const token = req.get('authorization');

  if (!token) {
    const userIdForMocks = req.get('x-graphos-id') ?? 'shared';

    return {
      defaultCountryCode,
      dataSources: {
        spotify: new MockSpotifyClient(userIdForMocks),
      },
    };
  }

  return {
    defaultCountryCode,
    dataSources: {
      spotify: new SpotifyClient({
        cache: server.cache,
        token,
      }),
    },
  };
};

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

async function main() {
  const httpServer = http.createServer(app);
  await server.start();

  // Trace incoming requests
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(loggerMiddleware);

  app.use(
    '/',
    cors(),
    json(),
    expressMiddleware(server, {
      context: contextFunction,
    })
  );

  app.use(Sentry.Handlers.errorHandler());

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 GraphQL endpoint ready at http://localhost:${port}`);
}

void main();
