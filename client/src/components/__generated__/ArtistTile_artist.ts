/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArtistTile_artist
// ====================================================

export interface ArtistTile_artist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistTile_artist {
  __typename: "Artist";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: ArtistTile_artist_images[];
}
