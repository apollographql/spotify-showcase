import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client/react";
import { useCallback } from 'react';
import { NOTIFICATION } from '../constants';
import { notify } from '../notifications';
import {
  SaveAlbumsInput,
  SaveAlbumsMutation,
  SaveAlbumsMutationVariables,
} from '../types/api';

const SAVE_ALBUMS_MUTATION = gql`
  mutation SaveAlbumsMutation($input: SaveAlbumsInput!) {
    saveAlbums(input: $input) {
      savedAlbums {
        id
      }
    }
  }
`;

const useSaveAlbumsMutation = () => {
  const [execute, result] = useMutation<
    SaveAlbumsMutation,
    SaveAlbumsMutationVariables
  >(SAVE_ALBUMS_MUTATION, {
    onCompleted: () => {
      notify(NOTIFICATION.SAVED_ALBUM);
    },
  });

  const saveAlbums = useCallback(
    (input: SaveAlbumsInput) => {
      return execute({
        variables: { input },
        optimisticResponse: {
          saveAlbums: {
            __typename: 'SaveAlbumsPayload',
            savedAlbums: input.ids.map((id) => ({ __typename: 'Album', id })),
          },
        },
        update: (cache, { data }) => {
          if (!data?.saveAlbums?.savedAlbums) {
            return;
          }

          cache.writeFragment({
            id: cache.identify({ __typename: 'CurrentUser' }),
            fragment: gql`
              fragment SaveAlbumsMutationFragment on CurrentUser {
                albumsContains(ids: $ids)
              }
            `,
            data: {
              albumsContains: input.ids.map(() => true),
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

  return [saveAlbums, result] as const;
};

export default useSaveAlbumsMutation;
