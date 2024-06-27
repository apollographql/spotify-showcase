/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistSidebarLink_currentUser
// ====================================================

export interface PlaylistSidebarLink_currentUser_profile {
  __typename: "CurrentUserProfile";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  id: string;
}

export interface PlaylistSidebarLink_currentUser {
  __typename: "CurrentUser";
  /**
   * Get detailed profile information about the current user (including the current user's username).
   */
  profile: PlaylistSidebarLink_currentUser_profile;
}
