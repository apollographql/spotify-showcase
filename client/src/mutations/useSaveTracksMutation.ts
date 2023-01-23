import { gql, useMutation, Reference } from '@apollo/client';
import {
  SaveTracksMutation,
  SaveTracksMutationVariables,
  SaveTracksInput,
} from '../types/api';
import { useCallback } from 'react';
import { notify } from '../notifications';
import { NOTIFICATION } from '../constants';

const SAVE_TRACKS_MUTATION = gql`
  mutation SaveTracksMutation($input: SaveTracksInput!) {
    saveTracks(input: $input) {
      savedTracks {
        id
      }
    }
  }
`;

const useSaveTracksMutation = () => {
  const [execute, result] = useMutation<
    SaveTracksMutation,
    SaveTracksMutationVariables
  >(SAVE_TRACKS_MUTATION, {
    onError: () => {
      notify(NOTIFICATION.SAVED_TRACK_ERROR);
    },
    onCompleted: () => {
      notify(NOTIFICATION.SAVED_TRACK);
    },
  });

  const saveTracks = useCallback(
    (input: SaveTracksInput) => {
      return execute({
        variables: { input },
        optimisticResponse: {
          saveTracks: {
            __typename: 'SaveTracksPayload',
            savedTracks: input.ids.map((id) => ({ __typename: 'Track', id })),
          },
        },
        update: (cache, { data }) => {
          if (!data?.saveTracks?.savedTracks) {
            return;
          }

          cache.modify({
            id: cache.identify({ __typename: 'CurrentUser' }),
            fields: {
              tracks: (existing, { readField, toReference }) => {
                return {
                  ...existing,
                  edges: input.ids.reduce<Reference[]>((edges, id) => {
                    const trackRef = toReference({ __typename: 'Track', id });

                    const edgeRef = toReference(
                      {
                        __typename: 'SavedTrackEdge',
                        addedAt: new Date().toISOString(),
                        node: trackRef,
                      },
                      true
                    );

                    if (!edgeRef) {
                      return edges;
                    }

                    return [edgeRef, ...edges];
                  }, Array.from(readField<Reference[]>('edges', existing) ?? [])),
                };
              },
              tracksContains(existing: Record<string, boolean>) {
                return input.ids.reduce(
                  (memo, id) => ({ ...memo, [id]: true }),
                  existing
                );
              },
            },
          });
        },
      });
    },
    [execute]
  );

  return [saveTracks, result] as const;
};

export default useSaveTracksMutation;
