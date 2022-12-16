import { Suspense } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Link } from 'react-router-dom';
import { Library, Home, Search, Heart } from 'lucide-react';
import cx from 'classnames';
import Flex from '../Flex';
import ApolloLogo from '../ApolloLogo';
import GradientIcon from '../GradientIcon';
import SpotifyLogo from '../SpotifyLogo';
import NavLink from './NavLink';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import styles from './Sidebar.module.scss';
import {
  SidebarPlaylistsQuery,
  SidebarPlaylistsQueryVariables,
} from '../../types/api';

const Sidebar = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        <div className={styles.sidebarLogo}>
          <Flex as={Link} to="/" inline alignItems="end" direction="column">
            <ApolloLogo size="225px" />
            <SpotifyLogo size="100px" />
          </Flex>
        </div>
        <ul className={styles.sidebarNavSection}>
          <NavLink icon={<Home />} to="/">
            Home
          </NavLink>
          <NavLink icon={<Search />} to="/search">
            Search
          </NavLink>
          <NavLink icon={<Library />} to="/collection">
            Your Library
          </NavLink>
        </ul>
        <ul className={styles.sidebarNavSection}>
          <NavLink
            icon={
              <GradientIcon
                backgroundColor="linear-gradient(135deg,#450af5,#c4efd9)"
                lucideIcon={Heart}
              />
            }
            to="/collection/tracks"
          >
            Liked Songs
          </NavLink>
        </ul>
        {isLoggedIn && (
          <>
            <hr className={styles.sidebarDivider} />
            <Suspense fallback="Loading...">
              <Playlists />
            </Suspense>
          </>
        )}
      </nav>
    </aside>
  );
};

const PLAYLISTS_QUERY = gql`
  query SidebarPlaylistsQuery($offset: Int, $limit: Int!) {
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

const Playlists = () => {
  const { data } = useSuspenseQuery<
    SidebarPlaylistsQuery,
    SidebarPlaylistsQueryVariables
  >(PLAYLISTS_QUERY, { variables: { limit: 50 } });

  return (
    <ul className={cx(styles.sidebarNavSection, styles.sidebarPlaylists)}>
      {data.me?.playlists?.edges.map(({ node: playlist }) => (
        <NavLink key={playlist.id} to={`/playlists/${playlist.id}`}>
          {playlist.name}
        </NavLink>
      ))}
    </ul>
  );
};

export default Sidebar;
