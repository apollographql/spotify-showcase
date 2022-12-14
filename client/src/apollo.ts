import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_SERVER_HOST}/graphql`,
  headers: {
    get 'x-api-token'() {
      return localStorage.getItem('token');
    },
  },
});

const removeTokenLink = onError(({ graphQLErrors }) => {
  graphQLErrors?.forEach((error) => {
    if (error.extensions.code === 'UNAUTHENTICATED') {
      localStorage.removeItem('token');
    }
  });
});

const link = ApolloLink.from([removeTokenLink, httpLink]);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
