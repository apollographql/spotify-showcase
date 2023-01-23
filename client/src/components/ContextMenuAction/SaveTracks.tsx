import useSaveTracksMutation from '../../mutations/useSaveTracksMutation';
import ContextMenu from '../ContextMenu/ContextMenu';

interface SaveTracksProps {
  ids: string[];
}

const SaveTracks = ({ ids }: SaveTracksProps) => {
  const [saveTracks] = useSaveTracksMutation();

  return (
    <ContextMenu.Action
      onSelect={() => {
        saveTracks({ ids });
      }}
    >
      Save to your Liked Songs
    </ContextMenu.Action>
  );
};

export default SaveTracks;
