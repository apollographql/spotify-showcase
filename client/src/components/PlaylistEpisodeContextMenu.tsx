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
import ContextMenu from './ContextMenu';
import useAddToQueueMutation from '../mutations/useAddToQueueMutation';

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
  const [addToQueue] = useAddToQueueMutation();
  const { data } = useFragment<CurrentUser, OperationVariables>({
    from: { __typename: 'CurrentUser' },
    fragment: CURRENT_USER_FRAGMENT,
    fragmentName: 'PlaylistEpisodeContextMenu_currentUser',
  });

  const currentUser = data?.user;

  return (
    <>
      <ContextMenu.Action
        onSelect={() => {
          addToQueue({ uri: episode.uri });
        }}
      >
        Add to queue
      </ContextMenu.Action>
      <ContextMenu.Separator />
      {playlist.owner.id === currentUser?.id && (
        <ContextMenu.Action>Remove from this playlist</ContextMenu.Action>
      )}
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
