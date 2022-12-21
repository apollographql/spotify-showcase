import { ElementType, CSSProperties } from 'react';
import { LucideProps, Music } from 'lucide-react';
import cx from 'classnames';
import LazyImage from './LazyImage';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';
import styles from './CoverPhoto.module.scss';

interface Image {
  url: string;
}

export interface CoverPhotoProps {
  className?: string;
  image: Image | null | undefined;
  size?: string;
  placeholderIcon?: ElementType<LucideProps>;
  shape?: 'square' | 'circle';
}

interface StyleProps extends CSSProperties {
  '--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({
  className,
  image,
  placeholderIcon = Music,
  size,
  shape = 'square',
}: CoverPhotoProps) => {
  return (
    <div
      className={cx(styles.container, className, {
        [styles.square]: shape === 'square',
        [styles.circle]: shape === 'circle',
      })}
      style={{ '--cover-photo--size': size } as StyleProps}
    >
      {image ? (
        <LazyImage className={styles.coverPhoto} src={image.url} />
      ) : (
        <PlaceholderCoverPhoto
          className={styles.coverPhoto}
          icon={placeholderIcon}
        />
      )}
    </div>
  );
};

export default CoverPhoto;
