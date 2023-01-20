import { useCallback } from 'react';
import { gql, Reference, useMutation } from '@apollo/client';
import {
  Playlist,
  RemoveFromPlaylistMutation,
  RemoveFromPlaylistMutationVariables,
  RemoveItemFromPlaylistInput,
} from '../types/api';

const REMOVE_FROM_PLAYLIST_MUTATION = gql`
  mutation RemoveFromPlaylistMutation($input: RemoveItemFromPlaylistInput!) {
    removeItemFromPlaylist(input: $input) {
      playlist {
        id
      }
    }
  }
`;

const useRemoveFromPlaylistMutation = () => {
  const [execute, result] = useMutation<
    RemoveFromPlaylistMutation,
    RemoveFromPlaylistMutationVariables
  >(REMOVE_FROM_PLAYLIST_MUTATION);

  const removeFromPlaylist = useCallback(
    (input: RemoveItemFromPlaylistInput) => {
      return execute({
        variables: { input },
        optimisticResponse: {
          removeItemFromPlaylist: {
            __typename: 'RemoveItemFromPlaylistPayload',
            playlist: {
              __typename: 'Playlist',
              id: input.playlistId,
            },
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Playlist',
              id: input.playlistId,
            }),
            fields: {
              tracks: (tracks: Playlist['tracks'], { readField }) => {
                const edges = readField<Playlist['tracks']['edges']>(
                  'edges',
                  tracks
                );

                return {
                  ...tracks,
                  edges: edges?.filter((edge) => {
                    const node = readField<Reference>('node', edge);

                    return !input.tracks
                      .map((track) => track.uri)
                      .includes(readField<string>('uri', node) ?? '');
                  }),
                };
              },
            },
          });
        },
      });
    },
    [execute]
  );

  return [removeFromPlaylist, result] as const;
};

export default useRemoveFromPlaylistMutation;
