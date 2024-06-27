/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: YourEpisodesTile_connection
// ====================================================

export interface YourEpisodesTile_connection_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface YourEpisodesTile_connection_edges_node_show {
  __typename: "Show";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: string;
  /**
   * The name of the episode.
   */
  name: string;
}

export interface YourEpisodesTile_connection_edges_node {
  __typename: "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The show containing the episode.
   */
  show: YourEpisodesTile_connection_edges_node_show;
}

export interface YourEpisodesTile_connection_edges {
  __typename: "SavedEpisodeEdge";
  /**
   * The saved episode.
   */
  node: YourEpisodesTile_connection_edges_node;
}

export interface YourEpisodesTile_connection {
  __typename: "SavedEpisodesConnection";
  /**
   * Pagination information for the set of episodes
   */
  pageInfo: YourEpisodesTile_connection_pageInfo;
  /**
   * The list of saved episodes.
   */
  edges: YourEpisodesTile_connection_edges[];
}
