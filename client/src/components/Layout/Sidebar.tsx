import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Library, Home, Search, Heart } from 'lucide-react';
import Flex from '../Flex';
import ApolloLogo from '../ApolloLogo';
import GradientIcon from '../GradientIcon';
import SpotifyLogo from '../SpotifyLogo';
import NavLink from './NavLink';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <div className={styles.sidebarLogo}>
          <Flex as={Link} to="/" inline alignItems="end" direction="column">
            <ApolloLogo size="225px" />
            <SpotifyLogo size="100px" />
          </Flex>
        </div>
        <ul className={styles.sidebarLinks}>
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
        <ul className={styles.sidebarLinks}>
          <NavLink
            icon={
              <GradientIcon
                backgroundColor="linear-gradient(135deg,#450af5,#c4efd9)"
                lucideIcon={Heart}
              />
            }
            to="/collection"
          >
            Liked Songs
          </NavLink>
        </ul>
        {children}
      </nav>
    </aside>
  );
};

export default Sidebar;
