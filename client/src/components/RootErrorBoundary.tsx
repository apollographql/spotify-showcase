import { ApolloError } from '@apollo/client';
import {
  useRouteError,
  isRouteErrorResponse,
  Location,
  Navigate,
  Link,
  useLocation,
  matchPath,
} from 'react-router-dom';
import ErrorTitle from './ErrorTitle';
import ErrorDescription from './ErrorDescription';
import ErrorActionLink from './ErrorActionLink';
import Layout from './Layout';
import { DEFAULT_BACKGROUND_COLOR, NOT_IMPLEMENTED_ROUTES } from '../constants';
import useSetBackgroundColor from '../hooks/useSetBackgroundColor';

const didBecomeUnauthenticated = (error: unknown) => {
  if (
    (isRouteErrorResponse(error) || error instanceof Response) &&
    error.status === 401
  ) {
    return true;
  }

  if (error instanceof ApolloError) {
    return error.graphQLErrors.some(
      (error) => error.extensions.code === 'UNAUTHENTICATED'
    );
  }

  return false;
};

const matchesNotImplementedRoute = (location: Location) => {
  return NOT_IMPLEMENTED_ROUTES.some((path) => {
    return matchPath(path, location.pathname);
  });
};

const RootErrorBoundary = () => {
  const error = useRouteError();

  useSetBackgroundColor(DEFAULT_BACKGROUND_COLOR);

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
  const isNotFoundError = isRouteErrorResponse(error) && error.status === 404;

  if (isNotFoundError && matchesNotImplementedRoute(location)) {
    return (
      <>
        <ErrorTitle>Page not implemented</ErrorTitle>
        <ErrorDescription>
          We&apos;d really ❤️ for this page to exist, but it&apos;s not yet been
          implemented 💔.
        </ErrorDescription>
        <ErrorActionLink to="/">Go home</ErrorActionLink>
        <p className="text-sm mt-8 text-center max-w-lg">
          Want to implement it yourself? Check out our{' '}
          <a
            href="http://github.com/apollographql/spotify-showcase/issues"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            issues
          </a>{' '}
          for more details and send us a pull request!
        </p>
      </>
    );
  }

  if (isNotFoundError) {
    return (
      <>
        <ErrorTitle>Page not found</ErrorTitle>
        <ErrorDescription>
          We can&apos;t seem to find the page you are looking for.
        </ErrorDescription>
        <ErrorActionLink to="/">Home</ErrorActionLink>
      </>
    );
  }

  if (didBecomeUnauthenticated(error)) {
    return <Navigate to="/logged-out" />;
  }

  return (
    <>
      <ErrorTitle>Oops</ErrorTitle>
      <ErrorDescription>
        Something went wrong. Try{' '}
        <a className="underline" href={location.pathname}>
          reloading the page
        </a>
        , otherwise go back{' '}
        <Link to="/" className="underline">
          home
        </Link>
        .
      </ErrorDescription>
      <p className="text-sm mt-4 text-center max-w-lg">
        Does this seem like a bug 🐛? Open an{' '}
        <a
          href="http://github.com/apollographql/spotify-showcase/issues"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          issue
        </a>{' '}
        to let us know you&apos;ve encountered something unexpected, or send us
        a pull request!
      </p>
    </>
  );
};

export default RootErrorBoundary;
