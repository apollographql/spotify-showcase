/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CurrentUserFragment
// ====================================================

export interface CurrentUserFragment {
  __typename: "CurrentUser";
  /**
   * Check if one or more tracks is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  tracksContains: boolean[] | null;
}
