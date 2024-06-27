import * as Types from '../../../types/globalTypes.codegen';

export type AlbumRouteQueryVariables = Types.Exact<{
  albumId: Types.Scalars['ID']['input'];
}>;

export type AlbumRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    albumsContains: Array<boolean> | null;
  } | null;
  album: {
    __typename: 'Album';
    id: string;
    albumType: Types.AlbumType;
    name: string;
    totalTracks: number;
    uri: string;
    artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
    copyrights: Array<{
      __typename: 'Copyright';
      text: string;
      type: Types.CopyrightType | null;
    }>;
    images: Array<{
      __typename: 'Image';
      url: string;
      vibrantColor: string | null;
    }>;
    releaseDate: {
      __typename: 'ReleaseDate';
      date: string;
      precision: Types.ReleaseDatePrecision;
    };
    tracks: {
      __typename: 'AlbumTrackConnection';
      edges: Array<{
        __typename: 'AlbumTrackEdge';
        node: {
          __typename: 'Track';
          id: string;
          uri: string;
          durationMs: number;
          trackNumber: number | null;
          name: string;
          explicit: boolean;
          artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
        };
      }>;
    } | null;
  } | null;
};

export type AlbumRoutePlaybackStateFragment = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
};
