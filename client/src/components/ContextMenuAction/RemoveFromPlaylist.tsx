import useRemoveFromPlaylistMutation from '../../mutations/useRemoveFromPlaylistMutation';
import ContextMenu from '../ContextMenu';

type RemoveFromPlaylistUris =
  | { uri: string; uris?: never }
  | { uri?: never; uris: string[] };

type RemoveFromPlaylistProps = RemoveFromPlaylistUris & {
  playlistId: string;
};

const RemoveFromPlaylist = ({
  playlistId,
  uri,
  uris,
}: RemoveFromPlaylistProps) => {
  const allUris = uris || [uri];
  const [removeFromPlaylist] = useRemoveFromPlaylistMutation();

  return (
    <ContextMenu.Action
      onSelect={() =>
        removeFromPlaylist({
          playlistId,
          tracks: allUris.map((uri) => ({ uri })),
        })
      }
    >
      Remove from this playlist
    </ContextMenu.Action>
  );
};

export default RemoveFromPlaylist;
