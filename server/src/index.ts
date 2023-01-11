import 'graphql-import-node';
import './env';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import defaultResolver from './resolvers/default';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';
import routes from './routes';
import SpotifyAPI from './dataSources/spotify';
import { readEnv } from './utils/env';
import { ContextValue } from './types';

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer<ContextValue>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  fieldResolver: defaultResolver,
});

app.use(routes);

server.start().then(async () => {
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { cache } = server;

        return {
          defaultCountryCode: readEnv('DEFAULT_COUNTRY_CODE', {
            defaultValue: 'US',
          }),
          dataSources: {
            spotify: new SpotifyAPI({
              cache,
              token: req.get('x-api-token') ?? '',
            }),
          },
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at: http://localhost:4000`);
});
