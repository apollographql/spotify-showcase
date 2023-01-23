import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { NOTIFICATION } from '../constants';
import { notify } from '../notifications';
import {
  RemoveSavedAlbumsInput,
  RemoveSavedAlbumsMutation,
  RemoveSavedAlbumsMutationVariables,
} from '../types/api';

const REMOVE_SAVED_ALBUMS_MUTATION = gql`
  mutation RemoveSavedAlbumsMutation($input: RemoveSavedAlbumsInput!) {
    removeSavedAlbums(input: $input) {
      removedAlbums {
        id
      }
    }
  }
`;

const useRemoveSavedAlbumsMutation = () => {
  const [execute, result] = useMutation<
    RemoveSavedAlbumsMutation,
    RemoveSavedAlbumsMutationVariables
  >(REMOVE_SAVED_ALBUMS_MUTATION, {
    onCompleted: () => {
      notify(NOTIFICATION.REMOVED_SAVED_ALBUM);
    },
  });

  const removeSavedAlbums = useCallback(
    (input: RemoveSavedAlbumsInput) => {
      return execute({
        variables: { input },
        optimisticResponse: {
          removeSavedAlbums: {
            __typename: 'RemoveSavedAlbumsPayload',
            removedAlbums: input.ids.map((id) => ({ __typename: 'Album', id })),
          },
        },
        update: (cache, { data }) => {
          if (!data?.removeSavedAlbums?.removedAlbums) {
            return;
          }

          cache.writeFragment({
            id: cache.identify({ __typename: 'CurrentUser' }),
            fragment: gql`
              fragment RemovedSavedAlbumsMutationFragment on CurrentUser {
                albumsContains(ids: $ids)
              }
            `,
            data: {
              albumsContains: input.ids.map(() => false),
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

  return [removeSavedAlbums, result] as const;
};

export default useRemoveSavedAlbumsMutation;
