/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaybackItemProgressBar_playbackState
// ====================================================

export interface PlaybackItemProgressBar_playbackState_item {
  __typename: "Track" | "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playback item.
   */
  id: string;
  /**
   * The duration for the playback item in milliseconds.
   */
  durationMs: number;
}

export interface PlaybackItemProgressBar_playbackState {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * Progress into the currently playing track or episode. Can be `null`
   */
  progressMs: number | null;
  /**
   * Unix Millisecond Timestamp when data was fetched.
   */
  timestamp: any;
  /**
   * The currently playing track or episode
   */
  item: PlaybackItemProgressBar_playbackState_item | null;
}
