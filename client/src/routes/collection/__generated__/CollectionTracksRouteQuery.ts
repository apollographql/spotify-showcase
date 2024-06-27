/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionTracksRouteQuery
// ====================================================

export interface CollectionTracksRouteQuery_me_profile {
  __typename: "CurrentUserProfile";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  id: string;
  /**
   * The name displayed on the user's profile. `null` if not available.
   */
  displayName: string | null;
}

export interface CollectionTracksRouteQuery_me_tracks_pageInfo {
  __typename: "PageInfo";
  /**
   * Whether there is a next page of items.
   */
  hasNextPage: boolean;
  /**
   * The offset of the items returned (as set in the query or default)
   */
  offset: number;
  /**
   * The maximum number of items in the response (as set in the query or default)
   */
  limit: number;
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface CollectionTracksRouteQuery_me_tracks_edges_node_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionTracksRouteQuery_me_tracks_edges_node_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: CollectionTracksRouteQuery_me_tracks_edges_node_album_images[];
}

export interface CollectionTracksRouteQuery_me_tracks_edges_node_artists {
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
}

export interface CollectionTracksRouteQuery_me_tracks_edges_node {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * The album on which the track appears.
   */
  album: CollectionTracksRouteQuery_me_tracks_edges_node_album;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber: number | null;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The artists who performed the track.
   */
  artists: CollectionTracksRouteQuery_me_tracks_edges_node_artists[];
}

export interface CollectionTracksRouteQuery_me_tracks_edges {
  __typename: "SavedTrackEdge";
  /**
   * The date the track was saved.
   */
  addedAt: any;
  /**
   * The track
   */
  node: CollectionTracksRouteQuery_me_tracks_edges_node;
}

export interface CollectionTracksRouteQuery_me_tracks {
  __typename: "SavedTracksConnection";
  /**
   * "Pagination information for the set of playlists"
   */
  pageInfo: CollectionTracksRouteQuery_me_tracks_pageInfo;
  /**
   * A list of saved tracks.
   */
  edges: CollectionTracksRouteQuery_me_tracks_edges[];
}

export interface CollectionTracksRouteQuery_me {
  __typename: "CurrentUser";
  /**
   * Get detailed profile information about the current user (including the current user's username).
   */
  profile: CollectionTracksRouteQuery_me_profile;
  tracks: CollectionTracksRouteQuery_me_tracks | null;
}

export interface CollectionTracksRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionTracksRouteQuery_me | null;
}

export interface CollectionTracksRouteQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
