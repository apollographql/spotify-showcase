import * as Types from '../../../types/globalTypes.codegen';

export type TrackRouteQueryVariables = Types.Exact<{
  trackId: Types.Scalars['ID']['input'];
}>;

export type TrackRouteQuery = {
  __typename: 'Query';
  track: {
    __typename: 'Track';
    id: string;
    durationMs: number;
    name: string;
    album: {
      __typename: 'Album';
      id: string;
      albumType: Types.AlbumType;
      name: string;
      uri: string;
      images: Array<{
        __typename: 'Image';
        url: string;
        vibrantColor: string | null;
      }>;
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
    };
    artists: Array<{
      __typename: 'Artist';
      id: string;
      name: string;
      topTracks: Array<{
        __typename: 'Track';
        id: string;
        durationMs: number;
        explicit: boolean;
        name: string;
        album: {
          __typename: 'Album';
          id: string;
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }>;
      images: Array<{ __typename: 'Image'; url: string }>;
    }>;
  } | null;
};
