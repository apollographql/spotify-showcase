import { CSSProperties } from 'react';
import cx from 'classnames';
import { Play, Pause } from 'lucide-react';
import Tooltip from './Tooltip';
import styles from './PlayButton.module.scss';
import usePausePlaybackMutation from '../mutations/usePausePlaybackMutation';

type PlayButtonProps = {
  disabled?: boolean;
  size: CSSProperties['width'];
  playing: boolean;
  variant?: 'primary' | 'secondary';
  onPlay?: () => void;
};

interface StyleProps extends CSSProperties {
  '--play-button--size': CSSProperties['width'];
}

const PlayButton = ({
  disabled,
  playing,
  variant = 'secondary',
  onPlay: onClickPlay,
  size,
}: PlayButtonProps) => {
  const [pause] = usePausePlaybackMutation();

  return (
    <Tooltip content={playing ? 'Pause' : 'Play'}>
      <button
        disabled={disabled}
        className={cx(styles.playButton, {
          [styles.primary]: variant === 'primary',
          [styles.secondary]: variant === 'secondary',
        })}
        style={{ '--play-button--size': size } as StyleProps}
        onClick={() => {
          return playing ? pause() : onClickPlay?.();
        }}
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
    </Tooltip>
  );
};

export default PlayButton;
