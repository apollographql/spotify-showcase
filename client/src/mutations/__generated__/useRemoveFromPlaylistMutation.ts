import * as Types from '../../types/globalTypes.codegen';

export type RemoveFromPlaylistMutationVariables = Types.Exact<{
  input: Types.RemoveItemFromPlaylistInput;
}>;

export type RemoveFromPlaylistMutation = {
  __typename: 'Mutation';
  removeItemFromPlaylist: {
    __typename: 'RemoveItemFromPlaylistPayload';
    playlist: { __typename: 'Playlist'; id: string } | null;
  } | null;
};
