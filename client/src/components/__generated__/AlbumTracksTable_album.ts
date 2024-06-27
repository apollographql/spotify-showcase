/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlbumTracksTable_album
// ====================================================

export interface AlbumTracksTable_album_tracks_edges_node_artists {
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

export interface AlbumTracksTable_album_tracks_edges_node {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber: number | null;
  /**
   * The artists who performed the track.
   */
  artists: AlbumTracksTable_album_tracks_edges_node_artists[];
  /**
   * The name of the track
   */
  name: string;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
}

export interface AlbumTracksTable_album_tracks_edges {
  __typename: "AlbumTrackEdge";
  /**
   * The track on the album
   */
  node: AlbumTracksTable_album_tracks_edges_node;
}

export interface AlbumTracksTable_album_tracks {
  __typename: "AlbumTrackConnection";
  /**
   * The set of tracks.
   */
  edges: AlbumTracksTable_album_tracks_edges[];
}

export interface AlbumTracksTable_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string;
  /**
   * The tracks of the album.
   */
  tracks: AlbumTracksTable_album_tracks | null;
}
