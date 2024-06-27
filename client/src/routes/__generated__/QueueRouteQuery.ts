/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueueRouteQuery
// ====================================================

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track_album {
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
  images: QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track_album_images[];
}

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track_artists {
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

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * The album on which the track appears.
   */
  album: QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track_album;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber: number | null;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The artists who performed the track.
   */
  artists: QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track_artists[];
}

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Episode_show {
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
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Episode_show_images[];
}

export interface QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The episode length in milliseconds.
   */
  durationMs: number;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: string;
  /**
   * The show containing the episode.
   */
  show: QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Episode_show;
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * The name of the episode.
   */
  name: string;
}

export type QueueRouteQuery_me_player_playbackQueue_currentlyPlaying = QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Track | QueueRouteQuery_me_player_playbackQueue_currentlyPlaying_Episode;

export interface QueueRouteQuery_me_player_playbackQueue_queue_Track_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface QueueRouteQuery_me_player_playbackQueue_queue_Track_album {
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
  images: QueueRouteQuery_me_player_playbackQueue_queue_Track_album_images[];
}

export interface QueueRouteQuery_me_player_playbackQueue_queue_Track_artists {
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

export interface QueueRouteQuery_me_player_playbackQueue_queue_Track {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * The album on which the track appears.
   */
  album: QueueRouteQuery_me_player_playbackQueue_queue_Track_album;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber: number | null;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The artists who performed the track.
   */
  artists: QueueRouteQuery_me_player_playbackQueue_queue_Track_artists[];
}

export interface QueueRouteQuery_me_player_playbackQueue_queue_Episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface QueueRouteQuery_me_player_playbackQueue_queue_Episode_show {
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
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: QueueRouteQuery_me_player_playbackQueue_queue_Episode_show_images[];
}

export interface QueueRouteQuery_me_player_playbackQueue_queue_Episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The episode length in milliseconds.
   */
  durationMs: number;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: string;
  /**
   * The show containing the episode.
   */
  show: QueueRouteQuery_me_player_playbackQueue_queue_Episode_show;
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * The name of the episode.
   */
  name: string;
}

export type QueueRouteQuery_me_player_playbackQueue_queue = QueueRouteQuery_me_player_playbackQueue_queue_Track | QueueRouteQuery_me_player_playbackQueue_queue_Episode;

export interface QueueRouteQuery_me_player_playbackQueue {
  __typename: "PlaybackQueue";
  currentlyPlaying: QueueRouteQuery_me_player_playbackQueue_currentlyPlaying | null;
  queue: QueueRouteQuery_me_player_playbackQueue_queue[];
}

export interface QueueRouteQuery_me_player {
  __typename: "Player";
  /**
   * Get the list of objects that make up the user's queue.
   */
  playbackQueue: QueueRouteQuery_me_player_playbackQueue | null;
}

export interface QueueRouteQuery_me {
  __typename: "CurrentUser";
  /**
   * Information about the user's current playback state
   */
  player: QueueRouteQuery_me_player;
}

export interface QueueRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: QueueRouteQuery_me | null;
}
