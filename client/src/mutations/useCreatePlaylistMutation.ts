import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { notify } from '../notifications';
import { NOTIFICATION } from '../constants';
import {
  CreatePlaylistMutation,
  CreatePlaylistMutationVariables,
  CreatePlaylistInput,
} from '../types/api';

const CREATE_PLAYLIST_MUTATION = gql`
  mutation CreatePlaylist($input: CreatePlaylistInput!) {
    createPlaylist(input: $input) {
      playlist {
        id
        name
        description
        public
      }
    }
  }
`;

const useCreatePlaylistMutation = () => {
  const [execute, result] = useMutation<
    CreatePlaylistMutation,
    CreatePlaylistMutationVariables
  >(CREATE_PLAYLIST_MUTATION, {
    onCompleted: () => {
      notify(NOTIFICATION.PLAYLIST_CREATED);
    },
  });

  const createPlaylist = (input: CreatePlaylistInput) => {
    return execute({ variables: { input } });
  };

  return [createPlaylist, result] as const;
};

export default useCreatePlaylistMutation;
