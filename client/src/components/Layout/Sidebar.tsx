import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Library, Home, Search, Heart } from 'lucide-react';
import cx from 'classnames';
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
        {children && <hr className={styles.sidebarDivider} />}
        {children}
      </nav>
    </aside>
  );
};

interface SectionProps {
  className?: string;
  children?: ReactNode;
}

const Section = ({ className, children }: SectionProps) => (
  <ul className={cx(styles.sidebarNavSection, className)}>{children}</ul>
);

Sidebar.Section = Section;
Sidebar.NavLink = NavLink;

export default Sidebar;
