import useIsLoggedIn from '../hooks/useIsLoggedIn';
import LoggedOutLayout from '../components/LoggedOutLayout';
import LoggedInLayout from '../components/LoggedInLayout';
import NotificationManager from '../components/NotificationManager';

export const RouteComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <NotificationManager />
      {isLoggedIn ? <LoggedInLayout /> : <LoggedOutLayout />}
    </>
  );
};
