import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { AddItemToPlaybackQueueInput } from '../types/api';

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

const useAddToQueueMutation = () => {
  const [execute, result] = useMutation(ADD_TO_QUEUE_MUTATION);

  const addToQueue = useCallback(
    (input: AddItemToPlaybackQueueInput) => {
      return execute({ variables: { input } });
    },
    [execute]
  );

  return [addToQueue, result] as const;
};

export default useAddToQueueMutation;
