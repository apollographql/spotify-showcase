import { useCallback } from 'react';
import { gql, Reference } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
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
        update: (cache) => {
          cache.modify<Playlist>({
            id: cache.identify({
              __typename: 'Playlist',
              id: input.playlistId,
            }),
            fields: {
              tracks: (tracks, { readField }) => {
                const uris = input.tracks.map((track) => track.uri);
                const edges =
                  readField<Playlist['tracks']['edges']>('edges', tracks) ?? [];

                return {
                  ...tracks,
                  edges: edges.filter((edge) => {
                    const node = readField<Reference>('node', edge);
                    const uri = readField<string>('uri', node) ?? 'UNKNOWN';

                    return uris.indexOf(uri) === -1;
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
