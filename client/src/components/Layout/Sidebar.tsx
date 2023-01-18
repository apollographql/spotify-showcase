import {
  gql,
  OperationVariables,
  useFragment_experimental as useFragment,
} from '@apollo/client';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Library, Home, Search, Heart, Volume2, Bookmark } from 'lucide-react';
import {
  Sidebar_currentUser as CurrentUser,
  Sidebar_playbackState as PlaybackState,
} from '../../types/api';
import cx from 'classnames';
import Flex from '../Flex';
import ApolloLogo from '../ApolloLogo';
import GradientIcon from '../GradientIcon';
import SpotifyLogo from '../SpotifyLogo';
import NavLink from './NavLink';
import styles from './Sidebar.module.scss';
import usePlaybackState from '../../hooks/usePlaybackState';

interface SidebarProps {
  children?: ReactNode;
}

const CURRENT_USER_FRAGMENT = gql`
  fragment Sidebar_currentUser on CurrentUser {
    user {
      id
    }
  }
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment Sidebar_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const Sidebar = ({ children }: SidebarProps) => {
  const { data: currentUser, complete } = useFragment<
    CurrentUser,
    OperationVariables
  >({
    fragment: CURRENT_USER_FRAGMENT,
    from: { __typename: 'CurrentUser' },
  });

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const likedSongsURI =
    currentUser && complete && `spotify:user:${currentUser.user.id}:collection`;

  const yourEpisodesURI =
    currentUser &&
    complete &&
    `spotify:user:${currentUser.user.id}:collection:your-episodes`;

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
            {playbackState?.isPlaying &&
              playbackState.context?.uri === likedSongsURI && (
                <Flex flex={1} justifyContent="end">
                  <Volume2 color="var(--color--theme--light)" size="0.875rem" />
                </Flex>
              )}
          </NavLink>
          <NavLink
            icon={
              <GradientIcon backgroundColor="#056952" lucideIcon={Bookmark} />
            }
            to="/collection/episodes"
          >
            Your Episodes
            {playbackState?.isPlaying &&
              playbackState.context?.uri === yourEpisodesURI && (
                <Flex flex={1} justifyContent="end">
                  <Volume2 color="var(--color--theme--light)" size="0.875rem" />
                </Flex>
              )}
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
