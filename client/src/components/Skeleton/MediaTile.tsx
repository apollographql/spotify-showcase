import CoverPhoto from './CoverPhoto';
import Text from './Text';

interface TileProps {
  description?: boolean;
}

const MediaTile = ({ description }: TileProps) => {
  return (
    <div className="flex flex-col gap-4 bg-surface-lowContrast p-4 rounded">
      <CoverPhoto size="100%" />
      <Text />
      {description && <Text fontSize="0.875rem" width="80%" />}
    </div>
  );
};

export default MediaTile;
