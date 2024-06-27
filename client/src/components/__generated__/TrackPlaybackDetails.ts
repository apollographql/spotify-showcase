import * as Types from '../../types/globalTypes.codegen';

export type TrackPlaybackDetails_Context = {
  __typename: 'PlaybackContext';
  uri: string;
  type: Types.PlaybackContextType;
};

export type TrackPlaybackDetails_Track = {
  __typename: 'Track';
  id: string;
  name: string;
  uri: string;
  album: { __typename: 'Album'; id: string; name: string };
  artists: Array<{
    __typename: 'Artist';
    id: string;
    uri: string;
    name: string;
  }>;
};
