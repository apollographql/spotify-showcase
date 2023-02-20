import { PauseIcon, PlayIcon } from 'lucide-react';
import usePausePlaybackMutation from '../mutations/usePausePlaybackMutation';
import AnimatedSoundWave from './AnimatedSoundWave';
import Text from './Text';

interface TrackPositionCellProps {
  playing: boolean;
  position: number;
}

const TrackPositionCell = ({ playing, position }: TrackPositionCellProps) => {
  const [pause] = usePausePlaybackMutation();

  return (
    <div className="flex min-w-[3ch] justify-end">
      {playing ? (
        <>
          <AnimatedSoundWave className="group-hover:hidden" />
          <button className="hidden group-hover:block" onClick={pause}>
            <PauseIcon size="1rem" fill="currentColor" />
          </button>
        </>
      ) : (
        <>
          <Text
            className="group-hover:hidden"
            color={playing ? 'themeLight' : 'muted'}
            numericVariant="tabular-nums"
            size="base"
          >
            {position}
          </Text>
          <button className="hidden group-hover:block">
            <PlayIcon size="1rem" fill="currentColor" />
          </button>
        </>
      )}
    </div>
  );
};

export default TrackPositionCell;
