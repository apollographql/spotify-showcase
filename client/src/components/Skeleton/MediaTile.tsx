import CoverPhoto from './CoverPhoto';
import Text from './Text';

interface TileProps {
  coverPhotoShape?: 'circle' | 'square';
  description?: boolean;
}

const MediaTile = ({ coverPhotoShape, description }: TileProps) => {
  return (
    <div className="flex flex-col gap-4 bg-surface-lowContrast p-4 rounded">
      <CoverPhoto shape={coverPhotoShape} size="100%" />
      <Text />
      {description && <Text fontSize="0.875rem" width="80%" />}
    </div>
  );
};

export default MediaTile;
