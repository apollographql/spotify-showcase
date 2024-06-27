/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionPodcastsRoutePaginatedQuery
// ====================================================

export interface CollectionPodcastsRoutePaginatedQuery_me_shows_pageInfo {
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

export interface CollectionPodcastsRoutePaginatedQuery_me_shows_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionPodcastsRoutePaginatedQuery_me_shows_edges_node {
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
  images: CollectionPodcastsRoutePaginatedQuery_me_shows_edges_node_images[];
}

export interface CollectionPodcastsRoutePaginatedQuery_me_shows_edges {
  __typename: "SavedShowEdge";
  /**
   * The show
   */
  node: CollectionPodcastsRoutePaginatedQuery_me_shows_edges_node;
}

export interface CollectionPodcastsRoutePaginatedQuery_me_shows {
  __typename: "SavedShowsConnection";
  /**
   * "Pagination information for the set of saved shows"
   */
  pageInfo: CollectionPodcastsRoutePaginatedQuery_me_shows_pageInfo;
  /**
   * A list of saved shows.
   */
  edges: CollectionPodcastsRoutePaginatedQuery_me_shows_edges[];
}

export interface CollectionPodcastsRoutePaginatedQuery_me {
  __typename: "CurrentUser";
  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   */
  shows: CollectionPodcastsRoutePaginatedQuery_me_shows | null;
}

export interface CollectionPodcastsRoutePaginatedQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionPodcastsRoutePaginatedQuery_me | null;
}

export interface CollectionPodcastsRoutePaginatedQueryVariables {
  limit?: number | null;
  offset?: number | null;
}
