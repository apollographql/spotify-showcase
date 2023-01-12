import { SkipBack } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';
import useSkipToPreviousMutation from '../mutations/useSkipToPreviousMutation';

interface SkipToPreviousControlProps {
  disallowed: boolean;
}

const SkipToPreviousControl = ({ disallowed }: SkipToPreviousControlProps) => {
  const [skipToPrevious] = useSkipToPreviousMutation();

  return (
    <PlaybarControlButton
      disallowed={disallowed}
      icon={<SkipBack fill="currentColor" />}
      onClick={() => skipToPrevious()}
    />
  );
};

export default SkipToPreviousControl;
