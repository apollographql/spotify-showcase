import {
  gql,
  OperationVariables,
  useFragment_experimental as useFragment,
} from '@apollo/client';
import {
  PlaylistEpisodeContextMenu_currentUser as CurrentUser,
  PlaylistEpisodeContextMenu_episode as Episode,
  PlaylistEpisodeContextMenu_playlist as Playlist,
} from '../types/api';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';

interface PlaylistEpisodeContextMenuProps {
  episode: Episode;
  playlist: Playlist;
}

const CURRENT_USER_FRAGMENT = gql`
  fragment PlaylistEpisodeContextMenu_currentUser on CurrentUser {
    user {
      id
    }
  }
`;

const PlaylistEpisodeContextMenu = ({
  episode,
  playlist,
}: PlaylistEpisodeContextMenuProps) => {
  const { data } = useFragment<CurrentUser, OperationVariables>({
    from: { __typename: 'CurrentUser' },
    fragment: CURRENT_USER_FRAGMENT,
    fragmentName: 'PlaylistEpisodeContextMenu_currentUser',
  });

  const currentUser = data?.user;

  return (
    <>
      <ContextMenuAction.AddToQueue uri={episode.uri} />
      <ContextMenu.Separator />
      {playlist.owner.id === currentUser?.id && (
        <ContextMenuAction.RemoveFromPlaylist
          playlistId={playlist.id}
          uri={episode.uri}
        />
      )}
      <ContextMenu.Separator />
      <ContextMenuAction.OpenDesktopApp uri={episode.uri} />
    </>
  );
};

PlaylistEpisodeContextMenu.fragments = {
  episode: gql`
    fragment PlaylistEpisodeContextMenu_episode on Episode {
      id
      uri
    }
  `,
  playlist: gql`
    fragment PlaylistEpisodeContextMenu_playlist on Playlist {
      id
      owner {
        id
      }
    }
  `,
};

export default PlaylistEpisodeContextMenu;
