import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import ScrollContainerContext from './ScrollContainerContext';
import NotificationManager from './NotificationManager';
import Playbar from './Playbar';
import PlaybackStateSubscriber from './PlaybackStateSubscriber';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { RootQuery, RootQueryVariables } from '../types/api';
import PlaylistSidebarLink from './PlaylistSidebarLink';
import { Bookmark, Heart, Library } from 'lucide-react';
import GradientIcon from './GradientIcon';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';
import OffsetBasedPaginationObserver from './OffsetBasedPaginationObserver';

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
  const ref = useRef<HTMLElement>(null);

  return (
    <ScrollContainerContext.Provider value={ref}>
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={
          'grid gap-2 p-2 h-screen grid-cols-[375px_1fr] [grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
        }
      >
        <Layout.Sidebar>
          <Playlists />
        </Layout.Sidebar>
        <Layout.Main ref={ref}>
          <Layout.Header />
          <PlaybackStateSubscriber />
          <Outlet />
        </Layout.Main>
        <Playbar className="[grid-area:playbar]" />
      </div>
      <NotificationManager />
    </ScrollContainerContext.Provider>
  );
};

const Playlists = () => {
  const [scrollContainer, setScrollContainerRef] =
    useState<HTMLDivElement | null>(null);
  const { data, fetchMore } = useSuspenseQuery(ROOT_QUERY, {
    variables: { limit: 50 },
  });

  const { me: currentUser } = data;

  if (!currentUser) {
    throw new Error('Must be logged in');
  }

  return (
    <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
      <header className="px-4 py-2">
        <h2 className="text-muted flex gap-2 items-center py-2 text-base">
          <Library /> Your Library
        </h2>
      </header>
      <div
        className="overflow-y-auto flex-1 -mx-1 px-3"
        ref={setScrollContainerRef}
      >
        <PlaylistSidebarLink
          pinned
          playlist={{
            __typename: 'Playlist',
            id: 'collection:tracks',
            name: 'Liked Songs',
            uri: `spotify:user:${currentUser.user.id}:collection`,
            owner: {
              __typename: 'User',
              id: 'spotify',
              displayName: 'Spotify',
            },
          }}
          coverPhoto={
            <GradientIcon
              backgroundColor="linear-gradient(135deg,#450af5,#c4efd9)"
              lucideIcon={Heart}
              iconSize="1rem"
            />
          }
          to="/collection/tracks"
        />
        <PlaylistSidebarLink
          pinned
          playlist={{
            __typename: 'Playlist',
            id: 'collection:episodes',
            name: 'Your Episodes',
            uri: `spotify:user:${currentUser.user.id}:collection:your-episodes`,
            owner: {
              __typename: 'User',
              id: 'spotify',
              displayName: 'Spotify',
            },
          }}
          coverPhoto={
            <GradientIcon
              fill="var(--color--theme)"
              backgroundColor="#056952"
              lucideIcon={Bookmark}
              iconSize="1rem"
            />
          }
          to="/collection/episodes"
        />
        {data.me?.playlists?.edges.map(({ node: playlist }) => (
          <PlaylistSidebarLink
            pinned={false}
            key={playlist.id}
            playlist={playlist}
            coverPhoto={<CoverPhoto image={thumbnail(playlist.images)} />}
            to={`/playlists/${playlist.id}`}
          />
        ))}
        <OffsetBasedPaginationObserver
          pageInfo={data.me?.playlists?.pageInfo}
          fetchMore={fetchMore}
          scrollContainer={scrollContainer}
        />
      </div>
    </Layout.Sidebar.Section>
  );
};

export default LoggedInLayout;
