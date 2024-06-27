import * as Types from '../../types/globalTypes.codegen';

export type ResumePlaybackMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ResumePlaybackInput>;
}>;

export type ResumePlaybackMutation = {
  __typename: 'Mutation';
  resumePlayback: {
    __typename: 'ResumePlaybackPayload';
    playbackState: {
      __typename: 'PlaybackState';
      isPlaying: boolean;
      context: {
        __typename: 'PlaybackContext';
        uri: string;
        type: Types.PlaybackContextType;
      } | null;
    } | null;
  } | null;
};

export type UseResumePlaybackStateFragment = {
  __typename: 'PlaybackState';
  context: {
    __typename: 'PlaybackContext';
    uri: string;
    type: Types.PlaybackContextType;
  } | null;
};
