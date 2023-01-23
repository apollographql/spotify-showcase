import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { notify } from '../notifications';
import {
  AddToQueueMutation,
  AddToQueueMutationVariables,
  AddItemToPlaybackQueueInput,
} from '../types/api';
import { NOTIFICATION } from '../constants';

const ADD_TO_QUEUE_MUTATION = gql`
  mutation AddToQueueMutation($input: AddItemToPlaybackQueueInput!) {
    addItemToPlaybackQueue(input: $input) {
      playbackQueue {
        currentlyPlaying {
          __typename
          id
        }
      }
    }
  }
`;

interface Options {
  notification?: boolean;
}

const useAddToQueueMutation = ({ notification = true }: Options = {}) => {
  const [execute, result] = useMutation<
    AddToQueueMutation,
    AddToQueueMutationVariables
  >(ADD_TO_QUEUE_MUTATION, {
    onError: () => {
      if (notification) {
        notify('Could not add item to queue');
      }
    },
    onCompleted: () => {
      if (notification) {
        notify(NOTIFICATION.ADDED_TO_QUEUE);
      }
    },
  });

  const addToQueue = useCallback(
    (input: AddItemToPlaybackQueueInput) => {
      return execute({ variables: { input } });
    },
    [execute]
  );

  return [addToQueue, result] as const;
};

export default useAddToQueueMutation;
