import { CSSProperties } from 'react';
import cx from 'classnames';
import { Play, Pause } from 'lucide-react';
import { ResumePlaybackMutationVariables } from '../types/api';
import styles from './PlayButton.module.scss';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import usePausePlaybackMutation from '../mutations/usePausePlaybackMutation';

type PlayButtonProps = {
  disabled?: boolean;
  size: CSSProperties['width'];
  playing: boolean;
  variant?: 'primary' | 'secondary';
  resumeContext?: ResumePlaybackMutationVariables['context'];
};

interface StyleProps extends CSSProperties {
  '--play-button--size': CSSProperties['width'];
}

const PlayButton = ({
  disabled,
  playing,
  resumeContext,
  variant = 'secondary',
  size,
}: PlayButtonProps) => {
  const [pause] = usePausePlaybackMutation();
  const [resume] = useResumePlaybackMutation();

  return (
    <button
      disabled={disabled}
      className={cx(styles.playButton, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      style={{ '--play-button--size': size } as StyleProps}
      onClick={() => {
        return playing ? pause() : resume({ context: resumeContext });
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
  );
};

export default PlayButton;
