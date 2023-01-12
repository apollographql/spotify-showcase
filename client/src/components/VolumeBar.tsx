import { CSSProperties } from 'react';
import ProgressBar from './ProgressBar';

interface VolumeBarProps {
  volumePercent: number;
  width: CSSProperties['width'];
}

const VolumeBar = ({ volumePercent, width }: VolumeBarProps) => {
  return (
    <ProgressBar
      animate={false}
      value={volumePercent}
      max={100}
      width={width}
    />
  );
};

export default VolumeBar;
