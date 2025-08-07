import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import {
  SetVolumeMutation,
  SetVolumeMutationVariables,
  SetVolumeCacheFragment,
} from '../types/api';
import usePlaybackState from '../hooks/usePlaybackState';

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
      volumePercent
    }
  }
`;

const useSetVolumeMutation = () => {
  const [execute, result] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION);

  const playbackState = usePlaybackState<SetVolumeCacheFragment>({
    fragment: SET_VOLUME_CACHE_FRAGMENT,
  });

  const setVolume = useCallback(
    (variables: SetVolumeMutationVariables) => {
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
    [execute, playbackState]
  );

  return [setVolume, result] as const;
};

export default useSetVolumeMutation;
