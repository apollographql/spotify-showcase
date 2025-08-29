import { gql, Reference } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  RemoveSavedTracksMutation,
  RemoveSavedTracksMutationVariables,
  RemoveSavedTracksInput,
} from '../types/api';
import { useCallback } from 'react';
import { notify } from '../notifications';
import { NOTIFICATION } from '../constants';

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
  >(REMOVE_SAVED_TRACKS_MUTATION, {
    onError: () => {
      notify(NOTIFICATION.REMOVED_SAVED_TRACK_ERROR);
    },
    onCompleted: () => {
      notify(NOTIFICATION.REMOVED_SAVED_TRACK);
    },
  });

  const removeSavedTracks = useCallback(
    (input: RemoveSavedTracksInput) => {
      return execute({
        variables: { input },
        optimisticResponse: {
          removeSavedTracks: {
            __typename: 'RemoveSavedTracksPayload',
            removedTracks: input.ids.map((id) => ({ __typename: 'Track', id })),
          },
        },
        update: (cache, { data }) => {
          if (!data?.removeSavedTracks?.removedTracks) {
            return;
          }

          cache.modify({
            id: cache.identify({ __typename: 'CurrentUser' }),
            fields: {
              tracks: (existing, { readField }) => {
                const edgeRefs =
                  readField<Reference[]>('edges', existing) ?? [];

                return {
                  ...existing,
                  edges: edgeRefs.filter((ref) => {
                    const node = readField<Reference>('node', ref);
                    const id = readField<string>('id', node) ?? 'UNKNOWN';

                    return input.ids.indexOf(id) === -1;
                  }),
                };
              },
            },
          });

          cache.writeFragment({
            id: cache.identify({ __typename: 'CurrentUser' }),
            fragment: gql`
              fragment RemovedSavedTracksMutationFragment on CurrentUser {
                tracksContains(ids: $ids)
              }
            `,
            data: {
              tracksContains: input.ids.map(() => false),
            },
            variables: {
              ids: input.ids,
            },
          });
        },
      });
    },
    [execute]
  );

  return [removeSavedTracks, result] as const;
};

export default useRemoveSavedTracksMutation;
