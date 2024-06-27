/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserQuery
// ====================================================

export interface CurrentUserQuery_me_profile_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CurrentUserQuery_me_profile {
  __typename: "CurrentUserProfile";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  id: string;
  /**
   * The name displayed on the user's profile. `null` if not available.
   */
  displayName: string | null;
  /**
   * The user's profile image.
   */
  images: CurrentUserQuery_me_profile_images[] | null;
}

export interface CurrentUserQuery_me {
  __typename: "CurrentUser";
  /**
   * Get detailed profile information about the current user (including the current user's username).
   */
  profile: CurrentUserQuery_me_profile;
}

export interface CurrentUserQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CurrentUserQuery_me | null;
}
