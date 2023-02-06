import { ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cx from 'classnames';
import CoverPhoto, { CoverPhotoProps } from './CoverPhoto';
import Text from './Text';
import styles from './MediaTile.module.scss';
import DelimitedList from './DelimitedList';

interface MediaTileProps extends LinkProps {
  coverPhoto: CoverPhotoProps['image'];
  coverPhotoShape?: CoverPhotoProps['shape'];
  title: string;
  description: ReactNode;
}

const MediaTile = forwardRef<HTMLAnchorElement, MediaTileProps>(
  ({ coverPhoto, coverPhotoShape, description, title, ...props }, ref) => {
    return (
      <Link
        {...props}
        className={cx(styles.mediaTile, 'flex flex-col gap-4')}
        ref={ref}
      >
        <CoverPhoto
          className={styles.coverPhoto}
          image={coverPhoto}
          shape={coverPhotoShape}
        />
        <div className="flex flex-col">
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
        </div>
      </Link>
    );
  }
);

export default MediaTile;
