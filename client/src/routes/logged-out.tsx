import { Link } from 'react-router-dom';
import { logout } from '../auth';
import ErrorActionLink from '../components/ErrorActionLink';
import ErrorDescription from '../components/ErrorDescription';
import ErrorTitle from '../components/ErrorTitle';
import Layout from '../components/Layout';
import client from '../apollo';

export const loader = () => {
  logout();
  client.clearStore();

  return null;
};

const LoggedOutRoute = () => {
  return (
    <Layout>
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
          <ErrorActionLink to="/login">Log in</ErrorActionLink>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default LoggedOutRoute;
