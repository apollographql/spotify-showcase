import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  SetVolumeMutation,
  SetVolumeMutationVariables,
  SetVolumeCacheFragment,
} from '../types/api';

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

const SET_VOLUME_CACHE_FRAGMENT = gql`
  fragment SetVolumeCacheFragment on PlaybackState {
    device {
      id
    }
  }
`;

const useSetVolumeMutation = () => {
  const [execute, result] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION);

  const setVolume = useCallback(
    (variables: SetVolumeMutationVariables) => {
      const { client } = result;

      const playbackState = client.readFragment<SetVolumeCacheFragment>({
        id: client.cache.identify({ __typename: 'PlaybackState' }),
        fragment: SET_VOLUME_CACHE_FRAGMENT,
      });

      return execute({
        variables,
        optimisticResponse: {
          setVolume: {
            __typename: 'SetVolumeResponse',
            playbackState: {
              __typename: 'PlaybackState',
              device: {
                __typename: 'Device',
                id: playbackState?.device.id ?? '1',
                volumePercent: variables.volumePercent,
              },
            },
          },
        },
      });
    },
    [execute, result]
  );

  return [setVolume, result] as const;
};

export default useSetVolumeMutation;
