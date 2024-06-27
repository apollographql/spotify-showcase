/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionArtistsRouteQuery
// ====================================================

export interface CollectionArtistsRouteQuery_me_followedArtists_pageInfo_cursors {
  __typename: "Cursors";
  /**
   * The cursor to use as key to find the next page of items.
   */
  after: string | null;
}

export interface CollectionArtistsRouteQuery_me_followedArtists_pageInfo {
  __typename: "PageInfoCursorBased";
  /**
   * The cursors used to find the next set of items.
   */
  cursors: CollectionArtistsRouteQuery_me_followedArtists_pageInfo_cursors | null;
}

export interface CollectionArtistsRouteQuery_me_followedArtists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionArtistsRouteQuery_me_followedArtists_edges_node {
  __typename: "Artist";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: CollectionArtistsRouteQuery_me_followedArtists_edges_node_images[];
}

export interface CollectionArtistsRouteQuery_me_followedArtists_edges {
  __typename: "FollowedArtistEdge";
  /**
   * The followed artist
   */
  node: CollectionArtistsRouteQuery_me_followedArtists_edges_node;
}

export interface CollectionArtistsRouteQuery_me_followedArtists {
  __typename: "FollowedArtistsConnection";
  /**
   * Pagination information for the set of followed artists.
   */
  pageInfo: CollectionArtistsRouteQuery_me_followedArtists_pageInfo;
  /**
   * The list of followed artists.
   */
  edges: CollectionArtistsRouteQuery_me_followedArtists_edges[];
}

export interface CollectionArtistsRouteQuery_me {
  __typename: "CurrentUser";
  /**
   * Get the current user's followed artists.
   */
  followedArtists: CollectionArtistsRouteQuery_me_followedArtists | null;
}

export interface CollectionArtistsRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionArtistsRouteQuery_me | null;
}

export interface CollectionArtistsRouteQueryVariables {
  after?: string | null;
}
