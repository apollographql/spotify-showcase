import { Fragment, ReactNode, useRef, useState } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
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
import styles from './root.module.scss';
import { Volume2 } from 'lucide-react';
import NotificationManager from '../components/NotificationManager';
import ContextMenu from '../components/ContextMenu';
import ContextMenuAction from '../components/ContextMenuAction';
import ScrollContainerContext from '../components/ScrollContainerContext';
import OffsetBasedPaginationObserver from '../components/OffsetBasedPaginationObserver';

const ROOT_QUERY = gql`
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

const Root = () => {
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
        {isLoggedIn && <Playbar className={styles.playbar} />}
      </Layout>
      <NotificationManager />
    </ScrollContainerContext.Provider>
  );
};

const Playlists = () => {
  const [scrollContainer, setScrollContainerRef] =
    useState<HTMLUListElement | null>(null);
  const { data, fetchMore } = useSuspenseQuery<RootQuery, RootQueryVariables>(
    ROOT_QUERY,
    { suspensePolicy: 'initial', variables: { limit: 50 } }
  );

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

export default Root;
