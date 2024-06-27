/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AlbumType } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: AlbumTile_album
// ====================================================

export interface AlbumTile_album_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
}

export interface AlbumTile_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface AlbumTile_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: string;
  /**
   * The type of the album.
   */
  albumType: AlbumType;
  /**
   * The number of tracks in the album.
   */
  totalTracks: number;
  /**
   * The date the album was first released.
   */
  releaseDate: AlbumTile_album_releaseDate;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: AlbumTile_album_images[];
}
