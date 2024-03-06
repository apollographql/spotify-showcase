import { ReactNode, useRef } from 'react';
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Layout from './Layout';
import ScrollContainerContext from './ScrollContainerContext';
import Playbar, { LoadingState as PlaybarLoadingState } from './Playbar';
import PlaybackStateSubscriber from './PlaybackStateSubscriber';
import {
  TypedDocumentNode,
  gql,
  useLoadableQuery,
  useQueryRefHandlers,
  useReadQuery,
  useSuspenseQuery,
} from '@apollo/client';
import { LoggedInLayoutQuery, Sidebar_playlists } from '../types/api';
import PlaylistSidebarLink from './PlaylistSidebarLink';
import { Library } from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';
import OffsetBasedPaginationObserver, {
  OffsetBasedPaginationObserverProps,
} from './OffsetBasedPaginationObserver';
import LikedSongsPlaylistCoverPhoto from './LikedSongsPlaylistCoverPhoto';
import YourEpisodesPlaylistCoverPhoto from './YourEpisodesPlaylistCoverPhoto';
import PlaylistDetailsModal, {
  PLAYLIST_DETAILS_MODAL_QUERY,
} from './PlaylistDetailsModal';
import { randomBetween, range } from '../utils/common';
import Skeleton from './Skeleton';
import CurrentUserMenu from './CurrentUserMenu';
import Suspense from './Suspense';
import StandardLoadingState from './StandardLoadingState';
import { withHighlight } from './LoadingStateHighlighter';
import cx from 'classnames';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import { preloadQuery } from '../apollo/client';

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
  return preloadQuery(LOGGED_IN_LAYOUT_QUERY);
}

const LoggedInLayout = () => {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);
  const navigation = useNavigation();

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

fragmentRegistry.register(gql`
  fragment Sidebar_playlists on PlaylistConnection {
    pageInfo {
      offset
      limit
      hasNextPage
    }
    edges {
      node {
        id
        images {
          url
        }
        ...PlaylistSidebarLink_playlist
      }
    }
  }
`);

interface SidebarProps {
  playlists: Sidebar_playlists | null;
  currentUserId: string;
  onLoadMore: OffsetBasedPaginationObserverProps['fetchMore'];
}

const Sidebar = ({ playlists, currentUserId, onLoadMore }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [loadPlaylistDetails, queryRef, { reset }] = useLoadableQuery(
    PLAYLIST_DETAILS_MODAL_QUERY,
    { fetchPolicy: 'network-only' }
  );

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
        <header className="px-4 py-2">
          <h2 className="text-muted flex gap-2 items-center py-2 text-base">
            <Library /> Your Library
          </h2>
        </header>
        <ScrollContainerContext.Provider value={sidebarRef}>
          <div className="overflow-y-auto flex-1 -mx-1 px-3" ref={sidebarRef}>
            <PlaylistSidebarLink
              pinned
              playlist={{
                __typename: 'Playlist',
                id: 'collection:tracks',
                name: 'Liked Songs',
                uri: `spotify:user:${currentUserId}:collection`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<LikedSongsPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/tracks"
            />
            <PlaylistSidebarLink
              pinned
              playlist={{
                __typename: 'Playlist',
                id: 'collection:episodes',
                name: 'Your Episodes',
                uri: `spotify:user:${currentUserId}:collection:your-episodes`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<YourEpisodesPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/episodes"
            />
            {playlists?.edges.map(({ node: playlist }) => (
              <PlaylistSidebarLink
                pinned={false}
                key={playlist.id}
                playlist={playlist}
                coverPhoto={<CoverPhoto image={thumbnail(playlist.images)} />}
                to={`/playlists/${playlist.id}`}
                onClickEdit={(playlist) =>
                  loadPlaylistDetails({ id: playlist.id })
                }
              />
            ))}
            <OffsetBasedPaginationObserver
              pageInfo={playlists?.pageInfo}
              fetchMore={onLoadMore}
            />
          </div>
        </ScrollContainerContext.Provider>
      </Layout.Sidebar.Section>
      <PlaylistDetailsModal
        queryRef={queryRef}
        open={queryRef !== null}
        onChange={(open) => {
          if (!open) {
            reset();
          }
        }}
      />
    </Layout.Sidebar>
  );
};

const SidebarLoadingState = () => {
  const skeletons = range(0, randomBetween(10, 15));

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
        <header className="px-4 py-2">
          <h2 className="text-muted flex gap-2 items-center py-2 text-base">
            <Library /> Your Library
          </h2>
        </header>
        <div className="overflow-y-auto flex-1 -mx-1 px-3">
          {skeletons.map((num) => (
            <li key={num} className="px-0 py-2">
              <div className="flex gap-2">
                <Skeleton.CoverPhoto size="3rem" />
                <div className="flex flex-col gap-4 flex-1">
                  <Skeleton.Text
                    width={`${randomBetween(40, 60)}%`}
                    fontSize="1rem"
                  />
                  <Skeleton.Text
                    width={`${randomBetween(50, 70)}%`}
                    fontSize="0.75rem"
                  />
                </div>
              </div>
            </li>
          ))}
        </div>
      </Layout.Sidebar.Section>
    </Layout.Sidebar>
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
        <SidebarLoadingState />
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
