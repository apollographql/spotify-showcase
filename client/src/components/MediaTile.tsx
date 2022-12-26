import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import CoverPhoto, { CoverPhotoProps } from './CoverPhoto';
import Text from './Text';
import styles from './MediaTile.module.scss';
import DelimitedList from './DelimitedList';
import Flex from './Flex';

interface MediaTileProps {
  coverPhoto: CoverPhotoProps['image'];
  coverPhotoShape?: CoverPhotoProps['shape'];
  title: string;
  description: ReactNode;
  to: LinkProps['to'];
}

const MediaTile = ({
  coverPhoto,
  coverPhotoShape,
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
        className={styles.coverPhoto}
        image={coverPhoto}
        shape={coverPhotoShape}
      />
      <Flex direction="column">
        <Text wrap={false} overflow="ellipsis" weight="bold" title={title}>
          {title}
        </Text>
        <DelimitedList
          as={Text}
          color="muted"
          delimiter=" · "
          size="sm"
          maxLines={2}
        >
          {description}
        </DelimitedList>
      </Flex>
    </Flex>
  );
};

export default MediaTile;
