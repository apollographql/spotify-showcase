import * as Types from '../../types/globalTypes.codegen';

export type PlaylistDetailsModalQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type PlaylistDetailsModalQuery = {
  __typename: 'Query';
  playlist: {
    __typename: 'Playlist';
    id: string;
    name: string;
    description: string | null;
    images: Array<{ __typename: 'Image'; url: string }> | null;
  } | null;
};
