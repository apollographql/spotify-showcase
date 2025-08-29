import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';
import {
  TransferPlaybackInput,
  TransferPlaybackMutation,
  TransferPlaybackMutationVariables,
} from '../types/api';

const TRANSFER_PLAYBACK_MUTATION = gql`
  mutation TransferPlaybackMutation($input: TransferPlaybackInput!) {
    transferPlayback(input: $input) {
      playbackState {
        device {
          id
        }
      }
    }
  }
`;

const useTransferPlaybackMutation = () => {
  const [execute, result] = useMutation<
    TransferPlaybackMutation,
    TransferPlaybackMutationVariables
  >(TRANSFER_PLAYBACK_MUTATION);

  const transferPlayback = useCallback(
    ({ deviceId }: { deviceId: TransferPlaybackInput['deviceIds'][0] }) => {
      return execute({
        variables: { input: { deviceIds: [deviceId] } },
        optimisticResponse: {
          transferPlayback: {
            __typename: 'TransferPlaybackPayload',
            playbackState: {
              __typename: 'PlaybackState',
              device: {
                __typename: 'Device',
                id: deviceId,
              },
            },
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: 'PlaybackState' }),
            fields: {
              device: (existing, { toReference }) => {
                const ref = toReference({
                  __typename: 'Device',
                  id: deviceId,
                });

                return ref ? ref : existing;
              },
            },
          });
        },
      });
    },
    [execute]
  );

  return [transferPlayback, result] as const;
};

export default useTransferPlaybackMutation;
