/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AlbumType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ArtistRouteQuery_albums
// ====================================================

export interface ArtistRouteQuery_albums_edges_node_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
}

export interface ArtistRouteQuery_albums_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_albums_edges_node {
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
  releaseDate: ArtistRouteQuery_albums_edges_node_releaseDate;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistRouteQuery_albums_edges_node_images[];
}

export interface ArtistRouteQuery_albums_edges {
  __typename: "ArtistAlbumEdge";
  /**
   * Spotify catalog information for the album.
   */
  node: ArtistRouteQuery_albums_edges_node;
}

export interface ArtistRouteQuery_albums {
  __typename: "ArtistAlbumsConnection";
  /**
   * A list of albums that belong to the artist.
   */
  edges: ArtistRouteQuery_albums_edges[] | null;
}
