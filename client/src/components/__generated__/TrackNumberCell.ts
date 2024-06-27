import * as Types from '../../types/globalTypes.codegen';

export type TrackNumberCell_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
  item:
    | { __typename: 'Episode'; id: string; uri: string }
    | { __typename: 'Track'; id: string; uri: string }
    | null;
};

export type TrackNumberCell_Track = {
  __typename: 'Track';
  id: string;
  uri: string;
  trackNumber: number | null;
};
