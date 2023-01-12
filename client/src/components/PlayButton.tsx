import { CSSProperties } from 'react';
import cx from 'classnames';
import { gql, useMutation } from '@apollo/client';
import { Play, Pause } from 'lucide-react';
import {
  PausePlaybackMutation,
  PausePlaybackMutationVariables,
  ResumePlaybackMutation,
  ResumePlaybackMutationVariables,
} from '../types/api';
import styles from './PlayButton.module.scss';

type PlayButtonProps = {
  disabled?: boolean;
  size: CSSProperties['width'];
  playing: boolean;
  variant?: 'primary' | 'secondary';
};

interface StyleProps extends CSSProperties {
  '--play-button--size': CSSProperties['width'];
}

const RESUME_PLAYBACK_MUTATION = gql`
  mutation ResumePlaybackMutation($context: ResumePlaybackContextInput) {
    resumePlayback(context: $context) {
      playbackState {
        isPlaying
      }
    }
  }
`;

const PAUSE_PLAYBACK_MUTATION = gql`
  mutation PausePlaybackMutation($context: PausePlaybackContextInput) {
    pausePlayback(context: $context) {
      playbackState {
        isPlaying
      }
    }
  }
`;

const PlayButton = ({
  disabled,
  playing,
  variant = 'secondary',
  size,
}: PlayButtonProps) => {
  const [pause] = useMutation<
    PausePlaybackMutation,
    PausePlaybackMutationVariables
  >(PAUSE_PLAYBACK_MUTATION);
  const [resume] = useMutation<
    ResumePlaybackMutation,
    ResumePlaybackMutationVariables
  >(RESUME_PLAYBACK_MUTATION);

  const handleResumePlayback = () => {
    resume({
      optimisticResponse: {
        resumePlayback: {
          __typename: 'ResumePlaybackResponse',
          playbackState: { __typename: 'PlaybackState', isPlaying: true },
        },
      },
    });
  };

  const handlePause = () => {
    pause({
      optimisticResponse: {
        pausePlayback: {
          __typename: 'PausePlaybackResponse',
          playbackState: { __typename: 'PlaybackState', isPlaying: false },
        },
      },
    });
  };

  return (
    <button
      disabled={disabled}
      className={cx(styles.playButton, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      style={{ '--play-button--size': size } as StyleProps}
      onClick={() => {
        return playing ? handlePause() : handleResumePlayback();
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
