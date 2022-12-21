import { ReactElement, cloneElement, CSSProperties } from 'react';
import cx from 'classnames';
import LazyImage from './LazyImage';
import styles from './CoverPhoto.module.scss';

interface Image {
  url: string;
}

export interface CoverPhotoProps {
  className?: string;
  image: Image | null | undefined;
  size?: string;
  fallback: ReactElement<{ className?: string }>;
  shape?: 'square' | 'circle';
}

interface StyleProps extends CSSProperties {
  '--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({
  className,
  fallback,
  size,
  image,
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
        cloneElement(fallback, {
          className: cx(styles.coverPhoto, fallback.props.className),
        })
      )}
    </div>
  );
};

export default CoverPhoto;
