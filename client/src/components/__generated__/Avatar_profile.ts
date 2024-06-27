/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Avatar_profile
// ====================================================

export interface Avatar_profile_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface Avatar_profile {
  __typename: "User" | "CurrentUserProfile";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user.
   */
  id: string;
  /**
   * The user's profile image.
   */
  images: Avatar_profile_images[] | null;
}
