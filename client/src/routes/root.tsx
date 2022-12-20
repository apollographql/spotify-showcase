import { useEffect, useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

const Root = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Allow children in the route to suspend using the outer Suspense boundary
  // and only use the suspense boundary on the main area when the initial set of
  // data is fully loaded.
  const children = isInitialized ? (
    <Suspense fallback="Loading...">
      <Outlet />
    </Suspense>
  ) : (
    <Outlet />
  );

  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>{children}</Layout.Main>
    </Layout>
  );
};

export default Root;
