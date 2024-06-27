/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AlbumType, CopyrightType, ReleaseDatePrecision } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: AlbumRouteQuery
// ====================================================

export interface AlbumRouteQuery_me {
  __typename: "CurrentUser";
  /**
   * Check if one or more albums is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  albumsContains: boolean[] | null;
}

export interface AlbumRouteQuery_album_artists {
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

export interface AlbumRouteQuery_album_copyrights {
  __typename: "Copyright";
  /**
   * The copyright text for this content.
   */
  text: string;
  /**
   * The type of copyright: `C` = the copyright, `P` = the sound recording
   * (performance) copyright.
   */
  type: CopyrightType | null;
}

export interface AlbumRouteQuery_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
  vibrantColor: string | null;
}

export interface AlbumRouteQuery_album_releaseDate {
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

export interface AlbumRouteQuery_album_tracks_edges_node_artists {
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

export interface AlbumRouteQuery_album_tracks_edges_node {
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
  artists: AlbumRouteQuery_album_tracks_edges_node_artists[];
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

export interface AlbumRouteQuery_album_tracks_edges {
  __typename: "AlbumTrackEdge";
  /**
   * The track on the album
   */
  node: AlbumRouteQuery_album_tracks_edges_node;
}

export interface AlbumRouteQuery_album_tracks {
  __typename: "AlbumTrackConnection";
  /**
   * The set of tracks.
   */
  edges: AlbumRouteQuery_album_tracks_edges[];
}

export interface AlbumRouteQuery_album {
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
   * The number of tracks in the album.
   */
  totalTracks: number;
  /**
   * The [Spotify URI](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: string;
  /**
   * The artists of the album.
   */
  artists: AlbumRouteQuery_album_artists[];
  /**
   * The copyrights for the album.
   */
  copyrights: AlbumRouteQuery_album_copyrights[];
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: AlbumRouteQuery_album_images[];
  /**
   * The date the album was first released.
   */
  releaseDate: AlbumRouteQuery_album_releaseDate;
  /**
   * The tracks of the album.
   */
  tracks: AlbumRouteQuery_album_tracks | null;
}

export interface AlbumRouteQuery {
  /**
   * Information about the current logged-in user.
   */
  me: AlbumRouteQuery_me | null;
  /**
   * Spotify catalog information for an album.
   */
  album: AlbumRouteQuery_album | null;
}

export interface AlbumRouteQueryVariables {
  albumId: string;
}
