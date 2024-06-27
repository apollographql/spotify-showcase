/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionTracksRoutePlaylistStateFragment
// ====================================================

export interface CollectionTracksRoutePlaylistStateFragment_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
}

export interface CollectionTracksRoutePlaylistStateFragment {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * A context object.
   */
  context: CollectionTracksRoutePlaylistStateFragment_context | null;
}
