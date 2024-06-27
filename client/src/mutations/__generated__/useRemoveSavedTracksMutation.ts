import * as Types from '../../types/globalTypes.codegen';

export type RemoveSavedTracksMutationVariables = Types.Exact<{
  input: Types.RemoveSavedTracksInput;
}>;

export type RemoveSavedTracksMutation = {
  __typename: 'Mutation';
  removeSavedTracks: {
    __typename: 'RemoveSavedTracksPayload';
    removedTracks: Array<{ __typename: 'Track'; id: string }> | null;
  } | null;
};

export type RemovedSavedTracksMutationFragment = {
  __typename: 'CurrentUser';
  tracksContains: Array<boolean> | null;
};
