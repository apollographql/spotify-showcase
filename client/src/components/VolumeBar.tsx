import { gql, useMutation } from '@apollo/client';
import { CSSProperties } from 'react';
import ProgressBar from './ProgressBar';

interface VolumeBarProps {
  volumePercent: number;
  width: CSSProperties['width'];
}

const SET_VOLUME_MUTATION = gql`
  mutation SetVolumeMutation($volumePercent: Int!) {
    setVolume(volumePercent: $volumePercent) {
      playbackState {
        device {
          id
          volumePercent
        }
      }
    }
  }
`;

const VolumeBar = ({ volumePercent, width }: VolumeBarProps) => {
  const [setVolume] = useMutation(SET_VOLUME_MUTATION);

  return (
    <ProgressBar
      animate={false}
      value={volumePercent}
      max={100}
      width={width}
      onChange={(volumePercent) =>
        setVolume({ variables: { volumePercent: Math.ceil(volumePercent) } })
      }
    />
  );
};

export default VolumeBar;
