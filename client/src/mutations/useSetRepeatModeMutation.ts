import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  SetRepeatModeMutation,
  SetRepeatModeMutationVariables,
} from '../types/api';

const SET_REPEAT_MODE_MUTATION = gql`
  mutation SetRepeatModeMutation($state: RepeatMode!) {
    setRepeatMode(state: $state) {
      playbackState {
        repeatState
      }
    }
  }
`;

const useSetRepeatModeMutation = () => {
  const [execute, result] = useMutation<
    SetRepeatModeMutation,
    SetRepeatModeMutationVariables
  >(SET_REPEAT_MODE_MUTATION);

  const setRepeatMode = useCallback(
    (variables: SetRepeatModeMutationVariables) =>
      execute({
        variables,
        optimisticResponse: {
          setRepeatMode: {
            __typename: 'SetRepeatModeResponse',
            playbackState: {
              __typename: 'PlaybackState',
              repeatState: variables.state,
            },
          },
        },
      }),
    [execute]
  );

  return [setRepeatMode, result] as const;
};

export default useSetRepeatModeMutation;
