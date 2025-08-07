import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import { useCallback } from 'react';
import { SkipToNextMutation, SkipToNextMutationVariables } from '../types/api';

const SKIP_TO_NEXT_MUTATION = gql`
  mutation SkipToNextMutation {
    skipToNext {
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

const useSkipToNextMutation = () => {
  const [execute, result] = useMutation<
    SkipToNextMutation,
    SkipToNextMutationVariables
  >(SKIP_TO_NEXT_MUTATION);

  const skipToNext = useCallback(() => execute(), [execute]);

  return [skipToNext, result] as const;
};

export default useSkipToNextMutation;
