/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReleaseDatePrecision } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShowRouteQuery
// ====================================================

export interface ShowRouteQuery_show_episodes_edges_node_releaseDate {
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

export interface ShowRouteQuery_show_episodes_edges_node_resumePoint {
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

export interface ShowRouteQuery_show_episodes_edges_node {
  __typename: "Episode";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The episode length in milliseconds.
   */
  durationMs: number;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: string;
  /**
   * The date the episode was first released
   */
  releaseDate: ShowRouteQuery_show_episodes_edges_node_releaseDate;
  /**
   * The user's most recent position in the episode.
   */
  resumePoint: ShowRouteQuery_show_episodes_edges_node_resumePoint;
}

export interface ShowRouteQuery_show_episodes_edges {
  __typename: "ShowEpisodeEdge";
  /**
   * The episode
   */
  node: ShowRouteQuery_show_episodes_edges_node;
}

export interface ShowRouteQuery_show_episodes {
  __typename: "ShowEpisodesConnection";
  /**
   * A list of episodes for the show.
   */
  edges: ShowRouteQuery_show_episodes_edges[];
}

export interface ShowRouteQuery_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  vibrantColor: string | null;
}

export interface ShowRouteQuery_show {
  __typename: "Show";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: string;
  /**
   * A description of the show.
   */
  description: string;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * Spotify catalog information about an show’s episodes.
   */
  episodes: ShowRouteQuery_show_episodes | null;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: ShowRouteQuery_show_images[];
}

export interface ShowRouteQuery {
  /**
   * Get Spotify catalog information for a single show identified by its unique
   * Spotify ID.
   */
  show: ShowRouteQuery_show | null;
}

export interface ShowRouteQueryVariables {
  showId: string;
}
