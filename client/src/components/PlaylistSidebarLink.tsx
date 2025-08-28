import { ReactElement, cloneElement } from 'react';
import { gql, TypedDocumentNode } from '@apollo/client';
import { useFragment } from '@apollo/client/react';
import { Volume2, Pin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import {
  PlaylistSidebarLink_playlist as Playlist,
  PlaylistSidebarLink_playbackState as PlaybackState,
  PlaylistSidebarLink_currentUser,
} from '../types/api';
import cx from 'classnames';
import ContextMenuAction from './ContextMenuAction';
import DelimitedList from './DelimitedList';
import usePlaybackState from '../hooks/usePlaybackState';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaylistSidebarLinkProps {
  playlist: Playlist;
  coverPhoto: ReactElement<{ size: string }>;
  to: string;
  pinned: boolean;
  onClickEdit?: (playlist: Playlist) => void;
  onMouseOverEdit?: (playlist: Playlist) => void;
}

const PLAYBACK_STATE_FRAGMENT: TypedDocumentNode<PlaybackState> = gql`
  fragment PlaylistSidebarLink_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const CURRENT_USER_FRAGMENT: TypedDocumentNode<PlaylistSidebarLink_currentUser> = gql`
  fragment PlaylistSidebarLink_currentUser on CurrentUser {
    profile {
      id
    }
  }
`;

const PlaylistSidebarLink = ({
  coverPhoto,
  playlist,
  pinned,
  to,
  onClickEdit,
  onMouseOverEdit,
}: PlaylistSidebarLinkProps) => {
  const playbackState = usePlaybackState({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const { data } = useFragment({
    fragment: CURRENT_USER_FRAGMENT,
    from: { __typename: 'CurrentUser' },
  });

  const isCurrentContext = playlist.uri === playbackState?.context?.uri;
  const isOwner = playlist.owner.id === data.profile?.id;

  return (
    <ContextMenu
      content={
        <>
          <ContextMenu.SubMenu
            content={<ContextMenuAction.CopyLinkToEntity entity={playlist} />}
          >
            Share
          </ContextMenu.SubMenu>
          <ContextMenu.Separator />
          {isOwner && (
            <ContextMenu.Action
              onMouseOver={() => onMouseOverEdit?.(playlist)}
              onSelect={() => onClickEdit?.(playlist)}
            >
              Edit details
            </ContextMenu.Action>
          )}
          <ContextMenuAction.OpenDesktopApp uri={playlist.uri} />
        </>
      }
    >
      <li>
        <NavLink
          to={to}
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
            {cloneElement(coverPhoto, { size: '3rem' })}
            <div className="flex flex-col justify-around flex-1 self-stretch text-ellipsis whitespace-nowrap overflow-hidden">
              <div
                className={cx(
                  'text-ellipsis whitespace-nowrap overflow-hidden',
                  { 'text-theme-light': isCurrentContext }
                )}
              >
                {playlist.name}
              </div>
              <div className="flex gap-2 items-center">
                {pinned && (
                  <Pin
                    fill="currentColor"
                    size="1rem"
                    strokeWidth={1}
                    className="text-theme-light rotate-45"
                  />
                )}
                <DelimitedList delimiter=" · " className="text-muted text-sm">
                  <span>Playlist</span>
                  <span>{playlist.owner.displayName}</span>
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

fragmentRegistry.register(gql`
  fragment PlaylistSidebarLink_playlist on Playlist {
    id
    uri
    name
    owner {
      id
      displayName
    }
  }
`);

export default PlaylistSidebarLink;
