/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EpisodeRemainingDuration_episode
// ====================================================

export interface EpisodeRemainingDuration_episode_resumePoint {
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

export interface EpisodeRemainingDuration_episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * The episode length in milliseconds.
   */
  durationMs: number;
  /**
   * The user's most recent position in the episode.
   */
  resumePoint: EpisodeRemainingDuration_episode_resumePoint;
}
