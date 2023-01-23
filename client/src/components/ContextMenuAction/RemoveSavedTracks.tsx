import useRemoveSavedTracksMutation from '../../mutations/useRemoveSavedTracksMutation';
import ContextMenu from '../ContextMenu/ContextMenu';

interface RemoveSavedTracksProps {
  ids: string[];
}

const RemoveSavedTracks = ({ ids }: RemoveSavedTracksProps) => {
  const [removeSavedTracks] = useRemoveSavedTracksMutation();

  return (
    <ContextMenu.Action
      onSelect={() => {
        removeSavedTracks({ ids });
      }}
    >
      Remove from your Liked Songs
    </ContextMenu.Action>
  );
};

export default RemoveSavedTracks;
