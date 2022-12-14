import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_HOST}/graphql`,
    headers: {
      get 'x-api-token'() {
        return localStorage.getItem('token');
      },
    },
  }),
});
