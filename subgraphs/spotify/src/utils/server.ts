import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import resolvers from '../resolvers';
import { ContextValue } from '../types/ContextValue';
import logger from '../logger';
import * as Sentry from '@sentry/node';

const typeDefs = gql(
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
  plugins: [
    {
      async requestDidStart() {
        return {
          async didEncounterErrors(ctx) {
            for (const err of ctx.errors) {
              if (err.extensions?.code == 'GRAPHQL_VALIDATION_FAILED')
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
              else if (!ctx.operation) return;
              else
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
          },
        };
      },
    },
  ],
});
