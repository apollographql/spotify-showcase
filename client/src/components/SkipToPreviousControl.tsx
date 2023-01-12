import { SkipBack } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';
import useSkipToPreviousMutation from '../mutations/useSkipToPreviousMutation';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';

interface SkipToPreviousControlProps {
  disallowed: boolean;
  progressMs: number;
}

const THRESHOLD = 3000;

const SkipToPreviousControl = ({
  disallowed,
  progressMs,
}: SkipToPreviousControlProps) => {
  const [skipToPrevious] = useSkipToPreviousMutation();
  const [seekToPosition] = useSeekToPositionMutation();

  return (
    <PlaybarControlButton
      disallowed={disallowed}
      icon={<SkipBack fill="currentColor" />}
      onClick={() => {
        if (progressMs > THRESHOLD) {
          return seekToPosition({ positionMs: 0 });
        }

        skipToPrevious();
      }}
    />
  );
};

export default SkipToPreviousControl;
