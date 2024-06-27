/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistSidebarLink_playlist
// ====================================================

export interface PlaylistSidebarLink_playlist_owner {
  __typename: "User";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user.
   */
  id: string;
  /**
   * The name displayed on the user's profile. `null` if not available.
   */
  displayName: string | null;
}

export interface PlaylistSidebarLink_playlist {
  __typename: "Playlist";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  uri: string;
  /**
   * The name of the playlist.
   */
  name: string;
  /**
   * The user who owns the playlist.
   */
  owner: PlaylistSidebarLink_playlist_owner;
}
