import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
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

const useRepeatModeMutation = () => {
  const [execute, result] = useMutation<
    SetRepeatModeMutation,
    SetRepeatModeMutationVariables
  >(SET_REPEAT_MODE_MUTATION);

  const setRepeatMode = useCallback(
    (variables: SetRepeatModeMutationVariables) => execute({ variables }),
    [execute]
  );

  return [setRepeatMode, result] as const;
};

export default useRepeatModeMutation;
