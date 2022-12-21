import { Music } from 'lucide-react';
import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import CoverPhoto from './CoverPhoto';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';
import Text from './Text';
import styles from './MediaTile.module.scss';
import Flex from './Flex';

interface MediaTileProps {
  coverPhotoSrc: string;
  title: string;
  description: ReactNode;
  to: LinkProps['to'];
}

const MediaTile = ({
  coverPhotoSrc,
  description,
  title,
  to,
}: MediaTileProps) => {
  return (
    <Flex
      as={Link}
      direction="column"
      gap="1rem"
      to={to}
      className={styles.mediaTile}
    >
      <CoverPhoto
        src={coverPhotoSrc}
        fallback={<PlaceholderCoverPhoto icon={Music} />}
      />
      <Flex direction="column">
        <Text wrap={false} overflow="ellipsis" weight="bold" title={title}>
          {title}
        </Text>
        <Text color="muted" size="sm" maxLines={2}>
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MediaTile;
