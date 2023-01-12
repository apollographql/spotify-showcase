import { CSSProperties } from 'react';
import ProgressBar from './ProgressBar';
import useSetVolumeMutation from '../mutations/useSetVolumeMutation';

interface VolumeBarProps {
  volumePercent: number;
  width: CSSProperties['width'];
}

const VolumeBar = ({ volumePercent, width }: VolumeBarProps) => {
  const [setVolume] = useSetVolumeMutation();

  return (
    <ProgressBar
      animate={false}
      value={volumePercent}
      max={100}
      width={width}
      onChange={(volumePercent) =>
        setVolume({ volumePercent: Math.ceil(volumePercent) })
      }
    />
  );
};

export default VolumeBar;
