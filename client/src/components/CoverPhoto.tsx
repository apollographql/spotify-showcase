import { ReactElement, cloneElement, CSSProperties } from 'react';
import cx from 'classnames';
import LazyImage from './LazyImage';
import styles from './CoverPhoto.module.scss';

interface CoverPhotoProps {
  className?: string;
  src: string;
  size?: string;
  fallback: ReactElement<{ className?: string }>;
}

interface StyleProps extends CSSProperties {
  '--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({ className, fallback, size, src }: CoverPhotoProps) => {
  return (
    <div
      className={cx(styles.container, className)}
      style={{ '--cover-photo--size': size } as StyleProps}
    >
      {src ? (
        <LazyImage className={cx(styles.playlistImage)} src={src} />
      ) : (
        cloneElement(fallback, {
          className: cx(styles.coverPhoto, fallback.props.className),
        })
      )}
    </div>
  );
};

export default CoverPhoto;
