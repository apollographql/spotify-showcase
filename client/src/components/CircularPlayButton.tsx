import { CSSProperties, ComponentPropsWithoutRef } from 'react';
import { Play, Pause } from 'lucide-react';
import styles from './CircularPlayButton.module.scss';

type NativeButtonProps = ComponentPropsWithoutRef<'button'>;

interface CircularPlayButtonProps {
  size: CSSProperties['width'];
  playing: boolean;
  onClick?: NativeButtonProps['onClick'];
}

interface StyleProperties extends CSSProperties {
  '--circular-play-button--size': CSSProperties['width'];
}

const CircularPlayButton = ({
  size,
  onClick,
  playing,
}: CircularPlayButtonProps) => (
  <button
    className={styles.circularPlayButton}
    onClick={onClick}
    style={{ '--circular-play-button--size': size } as StyleProperties}
  >
    {playing ? (
      <Pause size="60%" />
    ) : (
      <Play className={styles.centeredPlayIcon} size="60%" />
    )}
  </button>
);

export default CircularPlayButton;
