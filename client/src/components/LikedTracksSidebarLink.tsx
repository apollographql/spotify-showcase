import { NavLink } from 'react-router-dom';
import useCurrentUserId from '../hooks/useCurrentUserId';
import ContextMenu from './ContextMenu';
import ContextMenuAction from './ContextMenuAction';
import cx from 'classnames';
import LikedSongsPlaylistCoverPhoto from './LikedSongsPlaylistCoverPhoto';
import { TypedDocumentNode, gql } from '@apollo/client';
import { LikedTracksSidebarLink_playbackState } from '../types/api';
import usePlaybackState from '../hooks/usePlaybackState';
import { Pin, Volume2 } from 'lucide-react';
import DelimitedList from './DelimitedList';

const PLAYBACK_STATE_FRAGMENT: TypedDocumentNode<LikedTracksSidebarLink_playbackState> = gql`
  fragment LikedTracksSidebarLink_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const LikedTracksSidebarLink = () => {
  const currentUserId = useCurrentUserId();
  const playbackState = usePlaybackState({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  if (!currentUserId) {
    return null;
  }

  const id = 'collection:tracks';
  const uri = `spotify:user:${currentUserId}:collection`;
  const isCurrentContext = uri === playbackState?.context?.uri;

  return (
    <ContextMenu
      content={
        <>
          <ContextMenu.SubMenu
            content={
              <ContextMenuAction.CopyLinkToEntity
                entity={{ __typename: 'Playlist', id }}
              />
            }
          >
            Share
          </ContextMenu.SubMenu>
          <ContextMenu.Separator />
          <ContextMenuAction.OpenDesktopApp uri={uri} />
        </>
      }
    >
      <li>
        <NavLink
          to="/collection/tracks"
          className={({ isActive }) =>
            cx(
              'leading-none transition-colors block py-2 pl-2 pr-4 transition-color duration-200 ease-out hover:no-underline justify-between rounded-md',
              isActive
                ? 'text-primary bg-surface hover:bg-[#393939]'
                : 'hover:bg-[#1A1A1A]'
            )
          }
        >
          <div className="flex gap-3 items-center">
            <LikedSongsPlaylistCoverPhoto iconSize="1rem" size="3rem" />
            <div className="flex flex-col justify-around flex-1 self-stretch text-ellipsis whitespace-nowrap overflow-hidden">
              <div
                className={cx(
                  'text-ellipsis whitespace-nowrap overflow-hidden',
                  { 'text-theme-light': isCurrentContext }
                )}
              >
                Liked songs
              </div>
              <div className="flex gap-2 items-center">
                <Pin
                  fill="currentColor"
                  size="1rem"
                  strokeWidth={1}
                  className="text-theme-light rotate-45"
                />
                <DelimitedList delimiter=" · " className="text-muted text-sm">
                  <span>Playlist</span>
                  <span>Spotify</span>
                </DelimitedList>
              </div>
            </div>
            {isCurrentContext && playbackState?.isPlaying && (
              <Volume2 color="var(--color--theme--light)" size="0.875rem" />
            )}
          </div>
        </NavLink>
      </li>
    </ContextMenu>
  );
};

export default LikedTracksSidebarLink;
