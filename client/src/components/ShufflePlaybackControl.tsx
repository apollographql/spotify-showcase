import { Shuffle, LucideProps } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';
import useShufflePlaybackMutation from '../mutations/useShufflePlaybackMutation';

interface ShufflePlaybackControlProps {
  disallowed: boolean;
  shuffled: boolean;
  size?: LucideProps['size'];
}

const ShufflePlaybackControl = ({
  disallowed,
  shuffled,
  size,
}: ShufflePlaybackControlProps) => {
  const [shufflePlayback] = useShufflePlaybackMutation();

  return (
    <PlaybarControlButton
      active={shuffled}
      disallowed={disallowed}
      icon={<Shuffle size={size} />}
      onClick={() => {
        shufflePlayback({ state: !shuffled });
      }}
      tooltip={shuffled ? 'Disable shuffle' : 'Enable shuffle'}
    />
  );
};

export default ShufflePlaybackControl;
