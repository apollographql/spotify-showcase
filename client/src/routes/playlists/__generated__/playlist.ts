import * as Types from '../../../types/globalTypes.codegen';

export type PlaylistQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type PlaylistQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    profile: { __typename: 'CurrentUserProfile'; id: string };
  } | null;
  playlist: {
    __typename: 'Playlist';
    id: string;
    name: string;
    uri: string;
    images: Array<{
      __typename: 'Image';
      url: string;
      vibrantColor: string | null;
    }> | null;
    owner: { __typename: 'User'; id: string; displayName: string | null };
    tracks: {
      __typename: 'PlaylistTrackConnection';
      edges: Array<{
        __typename: 'PlaylistTrackEdge';
        addedAt: any | null;
        node:
          | {
              __typename: 'Episode';
              id: string;
              name: string;
              durationMs: number;
              uri: string;
              explicit: boolean;
              releaseDate: {
                __typename: 'ReleaseDate';
                date: string;
                precision: Types.ReleaseDatePrecision;
              };
              show: {
                __typename: 'Show';
                id: string;
                name: string;
                publisher: string;
                images: Array<{ __typename: 'Image'; url: string }>;
              };
            }
          | {
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
                name: string;
                images: Array<{ __typename: 'Image'; url: string }>;
              };
              artists: Array<{
                __typename: 'Artist';
                id: string;
                name: string;
              }>;
            };
      }>;
      pageInfo: {
        __typename: 'PageInfo';
        hasNextPage: boolean;
        offset: number;
        limit: number;
        total: number;
      };
    };
  } | null;
};

export type PlaylistRoutePlaybackStateFragment = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
};
