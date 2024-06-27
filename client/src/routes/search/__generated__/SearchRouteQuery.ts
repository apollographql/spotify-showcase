/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: SearchRouteQuery
// ====================================================

export interface SearchRouteQuery_search_artists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface SearchRouteQuery_search_artists_edges_node {
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
  images: SearchRouteQuery_search_artists_edges_node_images[];
}

export interface SearchRouteQuery_search_artists_edges {
  __typename: "SearchArtistEdge";
  /**
   * The artist returned from the search
   */
  node: SearchRouteQuery_search_artists_edges_node;
}

export interface SearchRouteQuery_search_artists {
  __typename: "SearchArtistsConnection";
  /**
   * The list of artists returned from the search
   */
  edges: SearchRouteQuery_search_artists_edges[];
}

export interface SearchRouteQuery_search {
  __typename: "SearchResults";
  /**
   * The set of artists returned from the search query. Only available if the search `type` includes `ARTIST`.
   */
  artists: SearchRouteQuery_search_artists | null;
}

export interface SearchRouteQuery {
  /**
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string.
   * 
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  search: SearchRouteQuery_search | null;
}

export interface SearchRouteQueryVariables {
  q: string;
  type: SearchType[];
}
