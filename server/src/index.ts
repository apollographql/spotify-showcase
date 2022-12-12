import 'graphql-import-node';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema.graphql';
import resolvers from './resolvers';

const server = new ApolloServer({ typeDefs: schema, resolvers });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
