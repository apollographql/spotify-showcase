import * as Types from '../../types/globalTypes.codegen';

export type AlbumTracksTable_Album = {
  __typename: 'Album';
  id: string;
  uri: string;
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
