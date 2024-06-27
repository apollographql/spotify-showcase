/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AddToPlaylistQuery
// ====================================================

export interface AddToPlaylistQuery_me_playlists_pageInfo {
  __typename: "PageInfo";
  /**
   * Whether there is a next page of items.
   */
  hasNextPage: boolean;
  /**
   * The maximum number of items in the response (as set in the query or default)
   */
  limit: number;
  /**
   * The offset of the items returned (as set in the query or default)
   */
  offset: number;
}

export interface AddToPlaylistQuery_me_playlists_edges_node {
  __typename: "Playlist";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: string;
  /**
   * The name of the playlist.
   */
  name: string;
}

export interface AddToPlaylistQuery_me_playlists_edges {
  __typename: "PlaylistEdge";
  /**
   * The playlist
   */
  node: AddToPlaylistQuery_me_playlists_edges_node;
}

export interface AddToPlaylistQuery_me_playlists {
  __typename: "PlaylistConnection";
  /**
   * Pagination information for the set of playlists
   */
  pageInfo: AddToPlaylistQuery_me_playlists_pageInfo;
  /**
   * The set of playlists.
   */
  edges: AddToPlaylistQuery_me_playlists_edges[];
}

export interface AddToPlaylistQuery_me {
  __typename: "CurrentUser";
  /**
   * Playlists owned or followed by the current Spotify user.
   */
  playlists: AddToPlaylistQuery_me_playlists | null;
}

export interface AddToPlaylistQuery {
  /**
   * Information about the current logged-in user.
   */
  me: AddToPlaylistQuery_me | null;
}

export interface AddToPlaylistQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
