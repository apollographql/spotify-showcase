import { Link, LoaderFunction, useNavigate } from 'react-router-dom';
import { logout } from '../auth';
import ErrorDescription from '../components/ErrorDescription';
import ErrorTitle from '../components/ErrorTitle';
import Layout from '../components/Layout';
import { LoginButton } from '../components/Page/LoginButton';

export const loader: LoaderFunction = async () => {
  await logout();

  return null;
};

export const RouteComponent = () => {
  const navigate = useNavigate();

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
          <LoginButton onLogin={() => navigate('/')} />
        </div>
      </Layout.Main>
    </Layout>
  );
};
