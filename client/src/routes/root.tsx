import Layout from '../components/Layout';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { Library } from 'lucide-react';
import Flex from '../components/Flex';
import Skeleton from '../components/Skeleton';
import { randomBetween } from '../utils/common';
import { range } from '../utils/lists';
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

export const LoadingState = () => {
  const skeletons = range(0, randomBetween(30, 40));

  return (
    <Layout type="player">
      <Layout.Sidebar>
        <Layout.Sidebar.Section className="flex flex-col flex-1">
          <header className="px-4 py-2">
            <h2 className="text-muted flex gap-2 items-center py-2 text-base">
              <Library /> Your Library
            </h2>
          </header>
          <div className="flex-1">
            {skeletons.map((num) => (
              <li key={num} className="px-0 py-2">
                <Skeleton.Text key={num} width={`${randomBetween(40, 60)}%`} />
              </li>
            ))}
          </div>
        </Layout.Sidebar.Section>
      </Layout.Sidebar>
      <Layout.Main>
        <header className="flex items-center justify-end text-primary bg-transparent py-4 px-[var(--main-content--padding)] sticky top-0 h-[var(--main-header--height)] w-full pointer-events-none flex-shrink-0 z-10">
          <Flex gap="0.5rem" alignItems="center">
            <Skeleton.Avatar size="2rem" />
            <Skeleton.Text width="10ch" />
          </Flex>
        </header>
      </Layout.Main>
    </Layout>
  );
};
