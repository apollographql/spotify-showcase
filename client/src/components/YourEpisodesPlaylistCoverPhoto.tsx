import { Bookmark } from 'lucide-react';
import GradientIcon, { GradientIconProps } from './GradientIcon';

interface YourEpisodesPlaylistCoverPhotoProps {
  className?: string;
  iconSize?: GradientIconProps['iconSize'];
  size?: GradientIconProps['size'];
}

const YourEpisodesPlaylistCoverPhoto = ({
  className,
  iconSize,
  size,
}: YourEpisodesPlaylistCoverPhotoProps) => {
  return (
    <GradientIcon
      className={className}
      fill="var(--color--theme)"
      backgroundColor="#056952"
      lucideIcon={Bookmark}
      iconSize={iconSize}
      size={size}
    />
  );
};

export default YourEpisodesPlaylistCoverPhoto;
