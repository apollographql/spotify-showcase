import { Fragment, ReactNode } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { RootQuery, RootQueryVariables } from '../types/api';
import Layout from '../components/Layout';
import Playbar from '../components/Playbar';
import PlaybackStateSubscriber from '../components/PlaybackStateSubscriber';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import styles from './root.module.scss';

const ROOT_QUERY = gql`
  query RootQuery($offset: Int, $limit: Int!) {
    me {
      playlists(offset: $offset, limit: $limit) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

const Root = () => {
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = isLoggedIn ? AuthenticatedWrapper : Fragment;

  return (
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
  );
};

const Playlists = () => {
  const { data } = useSuspenseQuery<RootQuery, RootQueryVariables>(ROOT_QUERY, {
    variables: { limit: 50 },
  });

  return (
    <Layout.Sidebar.Section className={styles.playlists}>
      {data.me?.playlists?.edges.map(({ node: playlist }) => (
        <Layout.Sidebar.NavLink
          key={playlist.id}
          to={`/playlists/${playlist.id}`}
        >
          {playlist.name}
        </Layout.Sidebar.NavLink>
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
