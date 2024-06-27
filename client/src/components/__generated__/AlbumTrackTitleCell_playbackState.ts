/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlbumTrackTitleCell_playbackState
// ====================================================

export interface AlbumTrackTitleCell_playbackState_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
}

export interface AlbumTrackTitleCell_playbackState_item {
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

export interface AlbumTrackTitleCell_playbackState {
  __typename: "PlaybackState";
  /**
   * A context object.
   */
  context: AlbumTrackTitleCell_playbackState_context | null;
  /**
   * The currently playing track or episode
   */
  item: AlbumTrackTitleCell_playbackState_item | null;
}
