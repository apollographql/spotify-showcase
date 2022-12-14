import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

const Root = () => {
  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Outlet />
      </Layout.Main>
    </Layout>
  );
};

export default Root;
