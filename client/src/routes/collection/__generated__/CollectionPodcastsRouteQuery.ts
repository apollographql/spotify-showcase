/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionPodcastsRouteQuery
// ====================================================

export interface CollectionPodcastsRouteQuery_me_episodes_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface CollectionPodcastsRouteQuery_me_episodes_edges_node_show {
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
}

export interface CollectionPodcastsRouteQuery_me_episodes_edges_node {
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
   * The show containing the episode.
   */
  show: CollectionPodcastsRouteQuery_me_episodes_edges_node_show;
}

export interface CollectionPodcastsRouteQuery_me_episodes_edges {
  __typename: "SavedEpisodeEdge";
  /**
   * The saved episode.
   */
  node: CollectionPodcastsRouteQuery_me_episodes_edges_node;
}

export interface CollectionPodcastsRouteQuery_me_episodes {
  __typename: "SavedEpisodesConnection";
  /**
   * Pagination information for the set of episodes
   */
  pageInfo: CollectionPodcastsRouteQuery_me_episodes_pageInfo;
  /**
   * The list of saved episodes.
   */
  edges: CollectionPodcastsRouteQuery_me_episodes_edges[];
}

export interface CollectionPodcastsRouteQuery_me_shows_pageInfo {
  __typename: "PageInfo";
  /**
   * The offset of the items returned (as set in the query or default)
   */
  offset: number;
  /**
   * The maximum number of items in the response (as set in the query or default)
   */
  limit: number;
  /**
   * Whether there is a next page of items.
   */
  hasNextPage: boolean;
}

export interface CollectionPodcastsRouteQuery_me_shows_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionPodcastsRouteQuery_me_shows_edges_node {
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
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: CollectionPodcastsRouteQuery_me_shows_edges_node_images[];
}

export interface CollectionPodcastsRouteQuery_me_shows_edges {
  __typename: "SavedShowEdge";
  /**
   * The show
   */
  node: CollectionPodcastsRouteQuery_me_shows_edges_node;
}

export interface CollectionPodcastsRouteQuery_me_shows {
  __typename: "SavedShowsConnection";
  /**
   * "Pagination information for the set of saved shows"
   */
  pageInfo: CollectionPodcastsRouteQuery_me_shows_pageInfo;
  /**
   * A list of saved shows.
   */
  edges: CollectionPodcastsRouteQuery_me_shows_edges[];
}

export interface CollectionPodcastsRouteQuery_me {
  __typename: "CurrentUser";
  episodes: CollectionPodcastsRouteQuery_me_episodes | null;
  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   */
  shows: CollectionPodcastsRouteQuery_me_shows | null;
}

export interface CollectionPodcastsRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionPodcastsRouteQuery_me | null;
}

export interface CollectionPodcastsRouteQueryVariables {
  limit?: number | null;
  offset?: number | null;
}
