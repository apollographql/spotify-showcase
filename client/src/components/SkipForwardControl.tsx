import PlaybarControlButton from './PlaybarControlButton';
import { RotateCw } from 'lucide-react';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';

interface SkipForwardControlProps {
  ms: number;
  progressMs: number;
}

const SkipForwardControl = ({ ms, progressMs }: SkipForwardControlProps) => {
  const [seekToPosition] = useSeekToPositionMutation();

  return (
    <PlaybarControlButton
      disallowed={false}
      icon={<RotateCw />}
      onClick={() => {
        seekToPosition({ positionMs: progressMs + ms });
      }}
    />
  );
};

export default SkipForwardControl;
