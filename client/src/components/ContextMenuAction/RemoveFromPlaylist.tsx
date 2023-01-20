import useRemoveFromPlaylistMutation from '../../mutations/useRemoveFromPlaylistMutation';
import ContextMenu from '../ContextMenu';

interface RemoveFromPlaylistProps {
  playlistId: string;
  uri: string;
}

const RemoveFromPlaylist = ({ playlistId, uri }: RemoveFromPlaylistProps) => {
  const [removeFromPlaylist] = useRemoveFromPlaylistMutation();

  return (
    <ContextMenu.Action
      onSelect={() => removeFromPlaylist({ playlistId, tracks: [{ uri }] })}
    >
      Remove from this playlist
    </ContextMenu.Action>
  );
};

export default RemoveFromPlaylist;
