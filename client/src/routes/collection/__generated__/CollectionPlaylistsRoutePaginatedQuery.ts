/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionPlaylistsRoutePaginatedQuery
// ====================================================

export interface CollectionPlaylistsRoutePaginatedQuery_me_playlists_pageInfo {
  __typename: "PageInfo";
  /**
   * The offset of the items returned (as set in the query or default)
   */
  offset: number;
  /**
   * The maximum number of items in the response (as set in the query or default)
   */
  limit: number;
  /**
   * Whether there is a next page of items.
   */
  hasNextPage: boolean;
}

export interface CollectionPlaylistsRoutePaginatedQuery_me_playlists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionPlaylistsRoutePaginatedQuery_me_playlists_edges_node {
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
  images: CollectionPlaylistsRoutePaginatedQuery_me_playlists_edges_node_images[] | null;
}

export interface CollectionPlaylistsRoutePaginatedQuery_me_playlists_edges {
  __typename: "PlaylistEdge";
  /**
   * The playlist
   */
  node: CollectionPlaylistsRoutePaginatedQuery_me_playlists_edges_node;
}

export interface CollectionPlaylistsRoutePaginatedQuery_me_playlists {
  __typename: "PlaylistConnection";
  /**
   * Pagination information for the set of playlists
   */
  pageInfo: CollectionPlaylistsRoutePaginatedQuery_me_playlists_pageInfo;
  /**
   * The set of playlists.
   */
  edges: CollectionPlaylistsRoutePaginatedQuery_me_playlists_edges[];
}

export interface CollectionPlaylistsRoutePaginatedQuery_me {
  __typename: "CurrentUser";
  /**
   * Playlists owned or followed by the current Spotify user.
   */
  playlists: CollectionPlaylistsRoutePaginatedQuery_me_playlists | null;
}

export interface CollectionPlaylistsRoutePaginatedQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionPlaylistsRoutePaginatedQuery_me | null;
}

export interface CollectionPlaylistsRoutePaginatedQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
