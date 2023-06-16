import { Fragment, ReactNode, useRef, useState } from 'react';
import { gql, TypedDocumentNode, useSuspenseQuery } from '@apollo/client';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import {
  RootQuery,
  RootQueryVariables,
  Root_playbackState as PlaybackState,
} from '../types/api';
import cx from 'classnames';
import Layout from '../components/Layout';
import Playbar from '../components/Playbar';
import PlaybackStateSubscriber from '../components/PlaybackStateSubscriber';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import usePlaybackState from '../hooks/usePlaybackState';
import { Volume2 } from 'lucide-react';
import CoverPhoto from '../components/CoverPhoto';
import NotificationManager from '../components/NotificationManager';
import ContextMenu from '../components/ContextMenu';
import ContextMenuAction from '../components/ContextMenuAction';
import ScrollContainerContext from '../components/ScrollContainerContext';
import OffsetBasedPaginationObserver from '../components/OffsetBasedPaginationObserver';
import Flex from '../components/Flex';
import Skeleton from '../components/Skeleton';
import { randomBetween } from '../utils/common';
import { range } from '../utils/lists';
import { thumbnail } from '../utils/image';
import DelimitedList from '../components/DelimitedList';

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
            images {
              url
            }
            owner {
              id
              displayName
            }
          }
        }
      }
    }
  }
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment Root_playbackState on PlaybackState {
    isPlaying
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
          <li>
            <NavLink
              className={({ isActive }) =>
                cx(
                  'leading-none transition-colors block py-2 pl-2 pr-4 transition-color duration-200 ease-out hover:no-underline justify-between hover:bg-surface rounded-md',
                  {
                    'text-primary bg-surface hover:bg-surface-active': isActive,
                  }
                )
              }
              to={`/playlists/${playlist.id}`}
            >
              <div className="flex gap-3 items-center">
                <CoverPhoto image={thumbnail(playlist.images)} size="3rem" />
                <div className="flex flex-col justify-around flex-1 self-stretch">
                  <span>{playlist.name}</span>
                  <DelimitedList delimiter=" · " className="text-muted text-sm">
                    <span>Playlist</span>
                    <span>{playlist.owner.displayName}</span>
                  </DelimitedList>
                </div>
                {playlist.uri === playbackState?.context?.uri &&
                  playbackState?.isPlaying && (
                    <Volume2
                      color="var(--color--theme--light)"
                      size="0.875rem"
                    />
                  )}
              </div>
            </NavLink>
          </li>
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
