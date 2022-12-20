import cx from 'classnames';
import { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';

interface TextProps {
  className?: string;
  fontSize?: CSSProperties['fontSize'];
  width?: CSSProperties['width'];
}

interface StyleProps extends CSSProperties {
  '--skeleton--text--width': CSSProperties['width'];
  '--skeleton--text--font-size': CSSProperties['fontSize'];
}

const Text = ({ className, fontSize, width }: TextProps) => {
  return (
    <div
      className={cx(styles.skeleton, styles.skeleton__text, className)}
      style={
        {
          '--skeleton--text--width': width,
          '--skeleton--text--font-size': fontSize,
        } as StyleProps
      }
    />
  );
};

export default Text;
