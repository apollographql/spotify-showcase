import { useEffect, useRef } from 'react';
import PlaybarControlButton from './PlaybarControlButton';
import VolumeIcon from './VolumeIcon';
import useSetVolumeMutation from '../mutations/useSetVolumeMutation';

interface MuteControlProps {
  disallowed: boolean;
  volumePercent: number;
}

const MuteControl = ({ disallowed, volumePercent }: MuteControlProps) => {
  const previousVolumePercentRef = useRef(volumePercent);
  const [setVolume] = useSetVolumeMutation();

  useEffect(() => {
    if (volumePercent > 0) {
      previousVolumePercentRef.current = volumePercent;
    }
  }, [volumePercent]);

  return (
    <PlaybarControlButton
      disallowed={disallowed}
      icon={<VolumeIcon volumePercent={volumePercent} />}
      onClick={() => {
        setVolume({
          volumePercent:
            volumePercent > 0 ? 0 : previousVolumePercentRef.current,
        });
      }}
      tooltip={volumePercent === 0 ? 'Unmute' : 'Mute'}
    />
  );
};

export default MuteControl;
