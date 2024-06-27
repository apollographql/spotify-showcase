/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AlbumType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CollectionAlbumsRouteQuery
// ====================================================

export interface CollectionAlbumsRouteQuery_me_albums_pageInfo {
  __typename: "PageInfo";
  /**
   * The maximum number of items in the response (as set in the query or default)
   */
  limit: number;
  /**
   * The offset of the items returned (as set in the query or default)
   */
  offset: number;
  /**
   * Whether there is a next page of items.
   */
  hasNextPage: boolean;
}

export interface CollectionAlbumsRouteQuery_me_albums_edges_node_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
}

export interface CollectionAlbumsRouteQuery_me_albums_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionAlbumsRouteQuery_me_albums_edges_node {
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
  releaseDate: CollectionAlbumsRouteQuery_me_albums_edges_node_releaseDate;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: CollectionAlbumsRouteQuery_me_albums_edges_node_images[];
}

export interface CollectionAlbumsRouteQuery_me_albums_edges {
  __typename: "SavedAlbumEdge";
  /**
   * The album object.
   */
  node: CollectionAlbumsRouteQuery_me_albums_edges_node;
}

export interface CollectionAlbumsRouteQuery_me_albums {
  __typename: "SavedAlbumsConnection";
  /**
   * Pagination information for the set of playlists
   */
  pageInfo: CollectionAlbumsRouteQuery_me_albums_pageInfo;
  /**
   * The list of saved albums.
   */
  edges: CollectionAlbumsRouteQuery_me_albums_edges[];
}

export interface CollectionAlbumsRouteQuery_me {
  __typename: "CurrentUser";
  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music'
   * library.
   */
  albums: CollectionAlbumsRouteQuery_me_albums | null;
}

export interface CollectionAlbumsRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionAlbumsRouteQuery_me | null;
}

export interface CollectionAlbumsRouteQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
