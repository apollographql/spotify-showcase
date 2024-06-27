/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RepeatMode, Action, PlaybackContextType } from "./../../types/globalTypes";

// ====================================================
// GraphQL subscription operation: PlaybackStateSubscriberSubscription
// ====================================================

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_actions {
  __typename: "Actions";
  disallows: Action[];
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_context {
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

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_device {
  __typename: "Device";
  /**
   * The device ID
   */
  id: string | null;
  /**
   * A human-readable name for the device. Some devices have a name that the user
   * can configure (e.g. "Loudest speaker") and some devices have a generic name
   * associated with the manufacturer or device model.
   */
  name: string;
  /**
   * Device type, such as "computer", "smartphone" or "speaker".
   */
  type: string;
  /**
   * The current volume in percent.
   * 
   * >= 0    <= 100
   */
  volumePercent: number;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track_album_images[];
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: string;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track_artists {
  __typename: "Artist";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: string;
  /**
   * The name of the artist.
   */
  name: string;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The album on which the track appears.
   */
  album: PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track_album;
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
   * The artists who performed the track.
   */
  artists: PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track_artists[];
  /**
   * The track length in milliseconds
   */
  durationMs: number;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Episode_show {
  __typename: "Show";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: PlaybackStateSubscriberSubscription_playbackStateChanged_item_Episode_show_images[];
  /**
   * The name of the episode.
   */
  name: string;
}

export interface PlaybackStateSubscriberSubscription_playbackStateChanged_item_Episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The show containing the episode.
   */
  show: PlaybackStateSubscriberSubscription_playbackStateChanged_item_Episode_show;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The episode length in milliseconds.
   */
  durationMs: number;
}

export type PlaybackStateSubscriberSubscription_playbackStateChanged_item = PlaybackStateSubscriberSubscription_playbackStateChanged_item_Track | PlaybackStateSubscriberSubscription_playbackStateChanged_item_Episode;

export interface PlaybackStateSubscriberSubscription_playbackStateChanged {
  __typename: "PlaybackState";
  /**
   * If something is currently playing, return `true`.
   */
  isPlaying: boolean;
  /**
   * off, track, context
   */
  repeatState: RepeatMode;
  /**
   * If shuffle is on or off.
   */
  shuffleState: boolean;
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: PlaybackStateSubscriberSubscription_playbackStateChanged_actions;
  /**
   * A context object.
   */
  context: PlaybackStateSubscriberSubscription_playbackStateChanged_context | null;
  /**
   * The device that is currently active.
   */
  device: PlaybackStateSubscriberSubscription_playbackStateChanged_device;
  /**
   * The currently playing track or episode
   */
  item: PlaybackStateSubscriberSubscription_playbackStateChanged_item | null;
  /**
   * Progress into the currently playing track or episode. Can be `null`
   */
  progressMs: number | null;
  /**
   * Unix Millisecond Timestamp when data was fetched.
   */
  timestamp: any;
}

export interface PlaybackStateSubscriberSubscription {
  playbackStateChanged: PlaybackStateSubscriberSubscription_playbackStateChanged | null;
}
