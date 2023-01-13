import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  PausePlaybackMutation,
  PausePlaybackMutationVariables,
} from '../types/api';

const PAUSE_PLAYBACK_MUTATION = gql`
  mutation PausePlaybackMutation {
    pausePlayback {
      playbackState {
        isPlaying
      }
    }
  }
`;

const usePausePlaybackMutation = () => {
  const [execute, result] = useMutation<
    PausePlaybackMutation,
    PausePlaybackMutationVariables
  >(PAUSE_PLAYBACK_MUTATION);

  const pausePlayback = useCallback(() => {
    return execute();
  }, [execute]);

  return [pausePlayback, result] as const;
};

export default usePausePlaybackMutation;
