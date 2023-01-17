import { gql, useMutation } from '@apollo/client';
import {
  RemoveSavedTracksMutation,
  RemoveSavedTracksMutationVariables,
  RemoveSavedTracksInput,
} from '../types/api';
import { useCallback } from 'react';

const REMOVE_SAVED_TRACKS_MUTATION = gql`
  mutation RemoveSavedTracksMutation($input: RemoveSavedTracksInput!) {
    removeSavedTracks(input: $input) {
      removedTracks {
        id
      }
    }
  }
`;

const useRemoveSavedTracksMutation = () => {
  const [execute, result] = useMutation<
    RemoveSavedTracksMutation,
    RemoveSavedTracksMutationVariables
  >(REMOVE_SAVED_TRACKS_MUTATION);

  const removeSavedTracks = useCallback(
    (input: RemoveSavedTracksInput) => {
      return execute({ variables: { input } });
    },
    [execute]
  );

  return [removeSavedTracks, result] as const;
};

export default useRemoveSavedTracksMutation;
