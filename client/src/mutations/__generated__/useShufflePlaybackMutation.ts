import * as Types from '../../types/globalTypes.codegen';

export type ShufflePlaybackMutationVariables = Types.Exact<{
  state: Types.Scalars['Boolean']['input'];
}>;

export type ShufflePlaybackMutation = {
  __typename: 'Mutation';
  shufflePlayback: {
    __typename: 'ShufflePlaybackResponse';
    playbackState: {
      __typename: 'PlaybackState';
      shuffleState: boolean;
    } | null;
  } | null;
};
