import * as Types from '../../../types/globalTypes.codegen';

export type CollectionPodcastsRouteQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CollectionPodcastsRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    episodes: {
      __typename: 'SavedEpisodesConnection';
      pageInfo: { __typename: 'PageInfo'; total: number };
      edges: Array<{
        __typename: 'SavedEpisodeEdge';
        node: {
          __typename: 'Episode';
          id: string;
          name: string;
          show: { __typename: 'Show'; id: string; name: string };
        };
      }>;
    } | null;
    shows: {
      __typename: 'SavedShowsConnection';
      pageInfo: {
        __typename: 'PageInfo';
        offset: number;
        limit: number;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename: 'SavedShowEdge';
        node: {
          __typename: 'Show';
          id: string;
          name: string;
          publisher: string;
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }>;
    } | null;
  } | null;
};

export type CollectionPodcastsRoutePaginatedQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CollectionPodcastsRoutePaginatedQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    shows: {
      __typename: 'SavedShowsConnection';
      pageInfo: {
        __typename: 'PageInfo';
        offset: number;
        limit: number;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename: 'SavedShowEdge';
        node: {
          __typename: 'Show';
          id: string;
          name: string;
          publisher: string;
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }>;
    } | null;
  } | null;
};
