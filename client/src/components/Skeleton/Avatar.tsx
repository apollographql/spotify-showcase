import { CSSProperties } from 'react';
import cx from 'classnames';
import styles from './Skeleton.module.scss';

interface AvatarProps {
  size: CSSProperties['width'];
}

interface StyleProps extends CSSProperties {
  '--skeleton--avatar--size': CSSProperties['width'];
}

const Avatar = ({ size }: AvatarProps) => {
  return (
    <div
      className={cx(styles.skeleton, styles.skeleton__avatar)}
      style={{ '--skeleton--avatar--size': size } as StyleProps}
    />
  );
};

export default Avatar;
