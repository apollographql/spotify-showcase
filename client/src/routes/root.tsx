import { Suspense } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { RootQuery, RootQueryVariables } from '../types/api';
import Layout from '../components/Layout';
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

  return (
    <Layout>
      <Layout.Sidebar>{isLoggedIn && <Playlists />}</Layout.Sidebar>
      <Layout.Main>
        <Layout.Header />
        <Suspense fallback="">
          <Outlet />
        </Suspense>
      </Layout.Main>
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

export default Root;
