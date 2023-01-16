import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { readAuthToken } from './utils';
import { logout } from './auth';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import introspection from './introspection.json';

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_SERVER_HOST}/graphql`,
  headers: {
    get 'x-api-token'() {
      return readAuthToken();
    },
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_WEBSOCKET_HOST}/graphql`,
    connectionParams: {
      get apiToken() {
        return readAuthToken();
      },
    },
  })
);

const removeTokenLink = onError(({ graphQLErrors }) => {
  graphQLErrors?.forEach((error) => {
    if (error.extensions.code === 'UNAUTHENTICATED') {
      logout();
    }
  });
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([removeTokenLink, httpLink])
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
    typePolicies: {
      Copyright: {
        keyFields: false,
      },
      CurrentUser: {
        keyFields: [],
      },
      Followers: {
        keyFields: false,
      },
      Image: {
        keyFields: ['url'],
      },
      Player: {
        keyFields: [],
      },
      PlaybackState: {
        keyFields: [],
      },
      Query: {
        fields: {
          me: {
            merge: true,
          },
        },
      },
      ReleaseDate: {
        keyFields: false,
      },
    },
  }),
});
