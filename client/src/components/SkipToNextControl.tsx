import { gql, useMutation } from '@apollo/client';
import { SkipForward } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';

interface SkipToNextControlProps {
  disallowed: boolean;
}

const SKIP_TO_NEXT_MUTATION = gql`
  mutation SkipToNextMutation($context: SkipToNextContextInput) {
    skipToNext(context: $context) {
      playbackState {
        isPlaying
      }
    }
  }
`;

const SkipToNextControl = ({ disallowed }: SkipToNextControlProps) => {
  const [skipToNext] = useMutation(SKIP_TO_NEXT_MUTATION);

  return (
    <PlaybarControlButton
      disallowed={disallowed}
      icon={<SkipForward fill="currentColor" />}
      onClick={() => skipToNext()}
    />
  );
};

export default SkipToNextControl;
