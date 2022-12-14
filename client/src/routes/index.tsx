import useIsLoggedIn from '../hooks/useIsLoggedIn';

const Index = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
};

const LoggedIn = () => {
  return <div>Hello!</div>;
};

const LoggedOut = () => {
  return <div>Please log in</div>;
};

export default Index;
