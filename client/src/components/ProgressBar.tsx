import cx from 'classnames';
import * as Progress from '@radix-ui/react-progress';
import styles from './ProgressBar.module.scss';
import { CSSProperties } from 'react';

interface ProgressBarProps {
  animate?: boolean;
  className?: string;
  max: number;
  value: number;
  width?: CSSProperties['width'];
}

interface StyleProps extends CSSProperties {
  '--progress-bar--width': CSSProperties['width'];
}

const ProgressBar = ({
  animate = true,
  className,
  max,
  value,
  width,
}: ProgressBarProps) => {
  return (
    <Progress.Root
      className={cx(styles.progressBar, className)}
      max={max}
      value={value}
      style={{ '--progress-bar--width': width } as StyleProps}
    >
      <Progress.Indicator
        className={cx(styles.progressIndicator, { [styles.animate]: animate })}
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
