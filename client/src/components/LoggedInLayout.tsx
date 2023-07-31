import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import ScrollContainerContext from './ScrollContainerContext';
import NotificationManager from './NotificationManager';
import Playbar from './Playbar';
import PlaybackStateSubscriber from './PlaybackStateSubscriber';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { RootQuery, RootQueryVariables } from '../types/api';
import PlaylistSidebarLink from './PlaylistSidebarLink';
import { Library } from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';
import OffsetBasedPaginationObserver from './OffsetBasedPaginationObserver';
import LikedSongsPlaylistCoverPhoto from './LikedSongsPlaylistCoverPhoto';
import YourEpisodesPlaylistCoverPhoto from './YourEpisodesPlaylistCoverPhoto';

const ROOT_QUERY: TypedDocumentNode<RootQuery, RootQueryVariables> = gql`
  query RootQuery($offset: Int, $limit: Int) {
    me {
      user {
        id
      }
      playlists(offset: $offset, limit: $limit)
        @connection(key: "rootPlaylists") {
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
    }
  }

  ${PlaylistSidebarLink.fragments.playlist}
`;

const LoggedInLayout = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { data, fetchMore } = useSuspenseQuery(ROOT_QUERY, {
    variables: { limit: 50 },
  });

  const { me } = data;

  if (!me) {
    throw new Error('Must be logged in');
  }

  return (
    <>
      <NotificationManager />
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={
          'grid gap-2 p-2 h-screen grid-cols-[375px_1fr] [grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
        }
      >
        <Layout.Sidebar>
          <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
            <header className="px-4 py-2">
              <h2 className="text-muted flex gap-2 items-center py-2 text-base">
                <Library /> Your Library
              </h2>
            </header>
            <ScrollContainerContext.Provider value={sidebarRef}>
              <div
                className="overflow-y-auto flex-1 -mx-1 px-3"
                ref={sidebarRef}
              >
                <PlaylistSidebarLink
                  pinned
                  playlist={{
                    __typename: 'Playlist',
                    id: 'collection:tracks',
                    name: 'Liked Songs',
                    uri: `spotify:user:${me.user.id}:collection`,
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
                    uri: `spotify:user:${me.user.id}:collection:your-episodes`,
                    owner: {
                      __typename: 'User',
                      id: 'spotify',
                      displayName: 'Spotify',
                    },
                  }}
                  coverPhoto={
                    <YourEpisodesPlaylistCoverPhoto iconSize="1rem" />
                  }
                  to="/collection/episodes"
                />
                {me.playlists?.edges.map(({ node: playlist }) => (
                  <PlaylistSidebarLink
                    pinned={false}
                    key={playlist.id}
                    playlist={playlist}
                    coverPhoto={
                      <CoverPhoto image={thumbnail(playlist.images)} />
                    }
                    to={`/playlists/${playlist.id}`}
                  />
                ))}
                <OffsetBasedPaginationObserver
                  pageInfo={me.playlists?.pageInfo}
                  fetchMore={fetchMore}
                />
              </div>
            </ScrollContainerContext.Provider>
          </Layout.Sidebar.Section>
        </Layout.Sidebar>
        <Layout.Main>
          <Layout.Header />
          <PlaybackStateSubscriber />
          <Outlet />
        </Layout.Main>
        <Playbar />
      </div>
    </>
  );
};

export default LoggedInLayout;
