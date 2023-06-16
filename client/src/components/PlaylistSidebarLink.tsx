import { ReactElement, cloneElement } from 'react';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Volume2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import {
  PlaylistSidebarLink_playlist as Playlist,
  PlaylistSidebarLink_playbackState as PlaybackState,
} from '../types/api';
import cx from 'classnames';
import ContextMenuAction from './ContextMenuAction';
import DelimitedList from './DelimitedList';
import usePlaybackState from '../hooks/usePlaybackState';

interface PlaylistSidebarLinkProps {
  playlist: Playlist;
  coverPhoto: ReactElement<{ size: string }>;
  to: string;
}

const PLAYBACK_STATE_FRAGMENT: TypedDocumentNode<PlaybackState> = gql`
  fragment PlaylistSidebarLink_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const PlaylistSidebarLink = ({
  coverPhoto,
  playlist,
  to,
}: PlaylistSidebarLinkProps) => {
  const playbackState = usePlaybackState({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

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
          <ContextMenuAction.OpenDesktopApp uri={playlist.uri} />
        </>
      }
    >
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            cx(
              'leading-none transition-colors block py-2 pl-2 pr-4 transition-color duration-200 ease-out hover:no-underline justify-between hover:bg-surface rounded-md',
              {
                'text-primary bg-surface hover:bg-surface-active': isActive,
              }
            )
          }
        >
          <div className="flex gap-3 items-center">
            {cloneElement(coverPhoto, { size: '3rem' })}
            <div className="flex flex-col justify-around flex-1 self-stretch text-ellipsis whitespace-nowrap overflow-hidden">
              <div className="text-ellipsis whitespace-nowrap overflow-hidden">
                {playlist.name}
              </div>
              <DelimitedList delimiter=" · " className="text-muted text-sm">
                <span>Playlist</span>
                <span>{playlist.owner.displayName}</span>
              </DelimitedList>
            </div>
            {playlist.uri === playbackState?.context?.uri &&
              playbackState?.isPlaying && (
                <Volume2 color="var(--color--theme--light)" size="0.875rem" />
              )}
          </div>
        </NavLink>
      </li>
    </ContextMenu>
  );
};

PlaylistSidebarLink.fragments = {
  playlist: gql`
    fragment PlaylistSidebarLink_playlist on Playlist {
      id
      uri
      name
      owner {
        id
        displayName
      }
    }
  `,
};

export default PlaylistSidebarLink;
