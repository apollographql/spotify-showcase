import * as Types from '../../types/globalTypes.codegen';

export type TrackTitleCell_PlaybackState = {
  __typename: 'PlaybackState';
  context: { __typename: 'PlaybackContext'; uri: string } | null;
  item:
    | { __typename: 'Episode'; id: string; uri: string }
    | { __typename: 'Track'; id: string; uri: string }
    | null;
};

export type TrackTitleCell_Track = {
  __typename: 'Track';
  id: string;
  explicit: boolean;
  name: string;
  uri: string;
  album: {
    __typename: 'Album';
    id: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
  artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
};
