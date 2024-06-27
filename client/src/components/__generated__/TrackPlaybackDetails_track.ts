/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackPlaybackDetails_track
// ====================================================

export interface TrackPlaybackDetails_track_album {
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
}

export interface TrackPlaybackDetails_track_artists {
  __typename: "Artist";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string;
  /**
   * The name of the artist.
   */
  name: string;
}

export interface TrackPlaybackDetails_track {
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
   * The album on which the track appears.
   */
  album: TrackPlaybackDetails_track_album;
  /**
   * The artists who performed the track.
   */
  artists: TrackPlaybackDetails_track_artists[];
}
