import { RepeatMode } from '../types/api';
import PlaybarControlButton from './PlaybarControlButton';
import RepeatIcon from './RepeatIcon';
import useSetRepeatModeMutation from '../mutations/useSetRepeatModeMutation';

interface RepeatControlProps {
  disallowed: boolean;
  repeatState: RepeatMode;
}

const NEXT_REPEAT_MODE = {
  [RepeatMode.Off]: RepeatMode.Context,
  [RepeatMode.Context]: RepeatMode.Track,
  [RepeatMode.Track]: RepeatMode.Off,
} as const;

const TOOLTIP = {
  [RepeatMode.Off]: 'Enable repeat',
  [RepeatMode.Context]: 'Enable repeat one',
  [RepeatMode.Track]: 'Disable repeat',
} as const;

const RepeatControl = ({ disallowed, repeatState }: RepeatControlProps) => {
  const [setRepeatMode] = useSetRepeatModeMutation();

  return (
    <PlaybarControlButton
      active={repeatState !== RepeatMode.Off}
      disallowed={disallowed}
      icon={<RepeatIcon repeatState={repeatState} />}
      onClick={() => setRepeatMode({ state: NEXT_REPEAT_MODE[repeatState] })}
      tooltip={TOOLTIP[repeatState]}
    />
  );
};

export default RepeatControl;
