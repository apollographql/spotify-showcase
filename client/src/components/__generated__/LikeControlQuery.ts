/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LikeControlQuery
// ====================================================

export interface LikeControlQuery_me {
  __typename: "CurrentUser";
  /**
   * Check if one or more episodes is already saved in the current Spotify user's
   * 'Your Episodes' library.
   */
  episodesContains: boolean[] | null;
  /**
   * Check if one or more tracks is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  tracksContains: boolean[] | null;
}

export interface LikeControlQuery {
  /**
   * Information about the current logged-in user.
   */
  me: LikeControlQuery_me | null;
}

export interface LikeControlQueryVariables {
  ids: string[];
}
