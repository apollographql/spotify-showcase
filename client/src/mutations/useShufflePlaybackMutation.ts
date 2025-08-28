import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  ShufflePlaybackMutation,
  ShufflePlaybackMutationVariables,
} from '../types/api';

const SHUFFLE_PLAYBACK_MUTATION = gql`
  mutation ShufflePlaybackMutation($state: Boolean!) {
    shufflePlayback(state: $state) {
      playbackState {
        shuffleState
      }
    }
  }
`;

const useShufflePlaybackMutation = () => {
  const [execute, result] = useMutation<
    ShufflePlaybackMutation,
    ShufflePlaybackMutationVariables
  >(SHUFFLE_PLAYBACK_MUTATION);

  const shufflePlayback = useCallback(
    (variables: ShufflePlaybackMutationVariables) =>
      execute({
        variables,
        optimisticResponse: {
          shufflePlayback: {
            __typename: 'ShufflePlaybackResponse',
            playbackState: {
              __typename: 'PlaybackState',
              shuffleState: variables.state,
            },
          },
        },
      }),
    [execute]
  );

  return [shufflePlayback, result] as const;
};

export default useShufflePlaybackMutation;
