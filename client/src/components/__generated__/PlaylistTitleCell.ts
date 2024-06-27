import * as Types from '../../types/globalTypes.codegen';

export type PlaylistTitleCell_PlaybackState = {
  __typename: 'PlaybackState';
  context: { __typename: 'PlaybackContext'; uri: string } | null;
  item:
    | { __typename: 'Episode'; id: string; uri: string }
    | { __typename: 'Track'; id: string; uri: string }
    | null;
};

export type PlaylistTitleCell_Playlist = {
  __typename: 'Playlist';
  id: string;
  uri: string;
};

export type PlaylistTitleCell_PlaylistTrack_Episode_ = {
  __typename: 'Episode';
  explicit: boolean;
  id: string;
  name: string;
  uri: string;
  show: {
    __typename: 'Show';
    id: string;
    publisher: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
};

export type PlaylistTitleCell_PlaylistTrack_Track_ = {
  __typename: 'Track';
  explicit: boolean;
  id: string;
  name: string;
  uri: string;
  artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
  album: {
    __typename: 'Album';
    id: string;
    name: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
};

export type PlaylistTitleCell_PlaylistTrack =
  | PlaylistTitleCell_PlaylistTrack_Episode_
  | PlaylistTitleCell_PlaylistTrack_Track_;
