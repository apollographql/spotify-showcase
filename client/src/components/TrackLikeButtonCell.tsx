import cx from 'classnames';
import { NOTIFICATION } from '../constants';
import useRemoveSavedTracksMutation from '../mutations/useRemoveSavedTracksMutation';
import useSaveTracksMutation from '../mutations/useSaveTracksMutation';
import { notify } from '../notifications';
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
        onClick={async () => {
          if (liked) {
            await removeSavedTracks({ ids: [track.id] });
            notify(NOTIFICATION.REMOVED_SAVED_TRACK);
          } else {
            await saveTracks({ ids: [track.id] });
            notify(NOTIFICATION.SAVED_TRACK);
          }
          return liked;
        }}
      />
    </div>
  );
};

export default TrackLikeButtonCell;
