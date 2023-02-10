import cx from 'classnames';
import { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';

interface CoverPhotoProps {
  size: CSSProperties['width'];
  shape?: 'circle' | 'square';
}

interface StyleProps extends CSSProperties {
  '--skeleton--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({ size, shape = 'square' }: CoverPhotoProps) => {
  return (
    <div
      className={cx(styles.skeleton, styles.skeleton__coverPhoto, {
        'rounded-full': shape === 'circle',
      })}
      style={{ '--skeleton--cover-photo--size': size } as StyleProps}
    />
  );
};

export default CoverPhoto;
