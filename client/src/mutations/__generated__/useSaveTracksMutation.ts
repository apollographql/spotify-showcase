import * as Types from '../../types/globalTypes.codegen';

export type SaveTracksMutationVariables = Types.Exact<{
  input: Types.SaveTracksInput;
}>;

export type SaveTracksMutation = {
  __typename: 'Mutation';
  saveTracks: {
    __typename: 'SaveTracksPayload';
    savedTracks: Array<{ __typename: 'Track'; id: string }> | null;
  } | null;
};

export type SaveTracksMutationFragment = {
  __typename: 'CurrentUser';
  tracksContains: Array<boolean> | null;
};
