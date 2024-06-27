import * as Types from '../../types/globalTypes.codegen';

export type AddToPlaylistMutationVariables = Types.Exact<{
  input: Types.AddItemsToPlaylistInput;
}>;

export type AddToPlaylistMutation = {
  __typename: 'Mutation';
  addItemsToPlaylist: {
    __typename: 'AddItemsToPlaylistPayload';
    playlist: { __typename: 'Playlist'; id: string } | null;
  } | null;
};
