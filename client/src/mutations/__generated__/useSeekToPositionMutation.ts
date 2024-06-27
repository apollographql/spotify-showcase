import * as Types from '../../types/globalTypes.codegen';

export type SeekToPositionMutationVariables = Types.Exact<{
  positionMs: Types.Scalars['Int']['input'];
}>;

export type SeekToPositionMutation = {
  __typename: 'Mutation';
  seekToPosition: {
    __typename: 'SeekToPositionResponse';
    playbackState: {
      __typename: 'PlaybackState';
      progressMs: number | null;
    } | null;
  } | null;
};
