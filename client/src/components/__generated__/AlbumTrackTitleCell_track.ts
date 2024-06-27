/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlbumTrackTitleCell_track
// ====================================================

export interface AlbumTrackTitleCell_track_artists {
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

export interface AlbumTrackTitleCell_track {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The artists who performed the track.
   */
  artists: AlbumTrackTitleCell_track_artists[];
}
