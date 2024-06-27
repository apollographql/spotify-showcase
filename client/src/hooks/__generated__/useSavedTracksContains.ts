import * as Types from '../../types/globalTypes.codegen';

export type SavedTracksContainsQueryVariables = Types.Exact<{
  ids: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
}>;

export type SavedTracksContainsQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    tracksContains: Array<boolean> | null;
  } | null;
};

export type SavedTracksContainsFragment = {
  __typename: 'CurrentUser';
  tracksContains: Array<boolean> | null;
};
