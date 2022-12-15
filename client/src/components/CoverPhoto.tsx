import { ReactElement, cloneElement } from 'react';
import cx from 'classnames';
import LazyImage from './LazyImage';
import styles from './CoverPhoto.module.scss';

interface CoverPhotoProps {
  className?: string;
  src: string;
  fallback: ReactElement<{ className?: string }>;
}

const CoverPhoto = ({ className, fallback, src }: CoverPhotoProps) => {
  return src ? (
    <LazyImage className={cx(styles.playlistImage, className)} src={src} />
  ) : (
    cloneElement(fallback, {
      className: cx(styles.coverPhoto, fallback.props.className, className),
    })
  );
};

export default CoverPhoto;
