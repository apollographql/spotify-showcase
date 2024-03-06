import { ReactNode } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Layout from './Layout';
import Playbar, { LoadingState as PlaybarLoadingState } from './Playbar';
import PlaybackStateSubscriber from './PlaybackStateSubscriber';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { LoggedInLayoutQuery } from '../types/api';
import CurrentUserMenu from './CurrentUserMenu';
import Suspense from './Suspense';
import StandardLoadingState from './StandardLoadingState';
import { withHighlight } from './LoadingStateHighlighter';
import cx from 'classnames';
import Sidebar from './Sidebar';

const LOGGED_IN_LAYOUT_QUERY: TypedDocumentNode<LoggedInLayoutQuery> = gql`
  query LoggedInLayoutQuery($limit: Int, $offset: Int) {
    me {
      profile {
        id
        ...CurrentUserMenu_profile
      }
      playlists(limit: $limit, offset: $offset)
        @connection(key: "rootPlaylists") {
        ...Sidebar_playlists
      }
      player {
        ...Playbar_player
      }
    }
  }
`;

export function loader() {
  // Demo! Let's move query loading to this function
  return null;
}

const LoggedInLayout = () => {
  const navigation = useNavigation();
  const { data, fetchMore } = useSuspenseQuery(LOGGED_IN_LAYOUT_QUERY);

  if (!data.me) {
    throw new Response('Must be logged in', { status: 401 });
  }

  const { me } = data;

  return (
    <Container>
      <Sidebar
        playlists={me.playlists}
        currentUserId={me.profile.id}
        onLoadMore={fetchMore}
      />
      <Layout.Main>
        <PlaybackStateSubscriber />
        <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
          <div className="flex gap-4 items-center pointer-events-auto">
            <CurrentUserMenu profile={me.profile} />
          </div>
        </header>
        <Suspense fallback={<StandardLoadingState />}>
          <div
            className={cx({
              'opacity-30 transition-opacity duration-100':
                navigation.state === 'loading',
            })}
          >
            <Outlet />
          </div>
        </Suspense>
      </Layout.Main>
      <Playbar player={me.player} />
    </Container>
  );
};

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={
        'grid gap-2 p-2 h-screen grid-cols-[375px_1fr] [grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
      }
    >
      {children}
    </div>
  );
};

const LoadingState = withHighlight(
  () => {
    return (
      <Layout type="player">
        <Sidebar.LoadingState />
        <Layout.Main>
          <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
            <CurrentUserMenu.LoadingState />
          </header>
          <StandardLoadingState />
        </Layout.Main>
        <PlaybarLoadingState />
      </Layout>
    );
  },
  { shade: '#67EEF0' }
);

LoggedInLayout.LoadingState = LoadingState;

export default LoggedInLayout;
