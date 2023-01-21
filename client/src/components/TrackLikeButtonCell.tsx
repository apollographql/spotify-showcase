import useRemoveSavedTracksMutation from '../mutations/useRemoveSavedTracksMutation';
import useSaveTracksMutation from '../mutations/useSaveTracksMutation';
import LikeButton from './LikeButton';

interface Track {
  __typename: 'Track';
  id: string;
}

interface TrackLikeButtonCellProps {
  liked: boolean;
  track: Track;
}

const TrackLikeButtonCell = ({ liked, track }: TrackLikeButtonCellProps) => {
  const [saveTracks] = useSaveTracksMutation();
  const [removeSavedTracks] = useRemoveSavedTracksMutation();

  return (
    <LikeButton
      liked={liked}
      size="1rem"
      className="relative top-px"
      onClick={() => {
        return liked
          ? removeSavedTracks({ ids: [track.id] })
          : saveTracks({ ids: [track.id] });
      }}
    />
  );
};

export default TrackLikeButtonCell;
