import * as Types from '../../types/globalTypes.codegen';

export type LikedSongsTile_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
};

export type LikedSongsTile_Connection = {
  __typename: 'SavedTracksConnection';
  pageInfo: { __typename: 'PageInfo'; total: number };
  edges: Array<{
    __typename: 'SavedTrackEdge';
    node: {
      __typename: 'Track';
      id: string;
      name: string;
      artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
    };
  }>;
};
