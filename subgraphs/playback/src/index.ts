import { readFileSync } from "fs";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers";
import { ContextValue } from "./types/ContextValue";
const port = process.env.PORT ?? "4002";
const subgraphName = require("../package.json").name;
const routerSecret = process.env.ROUTER_SECRET;

import querystring from "querystring";
import request from "request";
import cookieParser from "cookie-parser";
import express, { application } from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PubSub } from "graphql-subscriptions";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { readEnv } from "./utils/env";
import SpotifyAPI from "./dataSources/spotify";
import { TOPICS } from "./utils/constants";
import Publisher from "./publisher";
import { json } from "body-parser";
import cors from "cors";
import { GraphQLError } from "graphql";

async function main() {
  let typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
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
    path: "/ws",
  });
  const pubsub = new PubSub();
  const defaultCountryCode = readEnv("DEFAULT_COUNTRY_CODE", {
    defaultValue: "US",
  });
  const serverCleanup = useServer(
    {
      schema,
      onConnect: (ctx) => {
        if (ctx.connectionParams?.["Authentication"]) return true;
        if (ctx.extra.request.headers?.["Authentication"]) return true;

        return false;
      },
      onDisconnect: () => {
        pubsub.publish(TOPICS.DISCONNECT, true);
      },
      context: (ctx) => {
        const routerAuthorization =
          (ctx.connectionParams?.["Authentication"] as string) ??
          (ctx.extra.request.headers?.["Authentication"] as string) ??
          "";
        checkRouterSecret(routerAuthorization);

        return {
          defaultCountryCode,
          publisher: new Publisher(pubsub),
          pubsub,
          dataSources: {
            spotify: new SpotifyAPI({
              cache: server.cache,
              token:
                (ctx.connectionParams?.["Authentication"] as string) ??
                (ctx.extra.request.headers?.["Authentication"] as string),
            }),
          },
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
  });
  
  await server.start();

  app.use(express.static("public"));
  app.use(
    "/",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        checkRouterSecret(req.headers["router-authorization"] as string);

        return {
          defaultCountryCode,
          dataSources: {
            spotify: new SpotifyAPI({
              cache: server.cache,
              token: req.get("Authentication"),
            }),
          },
          publisher: new Publisher(pubsub),
          pubsub,
        };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 Subscription endpoint ready at ws://localhost:${port}`);
}

function checkRouterSecret(secret: string) {
  if (routerSecret && secret !== routerSecret) {
    throw new GraphQLError("Missing router authentication", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
}

main();
