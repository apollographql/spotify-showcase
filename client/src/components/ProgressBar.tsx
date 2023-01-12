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
  onChange?: (value: number) => void;
}

interface StyleProps extends CSSProperties {
  '--progress-bar--width': CSSProperties['width'];
}

const ProgressBar = ({
  animate = true,
  className,
  max,
  onChange,
  value,
  width,
}: ProgressBarProps) => {
  return (
    <Progress.Root
      className={cx(styles.progressBar, className)}
      max={max}
      value={value}
      style={{ '--progress-bar--width': width } as StyleProps}
      onClick={(event) => {
        if (!onChange) {
          return;
        }

        const target = event.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const percentage = Math.min(
          Math.max(0, (event.clientX - rect.left) / rect.width),
          1
        );

        onChange(Math.floor(percentage * max));
      }}
    >
      <Progress.Indicator
        className={cx(styles.progressIndicator, { [styles.animate]: animate })}
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
