/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EpisodeDetailsCell_episode
// ====================================================

export interface EpisodeDetailsCell_episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface EpisodeDetailsCell_episode_show {
  __typename: "Show";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: string;
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: EpisodeDetailsCell_episode_show_images[];
}

export interface EpisodeDetailsCell_episode {
  __typename: "Episode";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
   */
  id: string;
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The show containing the episode.
   */
  show: EpisodeDetailsCell_episode_show;
}
