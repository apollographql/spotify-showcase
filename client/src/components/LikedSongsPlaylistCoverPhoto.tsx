import { Heart } from 'lucide-react';
import GradientIcon, { GradientIconProps } from './GradientIcon';

interface LikedSongsPlaylistCoverPhotoProps {
  className?: string;
  iconSize?: GradientIconProps['iconSize'];
  size?: GradientIconProps['size'];
}

const LikedSongsPlaylistCoverPhoto = ({
  iconSize,
  className,
  size,
}: LikedSongsPlaylistCoverPhotoProps) => {
  return (
    <GradientIcon
      className={className}
      backgroundColor="linear-gradient(135deg,#450af5,#c4efd9)"
      lucideIcon={Heart}
      iconSize={iconSize}
      size={size}
    />
  );
};

export default LikedSongsPlaylistCoverPhoto;
