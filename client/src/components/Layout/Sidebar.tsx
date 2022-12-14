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
            <Playlists />
          </>
        )}
      </nav>
    </aside>
  );
};

const Playlists = () => {
  return (
    <ul className={cx(styles.sidebarNavSection, styles.sidebarPlaylists)}>
      <NavLink to="/playlists/1">Daily Mix 1</NavLink>
      <NavLink to="/playlists/2">Daily Mix 2</NavLink>
      <NavLink to="/playlists/3">Daily Mix 3</NavLink>
      <NavLink to="/playlists/4">Daily Mix 4</NavLink>
    </ul>
  );
};

export default Sidebar;
