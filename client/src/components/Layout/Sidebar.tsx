import { forwardRef, ReactNode } from 'react';
import { gql, OperationVariables, useFragment } from '@apollo/client';
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
import NavLink from './NavLink';
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
    <aside className="[grid-area:sidebar] bg-black-pure text-primary overflow-auto pt-4 px-2 pb-0">
      <nav className="h-full flex flex-col">
        <div className="pb-6">
          <Flex as={Link} to="/" inline alignItems="end" direction="column">
            <ApolloLogo size="225px" />
          </Flex>
        </div>
        <Section>
          <NavLink icon={<Home />} to="/">
            Home
          </NavLink>
          <NavLink icon={<Search />} to="/search">
            Search
          </NavLink>
          <NavLink icon={<Library />} to="/collection">
            Your Library
          </NavLink>
        </Section>
        <Section className="mt-8">
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
              <GradientIcon
                fill="var(--color--theme)"
                backgroundColor="#056952"
                lucideIcon={Bookmark}
              />
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
        </Section>
        {children && (
          <hr className="h-px w-full bg-surface border-none my-4 mx-0" />
        )}
        {children}
      </nav>
    </aside>
  );
};

interface SectionProps {
  className?: string;
  children?: ReactNode;
}

const Section = forwardRef<HTMLUListElement, SectionProps>(
  ({ className, children }, ref) => (
    <ul
      ref={ref}
      className={cx(
        'list-none px-3 py-3 rounded bg-surface-low-contrast',
        className
      )}
    >
      {children}
    </ul>
  )
);

Sidebar.Section = Section;
Sidebar.NavLink = NavLink;

export default Sidebar;
