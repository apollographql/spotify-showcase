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
import { PubSub } from "graphql-subscriptions";
import { readEnv } from "./utils/env";
import SpotifyAPI from "./dataSources/spotify";
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
  },
  warn(msg) {
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
  const pubsub = new PubSub();
  const defaultCountryCode = readEnv("DEFAULT_COUNTRY_CODE", {
    defaultValue: "US",
  });

  const server = new ApolloServer<ContextValue>({
    schema,
    introspection: true,
    plugins: [
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
