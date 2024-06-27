import * as Types from '../../../types/globalTypes.codegen';

export type CollectionTracksRouteQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CollectionTracksRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    profile: {
      __typename: 'CurrentUserProfile';
      id: string;
      displayName: string | null;
    };
    tracks: {
      __typename: 'SavedTracksConnection';
      pageInfo: {
        __typename: 'PageInfo';
        hasNextPage: boolean;
        offset: number;
        limit: number;
        total: number;
      };
      edges: Array<{
        __typename: 'SavedTrackEdge';
        addedAt: any;
        node: {
          __typename: 'Track';
          id: string;
          name: string;
          durationMs: number;
          uri: string;
          trackNumber: number | null;
          explicit: boolean;
          album: {
            __typename: 'Album';
            id: string;
            images: Array<{ __typename: 'Image'; url: string }>;
          };
          artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
        };
      }>;
    } | null;
  } | null;
};

export type CollectionTracksRoutePlaylistStateFragment = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
};

export type CurrentUserFragment = {
  __typename: 'CurrentUser';
  tracksContains: Array<boolean> | null;
};
