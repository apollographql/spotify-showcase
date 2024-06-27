import * as Types from '../../../types/globalTypes.codegen';

export type AddToPlaylistQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type AddToPlaylistQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    playlists: {
      __typename: 'PlaylistConnection';
      pageInfo: {
        __typename: 'PageInfo';
        hasNextPage: boolean;
        limit: number;
        offset: number;
      };
      edges: Array<{
        __typename: 'PlaylistEdge';
        node: { __typename: 'Playlist'; id: string; name: string };
      }>;
    } | null;
  } | null;
};
