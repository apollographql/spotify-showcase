/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarQuery
// ====================================================

export interface SidebarQuery_me_user {
  __typename: "User";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user.
   */
  id: string;
}

export interface SidebarQuery_me_playlists_pageInfo {
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

export interface SidebarQuery_me_playlists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface SidebarQuery_me_playlists_edges_node_owner {
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

export interface SidebarQuery_me_playlists_edges_node {
  __typename: "Playlist";
  /**
   * The [Spotify ID](https:             // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: string;
  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order.
   * See [Working with Playlists](https: // developer.spotify.com/documentation/general/guides/working-with-playlists/).
   * **Note**: If returned, the source URL for the image (`url`) is temporary and
   * will expire in less than a day.
   */
  images: SidebarQuery_me_playlists_edges_node_images[] | null;
  /**
   * The [Spotify URI](https:            // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
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
  owner: SidebarQuery_me_playlists_edges_node_owner;
}

export interface SidebarQuery_me_playlists_edges {
  __typename: "PlaylistEdge";
  /**
   * The playlist
   */
  node: SidebarQuery_me_playlists_edges_node;
}

export interface SidebarQuery_me_playlists {
  __typename: "PlaylistConnection";
  /**
   * Pagination information for the set of playlists
   */
  pageInfo: SidebarQuery_me_playlists_pageInfo;
  /**
   * The set of playlists.
   */
  edges: SidebarQuery_me_playlists_edges[];
}

export interface SidebarQuery_me {
  __typename: "CurrentUser";
  /**
   * Detailed profile information about the current user.
   */
  user: SidebarQuery_me_user;
  /**
   * Playlists owned or followed by the current Spotify user.
   */
  playlists: SidebarQuery_me_playlists | null;
}

export interface SidebarQuery {
  /**
   * Information about the current logged-in user.
   */
  me: SidebarQuery_me | null;
}

export interface SidebarQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
