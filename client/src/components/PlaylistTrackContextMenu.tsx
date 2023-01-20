import {
  gql,
  useFragment_experimental as useFragment,
  OperationVariables,
} from '@apollo/client';
import {
  PlaylistTrackContextMenu_currentUser as CurrentUser,
  PlaylistTrackContextMenu_playlist as Playlist,
  PlaylistTrackContextMenu_track as Track,
} from '../types/api';
import ContextMenu from './ContextMenu';
import useAddToQueueMutation from '../mutations/useAddToQueueMutation';

interface PlaylistTrackContextMenuProps {
  playlist: Playlist;
  track: Track;
}

const CURRENT_USER_FRAGMENT = gql`
  fragment PlaylistTrackContextMenu_currentUser on CurrentUser {
    user {
      id
    }
  }
`;

const PlaylistTrackContextMenu = ({
  track,
  playlist,
}: PlaylistTrackContextMenuProps) => {
  const [addToQueue] = useAddToQueueMutation();
  const { data } = useFragment<CurrentUser, OperationVariables>({
    from: { __typename: 'CurrentUser' },
    fragment: CURRENT_USER_FRAGMENT,
    fragmentName: 'PlaylistTrackContextMenu_currentUser',
  });

  const currentUser = data?.user;

  return (
    <>
      <ContextMenu.Action
        onSelect={() => {
          addToQueue({ uri: track.uri });
        }}
      >
        Add to queue
      </ContextMenu.Action>
      <ContextMenu.Separator />
      <ContextMenu.Link to={`/artists/${track.artists[0].id}`}>
        Go to artist
      </ContextMenu.Link>
      <ContextMenu.Link to={`/albums/${track.album.id}`}>
        Go to album
      </ContextMenu.Link>
      {playlist.owner.id === currentUser?.id && (
        <ContextMenu.Action>Remove from this playlist</ContextMenu.Action>
      )}
    </>
  );
};

PlaylistTrackContextMenu.fragments = {
  track: gql`
    fragment PlaylistTrackContextMenu_track on Track {
      id
      uri
      artists {
        id
      }
      album {
        id
      }
    }
  `,
  playlist: gql`
    fragment PlaylistTrackContextMenu_playlist on Playlist {
      id
      owner {
        id
      }
    }
  `,
};

export default PlaylistTrackContextMenu;
