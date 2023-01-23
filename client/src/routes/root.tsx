import { Fragment, ReactNode } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Outlet } from 'react-router-dom';
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

const ROOT_QUERY = gql`
  query RootQuery($offset: Int, $limit: Int!) {
    me {
      playlists(offset: $offset, limit: $limit) {
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
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = isLoggedIn ? AuthenticatedWrapper : Fragment;

  return (
    <>
      <Layout>
        <Layout.Sidebar>{isLoggedIn && <Playlists />}</Layout.Sidebar>
        <Layout.Main>
          <Layout.Header />
          <Wrapper>
            <Outlet />
          </Wrapper>
        </Layout.Main>
        {isLoggedIn && <Playbar className={styles.playbar} />}
      </Layout>
      <NotificationManager />
    </>
  );
};

const Playlists = () => {
  const { data } = useSuspenseQuery<RootQuery, RootQueryVariables>(ROOT_QUERY, {
    variables: { limit: 50 },
  });

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  return (
    <Layout.Sidebar.Section className={styles.playlists}>
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
            </>
          }
        >
          <Layout.Sidebar.NavLink
            className={styles.playlistLink}
            to={`/playlists/${playlist.id}`}
          >
            {playlist.name}
            {playlist.uri === playbackState?.context?.uri && (
              <Volume2 color="var(--color--theme--light)" size="0.875rem" />
            )}
          </Layout.Sidebar.NavLink>
        </ContextMenu>
      ))}
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
