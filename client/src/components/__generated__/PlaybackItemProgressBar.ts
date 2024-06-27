import * as Types from '../../types/globalTypes.codegen';

export type PlaybackItemProgressBar_PlaybackState = {
  __typename: 'PlaybackState';
  isPlaying: boolean;
  progressMs: number | null;
  timestamp: any;
  item:
    | { __typename: 'Episode'; id: string; durationMs: number }
    | { __typename: 'Track'; id: string; durationMs: number }
    | null;
};
