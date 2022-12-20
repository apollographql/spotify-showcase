import cx from 'classnames';
import { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';

interface CoverPhotoProps {
  size: CSSProperties['width'];
}

interface StyleProps extends CSSProperties {
  '--skeleton--cover-photo--size': CSSProperties['width'];
}

const CoverPhoto = ({ size }: CoverPhotoProps) => {
  return (
    <div
      className={cx(styles.skeleton, styles.skeleton__coverPhoto)}
      style={{ '--skeleton--cover-photo--size': size } as StyleProps}
    />
  );
};

export default CoverPhoto;
