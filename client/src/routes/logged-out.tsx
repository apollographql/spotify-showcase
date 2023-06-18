import { Link, LoaderFunction } from 'react-router-dom';
import { logout } from '../auth';
import Button from '../components/Button';
import ErrorDescription from '../components/ErrorDescription';
import ErrorTitle from '../components/ErrorTitle';
import Layout from '../components/Layout';

export const loader: LoaderFunction = () => {
  logout();

  return null;
};

export const RouteComponent = () => {
  return (
    <Layout cols="grid-cols-[0_1fr]">
      <Layout.Main>
        <div className="flex h-full flex-col items-center justify-center">
          <ErrorTitle>You were logged out</ErrorTitle>
          <ErrorDescription>
            Your access token might have expired or it was invalid. Try logging
            in again or{' '}
            <Link to="/" className="underline">
              go back home
            </Link>
            .
          </ErrorDescription>
          <Button as="a" href="/login" variant="secondary" size="sm">
            Log in
          </Button>
        </div>
      </Layout.Main>
    </Layout>
  );
};
