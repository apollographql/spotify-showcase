import { MouseEvent } from 'react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import usePausePlaybackMutation from '../mutations/usePausePlaybackMutation';
import AnimatedSoundWave from './AnimatedSoundWave';
import Text from './Text';

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
          <Text
            className="group-hover:hidden"
            color={isPlaying || isCurrent ? 'themeLight' : 'muted'}
            numericVariant="tabular-nums"
            size="base"
          >
            {position}
          </Text>
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
