/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistTitleCell_playlistTrack
// ====================================================

export interface PlaylistTitleCell_playlistTrack_Episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistTitleCell_playlistTrack_Episode_show {
  __typename: "Show";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: string;
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: PlaylistTitleCell_playlistTrack_Episode_show_images[];
}

export interface PlaylistTitleCell_playlistTrack_Episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: string;
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * The show containing the episode.
   */
  show: PlaylistTitleCell_playlistTrack_Episode_show;
}

export interface PlaylistTitleCell_playlistTrack_Track_artists {
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

export interface PlaylistTitleCell_playlistTrack_Track_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistTitleCell_playlistTrack_Track_album {
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
   * The cover art for the album in various sizes, widest first.
   */
  images: PlaylistTitleCell_playlistTrack_Track_album_images[];
}

export interface PlaylistTitleCell_playlistTrack_Track {
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
  artists: PlaylistTitleCell_playlistTrack_Track_artists[];
  /**
   * The album on which the track appears.
   */
  album: PlaylistTitleCell_playlistTrack_Track_album;
}

export type PlaylistTitleCell_playlistTrack = PlaylistTitleCell_playlistTrack_Episode | PlaylistTitleCell_playlistTrack_Track;
