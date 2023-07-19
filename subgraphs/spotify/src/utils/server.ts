import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import resolvers from '../resolvers';
import { ContextValue } from '../types/ContextValue';
import logger from '../logger';

let typeDefs = gql(
  readFileSync('schema.graphql', {
    encoding: 'utf-8',
  })
);
const schema = buildSubgraphSchema({
  typeDefs,
  resolvers,
});

export const server = new ApolloServer<ContextValue>({
  schema,
  introspection: true,
  logger,
});
