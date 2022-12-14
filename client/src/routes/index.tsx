import Layout from '../components/Layout';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

const Index = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
};

const LoggedIn = () => {
  return (
    <Layout>
      <Layout.Sidebar>Nav content</Layout.Sidebar>
      <Layout.Header>Stuff in the header</Layout.Header>
      <Layout.Main>Hello!</Layout.Main>
    </Layout>
  );
};

const LoggedOut = () => {
  return (
    <Layout>
      <Layout.Sidebar>Nav content</Layout.Sidebar>
      <Layout.Header>Stuff in the header</Layout.Header>
      <Layout.Main>Please log in</Layout.Main>
    </Layout>
  );
};

export default Index;
