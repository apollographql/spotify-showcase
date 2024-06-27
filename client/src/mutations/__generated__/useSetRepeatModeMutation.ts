import * as Types from '../../types/globalTypes.codegen';

export type SetRepeatModeMutationVariables = Types.Exact<{
  state: Types.RepeatMode;
}>;

export type SetRepeatModeMutation = {
  __typename: 'Mutation';
  setRepeatMode: {
    __typename: 'SetRepeatModeResponse';
    playbackState: {
      __typename: 'PlaybackState';
      repeatState: Types.RepeatMode;
    } | null;
  } | null;
};
