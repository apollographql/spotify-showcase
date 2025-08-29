import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
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
    return execute({
      optimisticResponse: {
        pausePlayback: {
          __typename: 'PausePlaybackResponse',
          playbackState: { __typename: 'PlaybackState', isPlaying: false },
        },
      },
    });
  }, [execute]);

  return [pausePlayback, result] as const;
};

export default usePausePlaybackMutation;
