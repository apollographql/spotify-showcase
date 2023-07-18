import { Fragment, ReactNode, useRef, useState } from 'react';
import { gql, TypedDocumentNode, useSuspenseQuery } from '@apollo/client';
import { Outlet, useParams } from 'react-router-dom';
import { RootQuery, RootQueryVariables } from '../types/api';
import Layout from '../components/Layout';
import Playbar from '../components/Playbar';
import PlaybackStateSubscriber from '../components/PlaybackStateSubscriber';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { Bookmark, Heart, Library } from 'lucide-react';
import CoverPhoto from '../components/CoverPhoto';
import NotificationManager from '../components/NotificationManager';
import ScrollContainerContext from '../components/ScrollContainerContext';
import OffsetBasedPaginationObserver from '../components/OffsetBasedPaginationObserver';
import PlaylistSidebarLink from '../components/PlaylistSidebarLink';
import Flex from '../components/Flex';
import Skeleton from '../components/Skeleton';
import { randomBetween } from '../utils/common';
import { range } from '../utils/lists';
import { thumbnail } from '../utils/image';
import GradientIcon from '../components/GradientIcon';
import Button from '../components/Button';
import SpotifyConnect from '../SpotifyConnect';

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

export const RouteComponent = () => {
  const params = useParams();
  const ref = useRef<HTMLElement>(null);
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = isLoggedIn ? AuthenticatedWrapper : Fragment;

  return (
    <ScrollContainerContext.Provider value={ref}>
      <Layout
        type={isLoggedIn ? 'player' : 'loggedOut'}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Layout.Sidebar>
          {isLoggedIn ? <Playlists /> : <GuestLibrary />}
        </Layout.Sidebar>
        <Layout.Main ref={ref}>
          <Layout.Header />
          <Wrapper>
            <Outlet key={JSON.stringify(params)} />
          </Wrapper>
        </Layout.Main>
        {isLoggedIn && <Playbar className="[grid-area:playbar]" />}
      </Layout>
      <NotificationManager />
    </ScrollContainerContext.Provider>
  );
};

const GuestLibrary = () => {
  return (
    <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col">
      <header className="px-4 py-2">
        <h2 className="text-muted flex gap-2 items-center py-2 text-base">
          <Library /> Your Library
        </h2>
      </header>
      <div className="bg-surface rounded-md px-3 py-4 mx-2">
        <h3 className="font-semibold">Developing with Apollo</h3>
        <p className="mt-2">
          This showcase demonstrates some of the capabilities and best practices
          of developing with Apollo. Log in and we&apos;ll show you how
          developing with Apollo is an amazing experience.
        </p>
        <Button
          as="a"
          href="/login"
          variant="secondary"
          size="sm"
          className="mt-6"
        >
          Log in
        </Button>
      </div>
    </Layout.Sidebar.Section>
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

interface AuthenticatedWrapperProps {
  children?: ReactNode;
}

const AuthenticatedWrapper = ({ children }: AuthenticatedWrapperProps) => {
  return (
    <>
      <SpotifyConnect />
      <PlaybackStateSubscriber />
      {children}
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
