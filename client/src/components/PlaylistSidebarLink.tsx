import {
  FragmentType,
  gql,
  TypedDocumentNode,
  useFragment,
} from '@apollo/client';
import { Volume2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import {
  PlaylistSidebarLink_playbackState as PlaybackState,
  PlaylistSidebarLink_currentUser,
  PlaylistSidebarLink_playlist,
} from '../types/api';
import cx from 'classnames';
import ContextMenuAction from './ContextMenuAction';
import DelimitedList from './DelimitedList';
import usePlaybackState from '../hooks/usePlaybackState';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';

interface PlaylistSidebarLinkProps {
  playlist: FragmentType<PlaylistSidebarLink_playlist>;
  onClickEdit?: () => void;
  onMouseOverEdit?: () => void;
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

const PlaylistSidebarLinkFragment: TypedDocumentNode<PlaylistSidebarLink_playlist> = gql`
  fragment PlaylistSidebarLink_playlist on Playlist {
    id
    uri
    name
    images {
      url
    }
    owner {
      id
      displayName
    }
  }
`;

fragmentRegistry.register(PlaylistSidebarLinkFragment);

const PlaylistSidebarLink = ({
  playlist,
  onClickEdit,
  onMouseOverEdit,
}: PlaylistSidebarLinkProps) => {
  const playbackState = usePlaybackState({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const { data: currentUser } = useFragment({
    fragment: CURRENT_USER_FRAGMENT,
    from: { __typename: 'CurrentUser' },
  });

  const { data, complete } = useFragment({
    fragment: PlaylistSidebarLinkFragment,
    from: playlist,
  });

  if (!complete) {
    return null;
  }

  const isCurrentContext = data.uri === playbackState?.context?.uri;
  const isOwner = data.owner.id === currentUser.profile?.id;

  return (
    <ContextMenu
      content={
        <>
          <ContextMenu.SubMenu
            content={<ContextMenuAction.CopyLinkToEntity entity={data} />}
          >
            Share
          </ContextMenu.SubMenu>
          <ContextMenu.Separator />
          {isOwner && (
            <ContextMenu.Action
              onMouseOver={() => onMouseOverEdit?.()}
              onSelect={() => onClickEdit?.()}
            >
              Edit details
            </ContextMenu.Action>
          )}
          <ContextMenuAction.OpenDesktopApp uri={data.uri} />
        </>
      }
    >
      <li>
        <NavLink
          to={`/playlists/${data.id}`}
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
            <CoverPhoto image={thumbnail(data.images ?? [])} size="3rem" />
            <div className="flex flex-col justify-around flex-1 self-stretch text-ellipsis whitespace-nowrap overflow-hidden">
              <div
                className={cx(
                  'text-ellipsis whitespace-nowrap overflow-hidden',
                  { 'text-theme-light': isCurrentContext }
                )}
              >
                {data.name}
              </div>
              <div className="flex gap-2 items-center">
                <DelimitedList delimiter=" · " className="text-muted text-sm">
                  <span>Playlist</span>
                  <span>{data.owner.displayName}</span>
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

export default PlaylistSidebarLink;
