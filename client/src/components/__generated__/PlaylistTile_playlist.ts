/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistTile_playlist
// ====================================================

export interface PlaylistTile_playlist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistTile_playlist {
  __typename: "Playlist";
  /**
   * The [Spotify ID](https:             // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: string;
  /**
   * The name of the playlist.
   */
  name: string;
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  description: string | null;
  /**
   * The [Spotify URI](https:            // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  uri: string;
  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order.
   * See [Working with Playlists](https: // developer.spotify.com/documentation/general/guides/working-with-playlists/).
   * **Note**: If returned, the source URL for the image (`url`) is temporary and
   * will expire in less than a day.
   */
  images: PlaylistTile_playlist_images[] | null;
}
