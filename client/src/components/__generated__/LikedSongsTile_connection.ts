/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LikedSongsTile_connection
// ====================================================

export interface LikedSongsTile_connection_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface LikedSongsTile_connection_edges_node_artists {
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
}

export interface LikedSongsTile_connection_edges_node {
  __typename: "Track";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The artists who performed the track.
   */
  artists: LikedSongsTile_connection_edges_node_artists[];
}

export interface LikedSongsTile_connection_edges {
  __typename: "SavedTrackEdge";
  /**
   * The track
   */
  node: LikedSongsTile_connection_edges_node;
}

export interface LikedSongsTile_connection {
  __typename: "SavedTracksConnection";
  /**
   * "Pagination information for the set of playlists"
   */
  pageInfo: LikedSongsTile_connection_pageInfo;
  /**
   * A list of saved tracks.
   */
  edges: LikedSongsTile_connection_edges[];
}
