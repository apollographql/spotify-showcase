import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

const Root = () => {
  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Suspense fallback="">
          <Outlet />
        </Suspense>
      </Layout.Main>
    </Layout>
  );
};

export default Root;
