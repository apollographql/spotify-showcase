import * as Types from '../../types/globalTypes.codegen';

export type AddToQueueMutationVariables = Types.Exact<{
  input: Types.AddItemToPlaybackQueueInput;
}>;

export type AddToQueueMutation = {
  __typename: 'Mutation';
  addItemToPlaybackQueue: {
    __typename: 'AddItemToPlaybackQueuePayload';
    playbackQueue: {
      __typename: 'PlaybackQueue';
      currentlyPlaying:
        | { __typename: 'Episode'; id: string }
        | { __typename: 'Track'; id: string }
        | null;
    } | null;
  } | null;
};
