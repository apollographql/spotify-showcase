/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReleaseDatePrecision } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: PlaylistQuery
// ====================================================

export interface PlaylistQuery_me_profile {
  __typename: "CurrentUserProfile";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  id: string;
}

export interface PlaylistQuery_me {
  __typename: "CurrentUser";
  /**
   * Get detailed profile information about the current user (including the current user's username).
   */
  profile: PlaylistQuery_me_profile;
}

export interface PlaylistQuery_playlist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  vibrantColor: string | null;
}

export interface PlaylistQuery_playlist_owner {
  __typename: "User";
  /**
   * The [Spotify user ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user.
   */
  id: string;
  /**
   * The name displayed on the user's profile. `null` if not available.
   */
  displayName: string | null;
}

export interface PlaylistQuery_playlist_tracks_edges_node_Track_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_Track_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: PlaylistQuery_playlist_tracks_edges_node_Track_album_images[];
}

export interface PlaylistQuery_playlist_tracks_edges_node_Track_artists {
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

export interface PlaylistQuery_playlist_tracks_edges_node_Track {
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
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * The album on which the track appears.
   */
  album: PlaylistQuery_playlist_tracks_edges_node_Track_album;
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
  artists: PlaylistQuery_playlist_tracks_edges_node_Track_artists[];
}

export interface PlaylistQuery_playlist_tracks_edges_node_Episode_releaseDate {
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

export interface PlaylistQuery_playlist_tracks_edges_node_Episode_show_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface PlaylistQuery_playlist_tracks_edges_node_Episode_show {
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
  images: PlaylistQuery_playlist_tracks_edges_node_Episode_show_images[];
}

export interface PlaylistQuery_playlist_tracks_edges_node_Episode {
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
  releaseDate: PlaylistQuery_playlist_tracks_edges_node_Episode_releaseDate;
  /**
   * The show containing the episode.
   */
  show: PlaylistQuery_playlist_tracks_edges_node_Episode_show;
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  explicit: boolean;
}

export type PlaylistQuery_playlist_tracks_edges_node = PlaylistQuery_playlist_tracks_edges_node_Track | PlaylistQuery_playlist_tracks_edges_node_Episode;

export interface PlaylistQuery_playlist_tracks_edges {
  __typename: "PlaylistTrackEdge";
  /**
   * The date and time the track was added to the playlist
   */
  addedAt: any | null;
  /**
   * The playlist track
   */
  node: PlaylistQuery_playlist_tracks_edges_node;
}

export interface PlaylistQuery_playlist_tracks_pageInfo {
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

export interface PlaylistQuery_playlist_tracks {
  __typename: "PlaylistTrackConnection";
  /**
   * Pagination information for the tracks belonging to a playlist
   */
  edges: PlaylistQuery_playlist_tracks_edges[];
  /**
   * Pagination information for the tracks belonging to a playlist
   */
  pageInfo: PlaylistQuery_playlist_tracks_pageInfo;
}

export interface PlaylistQuery_playlist {
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
  images: PlaylistQuery_playlist_images[] | null;
  /**
   * The user who owns the playlist.
   */
  owner: PlaylistQuery_playlist_owner;
  /**
   * The tracks of the playlist.
   */
  tracks: PlaylistQuery_playlist_tracks;
}

export interface PlaylistQuery {
  /**
   * Information about the current logged-in user.
   */
  me: PlaylistQuery_me | null;
  /**
   * A playlist owned by a Spotify user.
   */
  playlist: PlaylistQuery_playlist | null;
}

export interface PlaylistQueryVariables {
  id: string;
  offset?: number | null;
}
