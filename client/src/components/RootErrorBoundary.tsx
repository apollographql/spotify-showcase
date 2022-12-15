import { ApolloError } from '@apollo/client';
import { Navigate, useRouteError } from 'react-router-dom';
import Layout from './Layout';

const didBecomeUnauthenticated = (error: unknown) => {
  if (!(error instanceof ApolloError)) {
    return false;
  }

  for (const graphqlError of error.graphQLErrors) {
    if (graphqlError.extensions.code === 'UNAUTHENTICATED') {
      return true;
    }
  }

  return false;
};

const RootErrorBoundary = () => {
  const error = useRouteError();

  return (
    <Layout>
      <Layout.Main>
        <h1>
          {didBecomeUnauthenticated(error) ? 'You were logged out' : 'Oops!'}
        </h1>
      </Layout.Main>
    </Layout>
  );
};

export default RootErrorBoundary;
