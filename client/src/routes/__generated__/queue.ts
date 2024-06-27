import * as Types from '../../types/globalTypes.codegen';

export type QueueRouteQueryVariables = Types.Exact<{ [key: string]: never }>;

export type QueueRouteQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    player: {
      __typename: 'Player';
      playbackQueue: {
        __typename: 'PlaybackQueue';
        currentlyPlaying:
          | {
              __typename: 'Episode';
              id: string;
              durationMs: number;
              uri: string;
              explicit: boolean;
              name: string;
              show: {
                __typename: 'Show';
                id: string;
                name: string;
                publisher: string;
                images: Array<{ __typename: 'Image'; url: string }>;
              };
            }
          | {
              __typename: 'Track';
              id: string;
              durationMs: number;
              uri: string;
              trackNumber: number | null;
              explicit: boolean;
              name: string;
              album: {
                __typename: 'Album';
                id: string;
                name: string;
                images: Array<{ __typename: 'Image'; url: string }>;
              };
              artists: Array<{
                __typename: 'Artist';
                id: string;
                name: string;
              }>;
            }
          | null;
        queue: Array<
          | {
              __typename: 'Episode';
              id: string;
              durationMs: number;
              uri: string;
              explicit: boolean;
              name: string;
              show: {
                __typename: 'Show';
                id: string;
                name: string;
                publisher: string;
                images: Array<{ __typename: 'Image'; url: string }>;
              };
            }
          | {
              __typename: 'Track';
              id: string;
              durationMs: number;
              uri: string;
              trackNumber: number | null;
              explicit: boolean;
              name: string;
              album: {
                __typename: 'Album';
                id: string;
                name: string;
                images: Array<{ __typename: 'Image'; url: string }>;
              };
              artists: Array<{
                __typename: 'Artist';
                id: string;
                name: string;
              }>;
            }
        >;
      } | null;
    };
  } | null;
};

export type QueueRoute_PlaybackItem_Episode_ = {
  __typename: 'Episode';
  id: string;
  durationMs: number;
  uri: string;
  explicit: boolean;
  name: string;
  show: {
    __typename: 'Show';
    id: string;
    name: string;
    publisher: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
};

export type QueueRoute_PlaybackItem_Track_ = {
  __typename: 'Track';
  id: string;
  durationMs: number;
  uri: string;
  trackNumber: number | null;
  explicit: boolean;
  name: string;
  album: {
    __typename: 'Album';
    id: string;
    name: string;
    images: Array<{ __typename: 'Image'; url: string }>;
  };
  artists: Array<{ __typename: 'Artist'; id: string; name: string }>;
};

export type QueueRoute_PlaybackItem =
  | QueueRoute_PlaybackItem_Episode_
  | QueueRoute_PlaybackItem_Track_;

export type QueueRoute_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  context: { __typename: 'PlaybackContext'; uri: string } | null;
  item:
    | { __typename: 'Episode'; id: string }
    | { __typename: 'Track'; id: string }
    | null;
};
