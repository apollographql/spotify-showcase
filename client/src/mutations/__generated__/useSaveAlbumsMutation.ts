import * as Types from '../../types/globalTypes.codegen';

export type SaveAlbumsMutationVariables = Types.Exact<{
  input: Types.SaveAlbumsInput;
}>;

export type SaveAlbumsMutation = {
  __typename: 'Mutation';
  saveAlbums: {
    __typename: 'SaveAlbumsPayload';
    savedAlbums: Array<{ __typename: 'Album'; id: string }> | null;
  } | null;
};

export type SaveAlbumsMutationFragment = {
  __typename: 'CurrentUser';
  albumsContains: Array<boolean> | null;
};
