/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrackTitleCell_playbackState
// ====================================================

export interface TrackTitleCell_playbackState_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
}

export interface TrackTitleCell_playbackState_item {
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

export interface TrackTitleCell_playbackState {
  __typename: "PlaybackState";
  /**
   * A context object.
   */
  context: TrackTitleCell_playbackState_context | null;
  /**
   * The currently playing track or episode
   */
  item: TrackTitleCell_playbackState_item | null;
}
