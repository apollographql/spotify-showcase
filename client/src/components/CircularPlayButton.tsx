import { CSSProperties, ComponentPropsWithoutRef } from 'react';
import { Play, Pause } from 'lucide-react';
import cx from 'classnames';
import styles from './CircularPlayButton.module.scss';

type NativeButtonProps = ComponentPropsWithoutRef<'button'>;

interface CircularPlayButtonProps {
  disabled?: boolean;
  size: CSSProperties['width'];
  playing: boolean;
  onClick?: NativeButtonProps['onClick'];
  variant?: 'primary' | 'secondary';
}

interface StyleProperties extends CSSProperties {
  '--circular-play-button--size': CSSProperties['width'];
}

const CircularPlayButton = ({
  disabled,
  size,
  onClick,
  playing,
  variant = 'secondary',
}: CircularPlayButtonProps) => (
  <button
    disabled={disabled}
    className={cx(styles.circularPlayButton, {
      [styles.primary]: variant === 'primary',
      [styles.secondary]: variant === 'secondary',
    })}
    onClick={onClick}
    style={{ '--circular-play-button--size': size } as StyleProperties}
  >
    {playing ? (
      <Pause size="60%" fill="currentColor" />
    ) : (
      <Play
        className={styles.centeredPlayIcon}
        size="60%"
        fill="currentColor"
      />
    )}
  </button>
);

export default CircularPlayButton;
