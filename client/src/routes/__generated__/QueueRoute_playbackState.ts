/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QueueRoute_playbackState
// ====================================================

export interface QueueRoute_playbackState_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
}

export interface QueueRoute_playbackState_item {
  __typename: "Track" | "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playback item.
   */
  id: string;
}

export interface QueueRoute_playbackState {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * A context object.
   */
  context: QueueRoute_playbackState_context | null;
  /**
   * The currently playing track or episode
   */
  item: QueueRoute_playbackState_item | null;
}
