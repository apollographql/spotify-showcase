import * as Types from '../../../types/globalTypes.codegen';

export type CollectionAlbumsRouteQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CollectionAlbumsRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    albums: {
      __typename: 'SavedAlbumsConnection';
      pageInfo: {
        __typename: 'PageInfo';
        limit: number;
        offset: number;
        hasNextPage: boolean;
      };
      edges: Array<{
        __typename: 'SavedAlbumEdge';
        node: {
          __typename: 'Album';
          id: string;
          name: string;
          albumType: Types.AlbumType;
          totalTracks: number;
          releaseDate: { __typename: 'ReleaseDate'; date: string };
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }>;
    } | null;
  } | null;
};
