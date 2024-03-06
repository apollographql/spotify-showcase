import useIsLoggedIn from '../hooks/useIsLoggedIn';
import LoggedOutLayout from '../components/LoggedOutLayout';
import LoggedInLayout from '../components/LoggedInLayout';
import NotificationManager from '../components/NotificationManager';
import { Suspense } from 'react';

export const RouteComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      {isLoggedIn ? (
        <Suspense fallback={<LoggedInLayout.LoadingState />}>
          <LoggedInLayout />
        </Suspense>
      ) : (
        <LoggedOutLayout />
      )}
      <NotificationManager />
    </>
  );
};
