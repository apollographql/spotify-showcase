import * as Types from '../../types/globalTypes.codegen';

export type IndexRouteQueryVariables = Types.Exact<{
  timestamp?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;

export type IndexRouteQuery = {
  __typename: 'Query';
  featuredPlaylists: {
    __typename: 'FeaturedPlaylistConnection';
    message: string;
    edges: Array<{
      __typename: 'FeaturedPlaylistEdge';
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
};
