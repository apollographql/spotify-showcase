import * as Types from '../../../types/globalTypes.codegen';

export type CollectionArtistsRouteQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type CollectionArtistsRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    followedArtists: {
      __typename: 'FollowedArtistsConnection';
      pageInfo: {
        __typename: 'PageInfoCursorBased';
        cursors: { __typename: 'Cursors'; after: string | null } | null;
      };
      edges: Array<{
        __typename: 'FollowedArtistEdge';
        node: {
          __typename: 'Artist';
          id: string;
          name: string;
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }>;
    } | null;
  } | null;
};
