import * as Types from '../../types/globalTypes.codegen';

export type SidebarQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type SidebarQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    user: { __typename: 'User'; id: string };
    playlists: {
      __typename: 'PlaylistConnection';
      pageInfo: {
        __typename: 'PageInfo';
        offset: number;
        limit: number;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename: 'PlaylistEdge';
        node: {
          __typename: 'Playlist';
          id: string;
          uri: string;
          name: string;
          images: Array<{ __typename: 'Image'; url: string }> | null;
          owner: { __typename: 'User'; id: string; displayName: string | null };
        };
      }>;
    } | null;
  } | null;
};
