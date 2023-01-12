import { LucideProps, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';

interface VolumeIconProps extends LucideProps {
  volumePercent: number;
}

const VolumeIcon = ({ volumePercent, ...props }: VolumeIconProps) => {
  switch (true) {
    case volumePercent === 0:
      return <VolumeX {...props} />;
    case volumePercent > 50:
      return <Volume2 {...props} />;
    case volumePercent > 20:
      return <Volume1 {...props} />;
    default:
      return <Volume {...props} />;
  }
};

export default VolumeIcon;
