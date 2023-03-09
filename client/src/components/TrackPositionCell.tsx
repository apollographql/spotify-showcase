import { MouseEvent } from 'react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import cx from 'classnames';
import usePausePlaybackMutation from '../mutations/usePausePlaybackMutation';
import AnimatedSoundWave from './AnimatedSoundWave';

interface TrackPositionCellProps {
  isCurrent: boolean;
  isPlaying: boolean;
  position: number;
  onPlay: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TrackPositionCell = ({
  isCurrent,
  isPlaying,
  position,
  onPlay,
}: TrackPositionCellProps) => {
  const [pause] = usePausePlaybackMutation();

  return (
    <div className="flex min-w-[3ch] justify-end">
      {isPlaying ? (
        <>
          <AnimatedSoundWave className="group-hover:hidden" />
          <button
            className="hidden group-hover:block"
            onClick={(e) => {
              e.preventDefault();
              pause();
            }}
          >
            <PauseIcon size="1rem" fill="currentColor" />
          </button>
        </>
      ) : (
        <>
          <span
            className={cx(
              'group-hover:hidden text-base tabular-nums',
              isPlaying || isCurrent ? 'text-theme-light' : 'text-muted'
            )}
          >
            {position}
          </span>
          <button
            className="hidden group-hover:block"
            onClick={(e) => {
              e.preventDefault();
              onPlay(e);
            }}
          >
            <PlayIcon size="1rem" fill="currentColor" />
          </button>
        </>
      )}
    </div>
  );
};

export default TrackPositionCell;
