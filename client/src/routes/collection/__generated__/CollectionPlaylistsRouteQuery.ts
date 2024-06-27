/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionPlaylistsRouteQuery
// ====================================================

export interface CollectionPlaylistsRouteQuery_me_user {
  __typename: "User";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user.
   */
  id: string;
}

export interface CollectionPlaylistsRouteQuery_me_episodes_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface CollectionPlaylistsRouteQuery_me_episodes {
  __typename: "SavedEpisodesConnection";
  /**
   * Pagination information for the set of episodes
   */
  pageInfo: CollectionPlaylistsRouteQuery_me_episodes_pageInfo;
}

export interface CollectionPlaylistsRouteQuery_me_tracks_pageInfo {
  __typename: "PageInfo";
  /**
   * The total number of items returned for the page.
   */
  total: number;
}

export interface CollectionPlaylistsRouteQuery_me_tracks_edges_node_artists {
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

export interface CollectionPlaylistsRouteQuery_me_tracks_edges_node {
  __typename: "Track";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The artists who performed the track.
   */
  artists: CollectionPlaylistsRouteQuery_me_tracks_edges_node_artists[];
}

export interface CollectionPlaylistsRouteQuery_me_tracks_edges {
  __typename: "SavedTrackEdge";
  /**
   * The track
   */
  node: CollectionPlaylistsRouteQuery_me_tracks_edges_node;
}

export interface CollectionPlaylistsRouteQuery_me_tracks {
  __typename: "SavedTracksConnection";
  /**
   * "Pagination information for the set of playlists"
   */
  pageInfo: CollectionPlaylistsRouteQuery_me_tracks_pageInfo;
  /**
   * A list of saved tracks.
   */
  edges: CollectionPlaylistsRouteQuery_me_tracks_edges[];
}

export interface CollectionPlaylistsRouteQuery_me_playlists_pageInfo {
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

export interface CollectionPlaylistsRouteQuery_me_playlists_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface CollectionPlaylistsRouteQuery_me_playlists_edges_node {
  __typename: "Playlist";
  /**
   * The [Spotify ID](https:             // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: string;
  /**
   * The name of the playlist.
   */
  name: string;
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  description: string | null;
  /**
   * The [Spotify URI](https:            // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  uri: string;
  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order.
   * See [Working with Playlists](https: // developer.spotify.com/documentation/general/guides/working-with-playlists/).
   * **Note**: If returned, the source URL for the image (`url`) is temporary and
   * will expire in less than a day.
   */
  images: CollectionPlaylistsRouteQuery_me_playlists_edges_node_images[] | null;
}

export interface CollectionPlaylistsRouteQuery_me_playlists_edges {
  __typename: "PlaylistEdge";
  /**
   * The playlist
   */
  node: CollectionPlaylistsRouteQuery_me_playlists_edges_node;
}

export interface CollectionPlaylistsRouteQuery_me_playlists {
  __typename: "PlaylistConnection";
  /**
   * Pagination information for the set of playlists
   */
  pageInfo: CollectionPlaylistsRouteQuery_me_playlists_pageInfo;
  /**
   * The set of playlists.
   */
  edges: CollectionPlaylistsRouteQuery_me_playlists_edges[];
}

export interface CollectionPlaylistsRouteQuery_me {
  __typename: "CurrentUser";
  /**
   * Detailed profile information about the current user.
   */
  user: CollectionPlaylistsRouteQuery_me_user;
  episodes: CollectionPlaylistsRouteQuery_me_episodes | null;
  tracks: CollectionPlaylistsRouteQuery_me_tracks | null;
  /**
   * Playlists owned or followed by the current Spotify user.
   */
  playlists: CollectionPlaylistsRouteQuery_me_playlists | null;
}

export interface CollectionPlaylistsRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: CollectionPlaylistsRouteQuery_me | null;
}

export interface CollectionPlaylistsRouteQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
