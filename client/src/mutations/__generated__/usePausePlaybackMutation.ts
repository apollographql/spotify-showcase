import * as Types from '../../types/globalTypes.codegen';

export type PausePlaybackMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type PausePlaybackMutation = {
  __typename: 'Mutation';
  pausePlayback: {
    __typename: 'PausePlaybackResponse';
    playbackState: { __typename: 'PlaybackState'; isPlaying: boolean } | null;
  } | null;
};
