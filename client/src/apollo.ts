import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { isLoggedInVar } from './vars';
import { readAuthToken, removeAuthToken } from './utils';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_SERVER_HOST}/graphql`,
  headers: {
    get 'x-api-token'() {
      return readAuthToken();
    },
  },
});

const removeTokenLink = onError(({ graphQLErrors }) => {
  graphQLErrors?.forEach((error) => {
    if (error.extensions.code === 'UNAUTHENTICATED') {
      isLoggedInVar(false);
      removeAuthToken();
    }
  });
});

const link = ApolloLink.from([removeTokenLink, httpLink]);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
