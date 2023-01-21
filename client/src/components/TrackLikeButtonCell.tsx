import cx from 'classnames';
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
    <div className="px-2">
      <LikeButton
        liked={liked}
        size="1rem"
        className={cx('relative top-[2px] group-hover:visible', {
          invisible: !liked,
        })}
        onClick={() => {
          return liked
            ? removeSavedTracks({ ids: [track.id] })
            : saveTracks({ ids: [track.id] });
        }}
      />
    </div>
  );
};

export default TrackLikeButtonCell;
