import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { NOTIFICATION } from '../constants';
import { notify } from '../notifications';
import {
  Playlist,
  PlaylistTrackEdge,
  AddItemsToPlaylistInput,
  AddToPlaylistMutation,
  AddToPlaylistMutationVariables,
} from '../types/api';
import {
  parseSpotifyIDFromURI,
  parseSpotifyTypeFromURI,
} from '../utils/spotify';
import { WithRef } from '../utils/types';

type PlaylistTrackEdgeWithNodeRef = WithRef<PlaylistTrackEdge, 'node'>;

const ADD_TO_PLAYLIST_MUTATION = gql`
  mutation AddToPlaylistMutation($input: AddItemsToPlaylistInput!) {
    addItemsToPlaylist(input: $input) {
      playlist {
        id
      }
    }
  }
`;

const TYPENAMES_FROM_URI_TYPES: Record<string, string> = {
  track: 'Track',
  episode: 'Episode',
};

const useAddToPlaylistMutation = () => {
  const [execute, result] = useMutation<
    AddToPlaylistMutation,
    AddToPlaylistMutationVariables
  >(ADD_TO_PLAYLIST_MUTATION, {
    onCompleted: () => {
      notify(NOTIFICATION.ADDED_TO_PLAYLIST);
    },
  });

  const addToPlaylist = useCallback(
    (input: AddItemsToPlaylistInput) => {
      return execute({
        variables: { input },
        update: (cache) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Playlist',
              id: input.playlistId,
            }),
            fields: {
              tracks: (
                tracks: Playlist['tracks'],
                { readField, toReference }
              ) => {
                const edges =
                  readField<PlaylistTrackEdgeWithNodeRef[]>('edges', tracks) ??
                  [];

                const refs = input.uris
                  .map((uri) => {
                    const id = parseSpotifyIDFromURI(uri);
                    const type = parseSpotifyTypeFromURI(uri);
                    const node = toReference({
                      __typename: TYPENAMES_FROM_URI_TYPES[type ?? ''],
                      id,
                    });

                    if (node) {
                      return {
                        __typename: 'PlaylistTrackEdge',
                        addedAt: new Date().toISOString(),
                        node,
                      } as PlaylistTrackEdgeWithNodeRef;
                    }
                  })
                  .filter(Boolean);

                return {
                  ...tracks,
                  edges: edges.concat(refs),
                };
              },
            },
          });
        },
      });
    },
    [execute]
  );

  return [addToPlaylist, result] as const;
};

export default useAddToPlaylistMutation;
