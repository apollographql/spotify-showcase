/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexRouteQuery
// ====================================================

export interface IndexRouteQuery_featuredPlaylists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface IndexRouteQuery_featuredPlaylists_edges_node {
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
  images: IndexRouteQuery_featuredPlaylists_edges_node_images[] | null;
}

export interface IndexRouteQuery_featuredPlaylists_edges {
  __typename: "FeaturedPlaylistEdge";
  node: IndexRouteQuery_featuredPlaylists_edges_node;
}

export interface IndexRouteQuery_featuredPlaylists {
  __typename: "FeaturedPlaylistConnection";
  message: string;
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify player's
   * 'Browse' tab).
   */
  edges: IndexRouteQuery_featuredPlaylists_edges[];
}

export interface IndexRouteQuery {
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify
   * player's 'Browse' tab).
   */
  featuredPlaylists: IndexRouteQuery_featuredPlaylists | null;
}

export interface IndexRouteQueryVariables {
  timestamp?: any | null;
}
