import { ApolloError } from '@apollo/client';
import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useLocation,
} from 'react-router-dom';
import ErrorTitle from './ErrorTitle';
import ErrorDescription from './ErrorDescription';
import ErrorActionLink from './ErrorActionLink';
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

  console.log(error);

  return (
    <Layout>
      <Layout.Main>
        <div className="flex h-full flex-col items-center justify-center">
          <ErrorBody error={error} />
        </div>
      </Layout.Main>
    </Layout>
  );
};

interface ErrorBodyProps {
  error: unknown;
}

const ErrorBody = ({ error }: ErrorBodyProps) => {
  const location = useLocation();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <ErrorTitle>Page not found</ErrorTitle>
        <ErrorDescription>
          We can't seem to find the page you are looking for.
        </ErrorDescription>
        <ErrorActionLink to="/">Home</ErrorActionLink>
      </>
    );
  }

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <>
        <ErrorTitle>You were logged out</ErrorTitle>
        <ErrorDescription>
          Your access token is invalid or might have expired. Try logging in
          again.
        </ErrorDescription>
        <ErrorActionLink to="/login">Log in</ErrorActionLink>
      </>
    );
  }

  return (
    <>
      <ErrorTitle>Oops.</ErrorTitle>
      <ErrorDescription>
        Something went wrong. Try{' '}
        <a className="underline" href={location.pathname}>
          reloading the page
        </a>
        , otherwise you may go{' '}
        <Link to="/" className="underline">
          back home
        </Link>
        .
      </ErrorDescription>
    </>
  );
};

export default RootErrorBoundary;
