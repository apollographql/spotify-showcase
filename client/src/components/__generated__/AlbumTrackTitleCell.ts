import * as Types from '../../types/globalTypes.codegen';

export type AlbumTrackTitleCell_PlaybackState = {
  __typename: 'PlaybackState';
  context: { __typename: 'PlaybackContext'; uri: string } | null;
  item:
    | { __typename: 'Episode'; id: string; uri: string }
    | { __typename: 'Track'; id: string; uri: string }
    | null;
};

export type AlbumTrackTitleCell_Album = { __typename: 'Album'; uri: string };

export type AlbumTrackTitleCell_Track = {
  __typename: 'Track';
  id: string;
  name: string;
  uri: string;
  explicit: boolean;
  artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
};
