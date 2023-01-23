import { ApolloError } from '@apollo/client';
import { ReactNode } from 'react';
import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  To,
} from 'react-router-dom';
import Button from './Button';
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
        Something went wrong. Try reloading the page, otherwise you may go{' '}
        <Link to="/" className="underline">
          back home
        </Link>
        .
      </ErrorDescription>
    </>
  );
};

interface ErrorTitleProps {
  children: ReactNode;
}

const ErrorTitle = ({ children }: ErrorTitleProps) => {
  return <h1 className="mb-4 text-5xl">{children}</h1>;
};

interface ErrorDescriptionProps {
  children: ReactNode;
}

const ErrorDescription = ({ children }: ErrorDescriptionProps) => {
  return <p className="mb-8 max-w-lg text-center text-lg">{children}</p>;
};

interface ErrorActionLinkProps {
  children: ReactNode;
  to: To;
}

const ErrorActionLink = ({ children, to }: ErrorActionLinkProps) => {
  return (
    <Button as={Link} to={to} variant="secondary">
      {children}
    </Button>
  );
};

export default RootErrorBoundary;
