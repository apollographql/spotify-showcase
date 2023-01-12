import { gql, useMutation } from '@apollo/client';
import { SkipBack } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';

interface SkipToPreviousControlProps {
  disallowed: boolean;
}

const SKIP_TO_PREVIOUS_MUTATION = gql`
  mutation SkipToPreviousMutation($context: SkipToPreviousContextInput) {
    skipToPrevious(context: $context) {
      playbackState {
        isPlaying
      }
    }
  }
`;

const SkipToPreviousControl = ({ disallowed }: SkipToPreviousControlProps) => {
  const [skipToPrevious] = useMutation(SKIP_TO_PREVIOUS_MUTATION);

  return (
    <PlaybarControlButton
      disallowed={disallowed}
      icon={<SkipBack fill="currentColor" />}
      onClick={() => skipToPrevious()}
    />
  );
};

export default SkipToPreviousControl;
