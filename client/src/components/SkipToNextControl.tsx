import { SkipForward } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';
import useSkipToNextMutation from '../mutations/useSkipToNextMutation';

interface SkipToNextControlProps {
  disallowed: boolean;
}

const SkipToNextControl = ({ disallowed }: SkipToNextControlProps) => {
  const [skipToNext] = useSkipToNextMutation();

  return (
    <PlaybarControlButton
      disallowed={disallowed}
      icon={<SkipForward fill="currentColor" />}
      onClick={() => skipToNext()}
    />
  );
};

export default SkipToNextControl;
