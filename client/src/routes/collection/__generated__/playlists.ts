import * as Types from '../../../types/globalTypes.codegen';

export type CollectionPlaylistsRouteQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CollectionPlaylistsRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    user: { __typename: 'User'; id: string };
    episodes: {
      __typename: 'SavedEpisodesConnection';
      pageInfo: { __typename: 'PageInfo'; total: number };
    } | null;
    tracks: {
      __typename: 'SavedTracksConnection';
      pageInfo: { __typename: 'PageInfo'; total: number };
      edges: Array<{
        __typename: 'SavedTrackEdge';
        node: {
          __typename: 'Track';
          id: string;
          name: string;
          artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
        };
      }>;
    } | null;
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
          name: string;
          description: string | null;
          uri: string;
          images: Array<{ __typename: 'Image'; url: string }> | null;
        };
      }>;
    } | null;
  } | null;
};

export type CollectionPlaylistsRoutePaginatedQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CollectionPlaylistsRoutePaginatedQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
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
          name: string;
          description: string | null;
          uri: string;
          images: Array<{ __typename: 'Image'; url: string }> | null;
        };
      }>;
    } | null;
  } | null;
};
