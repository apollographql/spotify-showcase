import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  SkipToPreviousMutation,
  SkipToPreviousMutationVariables,
} from '../types/api';

const SKIP_TO_PREVIOUS_MUTATION = gql`
  mutation SkipToPreviousMutation {
    skipToPrevious {
      playbackState {
        progressMs
        item {
          __typename
          ... on Track {
            id
            name
            album {
              id
              name
              images {
                url
              }
            }
            artists {
              id
              name
            }
          }

          ... on Episode {
            id
            name
            show {
              id
              name
              images {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const useSkipToPreviousMutation = () => {
  const [execute, result] = useMutation<
    SkipToPreviousMutation,
    SkipToPreviousMutationVariables
  >(SKIP_TO_PREVIOUS_MUTATION);

  const skipToPrevious = useCallback(() => execute(), [execute]);

  return [skipToPrevious, result] as const;
};

export default useSkipToPreviousMutation;
