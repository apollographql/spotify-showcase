import { Fragment, ReactNode, useRef, useState } from 'react';
import { gql, TypedDocumentNode, useSuspenseQuery } from '@apollo/client';
import { Outlet, useParams } from 'react-router-dom';
import {
  RootQuery,
  RootQueryVariables,
  Root_playbackState as PlaybackState,
} from '../types/api';
import Layout from '../components/Layout';
import Playbar from '../components/Playbar';
import PlaybackStateSubscriber from '../components/PlaybackStateSubscriber';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import usePlaybackState from '../hooks/usePlaybackState';
import { Volume2 } from 'lucide-react';
import NotificationManager from '../components/NotificationManager';
import ContextMenu from '../components/ContextMenu';
import ContextMenuAction from '../components/ContextMenuAction';
import ScrollContainerContext from '../components/ScrollContainerContext';
import OffsetBasedPaginationObserver from '../components/OffsetBasedPaginationObserver';
import Flex from '../components/Flex';
import Skeleton from '../components/Skeleton';
import { randomBetween } from '../utils/common';
import { range } from '../utils/lists';

const ROOT_QUERY: TypedDocumentNode<RootQuery, RootQueryVariables> = gql`
  query RootQuery($offset: Int, $limit: Int) {
    me {
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
            name
            uri
          }
        }
      }
    }
  }
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment Root_playbackState on PlaybackState {
    context {
      uri
    }
  }
`;

export const RouteComponent = () => {
  const params = useParams();
  const ref = useRef<HTMLElement>(null);
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = isLoggedIn ? AuthenticatedWrapper : Fragment;

  return (
    <ScrollContainerContext.Provider value={ref}>
      <Layout onContextMenu={(e) => e.preventDefault()}>
        <Layout.Sidebar>{isLoggedIn && <Playlists />}</Layout.Sidebar>
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

const Playlists = () => {
  const [scrollContainer, setScrollContainerRef] =
    useState<HTMLUListElement | null>(null);
  const { data, fetchMore } = useSuspenseQuery(ROOT_QUERY, {
    variables: { limit: 50 },
  });

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  return (
    <Layout.Sidebar.Section
      ref={setScrollContainerRef}
      className="flex-1 overflow-y-auto"
    >
      {data.me?.playlists?.edges.map(({ node: playlist }) => (
        <ContextMenu
          key={playlist.id}
          content={
            <>
              <ContextMenu.SubMenu
                content={
                  <ContextMenuAction.CopyLinkToEntity entity={playlist} />
                }
              >
                Share
              </ContextMenu.SubMenu>
              <ContextMenu.Separator />
              <ContextMenuAction.OpenDesktopApp uri={playlist.uri} />
            </>
          }
        >
          <Layout.Sidebar.NavLink
            className="justify-between"
            to={`/playlists/${playlist.id}`}
          >
            {playlist.name}
            {playlist.uri === playbackState?.context?.uri && (
              <Volume2 color="var(--color--theme--light)" size="0.875rem" />
            )}
          </Layout.Sidebar.NavLink>
        </ContextMenu>
      ))}
      <OffsetBasedPaginationObserver
        pageInfo={data.me?.playlists?.pageInfo}
        fetchMore={fetchMore}
        scrollContainer={scrollContainer}
      />
    </Layout.Sidebar.Section>
  );
};

interface AuthenticatedWrapperProps {
  children?: ReactNode;
}

const AuthenticatedWrapper = ({ children }: AuthenticatedWrapperProps) => {
  return (
    <>
      <PlaybackStateSubscriber />
      {children}
    </>
  );
};

export const LoadingState = () => {
  const skeletons = range(0, randomBetween(10, 15));

  return (
    <Layout>
      <Layout.Sidebar>
        <Layout.Sidebar.Section>
          {skeletons.map((num) => (
            <li key={num} className="px-0 py-2">
              <Skeleton.Text key={num} width={`${randomBetween(40, 60)}%`} />
            </li>
          ))}
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
