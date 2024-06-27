import * as Types from '../../../types/globalTypes.codegen';

export type SearchRouteQueryVariables = Types.Exact<{
  q: Types.Scalars['String']['input'];
  type: Array<Types.SearchType> | Types.SearchType;
}>;

export type SearchRouteQuery = {
  __typename: 'Query';
  search: {
    __typename: 'SearchResults';
    artists: {
      __typename: 'SearchArtistsConnection';
      edges: Array<{
        __typename: 'SearchArtistEdge';
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
