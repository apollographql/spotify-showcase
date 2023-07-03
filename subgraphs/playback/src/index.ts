import { readFileSync } from "fs";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginSubscriptionCallback } from "@apollo/server/plugin/subscriptionCallback";
import resolvers from "./resolvers";
import { ContextValue } from "./types/ContextValue";
const port = process.env.PORT ?? "4002";
const subgraphName = require("../package.json").name;
const routerSecret = process.env.ROUTER_SECRET;
import { addMocksToSchema } from "@graphql-tools/mock";

import express from "express";
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
import { GraphQLError, execute, parse } from "graphql";
import { mocks } from "./utils/mocks";

const logger = {
  debug(msg) {
    console.log(msg);
  },
  info(msg) {
    console.log(msg);
  },
  warn(msg) {
    console.log(msg);
  },
  error(msg) {
    console.log(msg);
  },
};

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
  // const serverCleanup = useServer(
  //   {
  //     schema,
  //     onConnect: (ctx) => {
  //       if (ctx.connectionParams?.["authorization"]) return true;
  //       if (ctx.extra.request.headers?.["authorization"]) return true;

  //       return false;
  //     },
  //     onDisconnect: () => {
  //       pubsub.publish(TOPICS.DISCONNECT, true);
  //     },
  //     context: (ctx) => {
  //       const routerAuthorization =
  //         (ctx.connectionParams?.["authorization"] as string) ??
  //         (ctx.extra.request.headers?.["authorization"] as string) ??
  //         "";
  //       checkRouterSecret(routerAuthorization);

  //       const token = (ctx.connectionParams?.["authorization"] as string) ??
  //       (ctx.extra.request.headers?.["authorization"] as string)

  //       return {
  //         defaultCountryCode,
  //         publisher: new Publisher(pubsub),
  //         pubsub,
  //         dataSources: {
  //           spotify: new SpotifyAPI({
  //             cache: server.cache,
  //             token,
  //           }),
  //         },
  //         mock: token ? false : true
  //       } satisfies ContextValue;
  //     },
  //   },
  //   wsServer
  // );

  const server = new ApolloServer<ContextValue>({
    schema,
    plugins: [
      // ApolloServerPluginDrainHttpServer({ httpServer }),
      // {
      //   async serverWillStart() {
      //     return {
      //       async drainServer() {
      //         await serverCleanup.dispose();
      //       },
      //     };
      //   },
      // },
      {
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
                body: { kind: "single", singleResult: response },
              } as GraphQLResponse;
            },
          };
        },
      },
      {
        async requestDidStart({ request }) {
          const subscriptionExtension = request?.extensions?.subscription;
          // If it's not a callback subscription, ignore the request.
          if (!subscriptionExtension) return;

          const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
          await sleep(3000);

          await new Promise((resolve) => {
            const interval = setInterval(async () => {
              try {
                const result = await fetch(
                  `http://hosted-router.railway.internal:7718`
                );
                console.log(`Result: ${JSON.stringify(result)}`);
                if (result) {
                  console.log(`Pass`);
                  resolve("foo");
                  clearInterval(interval);
                }
              } catch (err) {
                console.log(JSON.stringify(err));
              } finally {
                await sleep(3000);
              }
            }, 1000);
          });

          return {};
        },
      },
      ApolloServerPluginSubscriptionCallback({ logger }),
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
        const token = req.get("authorization");

        return {
          defaultCountryCode,
          dataSources: {
            spotify: new SpotifyAPI({
              cache: server.cache,
              token,
            }),
          },
          publisher: new Publisher(pubsub),
          pubsub,
          mock: token ? false : true,
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
