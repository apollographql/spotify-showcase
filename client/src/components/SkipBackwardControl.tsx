import PlaybarControlButton from './PlaybarControlButton';
import { RotateCcw } from 'lucide-react';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';

interface SkipBackwardControlProps {
  ms: number;
  progressMs: number;
}

const SkipBackwardControl = ({ ms, progressMs }: SkipBackwardControlProps) => {
  const [seekToPosition] = useSeekToPositionMutation();

  return (
    <PlaybarControlButton
      disallowed={false}
      icon={<RotateCcw />}
      onClick={() => {
        seekToPosition({ positionMs: progressMs - ms });
      }}
      tooltip={`Skip back ${Math.floor(ms / 1000)} seconds`}
    />
  );
};

export default SkipBackwardControl;
