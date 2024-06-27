/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AlbumType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: TrackRouteQuery
// ====================================================

export interface TrackRouteQuery_track_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  vibrantColor: string | null;
}

export interface TrackRouteQuery_track_album_tracks_edges_node_artists {
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

export interface TrackRouteQuery_track_album_tracks_edges_node {
  __typename: "Track";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber: number | null;
  /**
   * The artists who performed the track.
   */
  artists: TrackRouteQuery_track_album_tracks_edges_node_artists[];
  /**
   * The name of the track
   */
  name: string;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
}

export interface TrackRouteQuery_track_album_tracks_edges {
  __typename: "AlbumTrackEdge";
  /**
   * The track on the album
   */
  node: TrackRouteQuery_track_album_tracks_edges_node;
}

export interface TrackRouteQuery_track_album_tracks {
  __typename: "AlbumTrackConnection";
  /**
   * The set of tracks.
   */
  edges: TrackRouteQuery_track_album_tracks_edges[];
}

export interface TrackRouteQuery_track_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https:  // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The type of the album.
   */
  albumType: AlbumType;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: TrackRouteQuery_track_album_images[];
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string;
  /**
   * The tracks of the album.
   */
  tracks: TrackRouteQuery_track_album_tracks | null;
}

export interface TrackRouteQuery_track_artists_topTracks_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface TrackRouteQuery_track_artists_topTracks_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: TrackRouteQuery_track_artists_topTracks_album_images[];
}

export interface TrackRouteQuery_track_artists_topTracks {
  __typename: "Track";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: boolean;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The album on which the track appears.
   */
  album: TrackRouteQuery_track_artists_topTracks_album;
}

export interface TrackRouteQuery_track_artists_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface TrackRouteQuery_track_artists {
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
   * Spotify catalog information about an artist's top tracks.
   */
  topTracks: TrackRouteQuery_track_artists_topTracks[];
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: TrackRouteQuery_track_artists_images[];
}

export interface TrackRouteQuery_track {
  __typename: "Track";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
   */
  id: string;
  /**
   * The track length in milliseconds
   */
  durationMs: number;
  /**
   * The name of the track
   */
  name: string;
  /**
   * The album on which the track appears.
   */
  album: TrackRouteQuery_track_album;
  /**
   * The artists who performed the track.
   */
  artists: TrackRouteQuery_track_artists[];
}

export interface TrackRouteQuery {
  /**
   * Get Spotify catalog information for a single track identified by its unique
   * Spotify ID.
   */
  track: TrackRouteQuery_track | null;
}

export interface TrackRouteQueryVariables {
  trackId: string;
}
