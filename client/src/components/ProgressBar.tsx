import cx from 'classnames';
import * as Progress from '@radix-ui/react-progress';
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
  max = max === 0 ? 1 : max;

  return (
    <Progress.Root
      className={cx(
        'block w-[var(--progress-bar--width,100%)] h-[0.375rem] bg-surface-active border border-solid border-transparent rounded-2xl relative overflow-hidden',
        className,
        { 'cursor-pointer': onChange }
      )}
      max={max}
      value={value}
      style={{ '--progress-bar--width': width } as StyleProps}
      onClick={(event) => {
        if (!onChange || max === 0) {
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
        className={cx(
          'rounded-2xl bg-white h-full w-full pointer-events-none',
          {
            'transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]':
              animate,
          }
        )}
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
