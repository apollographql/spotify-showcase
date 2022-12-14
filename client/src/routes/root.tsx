import { Outlet } from 'react-router-dom';
import Button from '../components/Button';
import Layout from '../components/Layout';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { LOGIN_URL } from '../constants';

const Root = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header>
          {!isLoggedIn && (
            <Button as="a" size="sm" variant="primary" href={LOGIN_URL}>
              Log in
            </Button>
          )}
        </Layout.Header>
        <article>
          <Outlet />
        </article>
      </Layout.Main>
    </Layout>
  );
};

export default Root;
