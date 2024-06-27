/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlaybackContextType } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: TrackPlaybackDetails_context
// ====================================================

export interface TrackPlaybackDetails_context {
  __typename: "PlaybackContext";
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: string;
  /**
   * The object type, e.g. "artist", "playlist", "album", "show".
   */
  type: PlaybackContextType;
}
