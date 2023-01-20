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
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';

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
  const { data } = useFragment<CurrentUser, OperationVariables>({
    from: { __typename: 'CurrentUser' },
    fragment: CURRENT_USER_FRAGMENT,
    fragmentName: 'PlaylistTrackContextMenu_currentUser',
  });

  const currentUser = data?.user;

  return (
    <>
      <ContextMenuAction.AddToQueue uri={track.uri} />
      <ContextMenu.Separator />
      <ContextMenu.Link to={`/artists/${track.artists[0].id}`}>
        Go to artist
      </ContextMenu.Link>
      <ContextMenu.Link to={`/albums/${track.album.id}`}>
        Go to album
      </ContextMenu.Link>
      {playlist.owner.id === currentUser?.id && (
        <ContextMenuAction.RemoveFromPlaylist
          playlistId={playlist.id}
          uri={track.uri}
        />
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
