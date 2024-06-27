import * as Types from '../../types/globalTypes.codegen';

export type RemoveSavedAlbumsMutationVariables = Types.Exact<{
  input: Types.RemoveSavedAlbumsInput;
}>;

export type RemoveSavedAlbumsMutation = {
  __typename: 'Mutation';
  removeSavedAlbums: {
    __typename: 'RemoveSavedAlbumsPayload';
    removedAlbums: Array<{ __typename: 'Album'; id: string }> | null;
  } | null;
};

export type RemovedSavedAlbumsMutationFragment = {
  __typename: 'CurrentUser';
  albumsContains: Array<boolean> | null;
};
