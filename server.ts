import './server/src/env';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// TODO: Add me back when @apollo/subgraph adds subscription support
// https://github.com/apollographql/graphos-subscriptions/issues/123
// import { buildSubgraphSchema } from '@apollo/subgraph';
import { PubSub } from 'graphql-subscriptions';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import http from 'http';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { json } from 'body-parser';
import defaultResolver from './server/src/resolvers/default';

import resolvers from './server/src/resolvers';
import routes from './server/src/routes';
import SpotifyAPI from './server/src/dataSources/spotify';
import Publisher from './server/src/publisher';
import { readEnv } from './server/src/utils/env';
import { ContextValue } from './server/src/types';
import { TOPICS } from './server/src/constants';
// TODO: Remove me when @apollo/subgraph adds subscription support
// https://github.com/apollographql/graphos-subscriptions/issues/123
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(
      path.resolve(__dirname, './server/src/schema.graphql'),
      'utf-8'
    ),
    resolvers,
  });
  const app = express();
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const pubsub = new PubSub();
  const defaultCountryCode = readEnv('DEFAULT_COUNTRY_CODE', {
    defaultValue: 'US',
  });

  const serverCleanup = useServer(
    {
      schema,
      onConnect: (ctx) => {
        const token = ctx.connectionParams?.apiToken;

        if (!token) {
          return false;
        }
      },
      onDisconnect: () => {
        pubsub.publish(TOPICS.DISCONNECT, true);
      },
      context: (ctx) => {
        const token = ctx.connectionParams!.apiToken! as string;
        const spotify = new SpotifyAPI({
          cache: server.cache,
          token,
        });

        return {
          token,
          defaultCountryCode,
          publisher: new Publisher(pubsub),
          pubsub,
          dataSources: { spotify },
        } satisfies ContextValue;
      },
    },
    wsServer
  );

  const server = new ApolloServer<ContextValue>({
    schema,
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
    ],
    fieldResolver: defaultResolver,
  });

  await server.start();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(express.static('public'));
  app.use(vite.middlewares);
  app.use(routes);
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.get('x-api-token') ?? '';
        const { cache } = server;
        const spotify = new SpotifyAPI({
          cache,
          token: req.get('x-api-token') ?? '',
        });

        return {
          defaultCountryCode,
          dataSources: { spotify },
          publisher: new Publisher(pubsub),
          pubsub,
          token,
        };
      },
    })
  );

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, './index.html'),
        'utf-8'
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT ?? 3000 }, resolve)
  );

  console.log(`🚀 Server ready at: http://localhost:3000`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:3000/graphql`);
}

createServer();
