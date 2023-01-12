import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { SetVolumeMutation, SetVolumeMutationVariables } from '../types/api';

const SET_VOLUME_MUTATION = gql`
  mutation SetVolumeMutation($volumePercent: Int!) {
    setVolume(volumePercent: $volumePercent) {
      playbackState {
        device {
          id
          volumePercent
        }
      }
    }
  }
`;

const useSetVolumeMutation = () => {
  const [execute, result] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION);

  const setVolume = useCallback(
    (variables: SetVolumeMutationVariables) => execute({ variables }),
    [execute]
  );

  return [setVolume, result] as const;
};

export default useSetVolumeMutation;
