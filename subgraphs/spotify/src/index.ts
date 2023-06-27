import { readFileSync } from "fs";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers";
import { ContextValue } from "./types/ContextValue";
const port = process.env.PORT ?? "4001";
const subgraphName = require("../package.json").name;
const routerSecret = process.env.ROUTER_SECRET;

import express from "express";
import http from "http";
import { readEnv } from "./utils/env";
import SpotifyAPI from "./dataSources/spotify";
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
  const defaultCountryCode = readEnv("DEFAULT_COUNTRY_CODE", {
    defaultValue: "US",
  });

  const server = new ApolloServer<ContextValue>({
    schema,
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
          }
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
