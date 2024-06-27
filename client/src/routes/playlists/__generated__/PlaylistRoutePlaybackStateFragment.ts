/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlaylistRoutePlaybackStateFragment
// ====================================================

export interface PlaylistRoutePlaybackStateFragment_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
}

export interface PlaylistRoutePlaybackStateFragment {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * A context object.
   */
  context: PlaylistRoutePlaybackStateFragment_context | null;
}
