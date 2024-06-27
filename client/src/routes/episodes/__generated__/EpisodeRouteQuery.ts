/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReleaseDatePrecision } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: EpisodeRouteQuery
// ====================================================

export interface EpisodeRouteQuery_episode_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
  /**
   * The precision with which the `date` value is known.
   */
  precision: ReleaseDatePrecision;
}

export interface EpisodeRouteQuery_episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  vibrantColor: string | null;
}

export interface EpisodeRouteQuery_episode_show {
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
   * The cover art for the show in various sizes, widest first.
   */
  images: EpisodeRouteQuery_episode_show_images[];
}

export interface EpisodeRouteQuery_episode_resumePoint {
  __typename: "ResumePoint";
  /**
   * Whether or not the episode has been fully played by the user.
   */
  fullyPlayed: boolean;
  /**
   * The user's most recent position in the episode in milliseconds.
   */
  resumePositionMs: number;
}

export interface EpisodeRouteQuery_episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The date the episode was first released
   */
  releaseDate: EpisodeRouteQuery_episode_releaseDate;
  /**
   * The show containing the episode.
   */
  show: EpisodeRouteQuery_episode_show;
  /**
   * The episode length in milliseconds.
   */
  durationMs: number;
  /**
   * The user's most recent position in the episode.
   */
  resumePoint: EpisodeRouteQuery_episode_resumePoint;
}

export interface EpisodeRouteQuery {
  /**
   * Get Spotify catalog information for a single episode identified by its unique
   * Spotify ID.
   */
  episode: EpisodeRouteQuery_episode | null;
}

export interface EpisodeRouteQueryVariables {
  episodeId: string;
}
