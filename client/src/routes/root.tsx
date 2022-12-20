import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

const Root = () => {
  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </Layout.Main>
    </Layout>
  );
};

export default Root;
