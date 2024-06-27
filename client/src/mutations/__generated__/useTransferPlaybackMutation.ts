import * as Types from '../../types/globalTypes.codegen';

export type TransferPlaybackMutationVariables = Types.Exact<{
  input: Types.TransferPlaybackInput;
}>;

export type TransferPlaybackMutation = {
  __typename: 'Mutation';
  transferPlayback: {
    __typename: 'TransferPlaybackPayload';
    playbackState: {
      __typename: 'PlaybackState';
      device: { __typename: 'Device'; id: string | null };
    } | null;
  } | null;
};
