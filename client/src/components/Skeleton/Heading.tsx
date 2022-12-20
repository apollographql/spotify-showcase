import { createElement, CSSProperties } from 'react';
import cx from 'classnames';
import styles from './Skeleton.module.scss';

interface TitleProps {
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  width?: CSSProperties['width'];
  fontSize?: CSSProperties['fontSize'];
}

interface StyleProps extends CSSProperties {
  '--skeleton--heading--width': CSSProperties['width'];
  '--skeleton--heading--font-size': CSSProperties['fontSize'];
}

const Heading = ({ className, fontSize, level, width }: TitleProps) => {
  return createElement(`h${level}`, {
    className: cx(
      styles.skeleton,
      styles.skeleton__heading,
      styles[`heading${level}`],
      className
    ),
    style: {
      '--skeleton--heading--width': width,
      '--skeleton--heading--font-size': fontSize,
    } as StyleProps,
  });
};

export default Heading;
