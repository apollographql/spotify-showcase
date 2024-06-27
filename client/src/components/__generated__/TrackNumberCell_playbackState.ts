/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackNumberCell_playbackState
// ====================================================

export interface TrackNumberCell_playbackState_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
}

export interface TrackNumberCell_playbackState_item {
  __typename: "Track" | "Episode";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playback item.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: string;
}

export interface TrackNumberCell_playbackState {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * A context object.
   */
  context: TrackNumberCell_playbackState_context | null;
  /**
   * The currently playing track or episode
   */
  item: TrackNumberCell_playbackState_item | null;
}
