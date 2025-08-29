import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  SeekToPositionMutation,
  SeekToPositionMutationVariables,
} from '../types/api';

const SEEK_TO_POSITION_MUTATION = gql`
  mutation SeekToPositionMutation($positionMs: Int!) {
    seekToPosition(positionMs: $positionMs) {
      playbackState {
        progressMs
      }
    }
  }
`;

const useSeekToPositionMutation = () => {
  const [execute, result] = useMutation<
    SeekToPositionMutation,
    SeekToPositionMutationVariables
  >(SEEK_TO_POSITION_MUTATION);

  const seekToPosition = useCallback(
    (variables: SeekToPositionMutationVariables) =>
      execute({
        variables,
        optimisticResponse: {
          seekToPosition: {
            __typename: 'SeekToPositionResponse',
            playbackState: {
              __typename: 'PlaybackState',
              progressMs: variables.positionMs,
            },
          },
        },
      }),
    [execute]
  );

  return [seekToPosition, result] as const;
};

export default useSeekToPositionMutation;
