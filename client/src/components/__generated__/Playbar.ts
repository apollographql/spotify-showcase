import * as Types from '../../types/globalTypes.codegen';

export type PlaybarQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PlaybarQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    player: {
      __typename: 'Player';
      devices: Array<{
        __typename: 'Device';
        id: string | null;
        name: string;
        type: string;
      }> | null;
    };
  } | null;
};

export type Playbar_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  repeatState: Types.RepeatMode;
  shuffleState: boolean;
  progressMs: number | null;
  timestamp: any;
  actions: { __typename: 'Actions'; disallows: Array<Types.Action> };
  context: {
    __typename: 'PlaybackContext';
    uri: string;
    type: Types.PlaybackContextType;
  } | null;
  device: {
    __typename: 'Device';
    id: string | null;
    name: string;
    type: string;
    volumePercent: number;
  };
  item:
    | {
        __typename: 'Episode';
        id: string;
        durationMs: number;
        name: string;
        show: {
          __typename: 'Show';
          id: string;
          name: string;
          images: Array<{ __typename: 'Image'; url: string }>;
        };
      }
    | {
        __typename: 'Track';
        id: string;
        durationMs: number;
        name: string;
        uri: string;
        album: {
          __typename: 'Album';
          id: string;
          name: string;
          images: Array<{ __typename: 'Image'; url: string }>;
        };
        artists: Array<{
          __typename: 'Artist';
          id: string;
          uri: string;
          name: string;
        }>;
      }
    | null;
};
