import { gql } from '@apollo/client';
import {
  PlaylistTrackContextMenu_currentUser as CurrentUser,
  PlaylistTrackContextMenu_playlist as Playlist,
  PlaylistTrackContextMenu_track as Track,
} from '../types/api';
import ContextMenu from './ContextMenu';
import useAddToQueueMutation from '../mutations/useAddToQueueMutation';

interface PlaylistTrackContextMenuProps {
  currentUser?: CurrentUser;
  playlist: Playlist;
  track: Track;
}

const PlaylistTrackContextMenu = ({
  currentUser,
  track,
  playlist,
}: PlaylistTrackContextMenuProps) => {
  const [addToQueue] = useAddToQueueMutation();

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
  currentUser: gql`
    fragment PlaylistTrackContextMenu_currentUser on User {
      id
    }
  `,
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
