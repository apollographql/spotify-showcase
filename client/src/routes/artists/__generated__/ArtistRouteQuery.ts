/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AlbumType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ArtistRouteQuery
// ====================================================

export interface ArtistRouteQuery_artist_albums_edges_node_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
}

export interface ArtistRouteQuery_artist_albums_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_artist_albums_edges_node {
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
   * The type of the album.
   */
  albumType: AlbumType;
  /**
   * The number of tracks in the album.
   */
  totalTracks: number;
  /**
   * The date the album was first released.
   */
  releaseDate: ArtistRouteQuery_artist_albums_edges_node_releaseDate;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistRouteQuery_artist_albums_edges_node_images[];
}

export interface ArtistRouteQuery_artist_albums_edges {
  __typename: "ArtistAlbumEdge";
  /**
   * Spotify catalog information for the album.
   */
  node: ArtistRouteQuery_artist_albums_edges_node;
}

export interface ArtistRouteQuery_artist_albums {
  __typename: "ArtistAlbumsConnection";
  /**
   * A list of albums that belong to the artist.
   */
  edges: ArtistRouteQuery_artist_albums_edges[] | null;
}

export interface ArtistRouteQuery_artist_singles_edges_node_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
}

export interface ArtistRouteQuery_artist_singles_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_artist_singles_edges_node {
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
   * The type of the album.
   */
  albumType: AlbumType;
  /**
   * The number of tracks in the album.
   */
  totalTracks: number;
  /**
   * The date the album was first released.
   */
  releaseDate: ArtistRouteQuery_artist_singles_edges_node_releaseDate;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistRouteQuery_artist_singles_edges_node_images[];
}

export interface ArtistRouteQuery_artist_singles_edges {
  __typename: "ArtistAlbumEdge";
  /**
   * Spotify catalog information for the album.
   */
  node: ArtistRouteQuery_artist_singles_edges_node;
}

export interface ArtistRouteQuery_artist_singles {
  __typename: "ArtistAlbumsConnection";
  /**
   * A list of albums that belong to the artist.
   */
  edges: ArtistRouteQuery_artist_singles_edges[] | null;
}

export interface ArtistRouteQuery_artist_appearsOn_edges_node_releaseDate {
  __typename: "ReleaseDate";
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: string;
}

export interface ArtistRouteQuery_artist_appearsOn_edges_node_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_artist_appearsOn_edges_node {
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
   * The type of the album.
   */
  albumType: AlbumType;
  /**
   * The number of tracks in the album.
   */
  totalTracks: number;
  /**
   * The date the album was first released.
   */
  releaseDate: ArtistRouteQuery_artist_appearsOn_edges_node_releaseDate;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistRouteQuery_artist_appearsOn_edges_node_images[];
}

export interface ArtistRouteQuery_artist_appearsOn_edges {
  __typename: "ArtistAlbumEdge";
  /**
   * Spotify catalog information for the album.
   */
  node: ArtistRouteQuery_artist_appearsOn_edges_node;
}

export interface ArtistRouteQuery_artist_appearsOn {
  __typename: "ArtistAlbumsConnection";
  /**
   * A list of albums that belong to the artist.
   */
  edges: ArtistRouteQuery_artist_appearsOn_edges[] | null;
}

export interface ArtistRouteQuery_artist_followers {
  __typename: "Followers";
  /**
   * The total number of followers.
   */
  total: number;
}

export interface ArtistRouteQuery_artist_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_artist_relatedArtists_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_artist_relatedArtists {
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
  images: ArtistRouteQuery_artist_relatedArtists_images[];
}

export interface ArtistRouteQuery_artist_topTracks_album_images {
  __typename: "Image";
  /**
   * The source URL of the image.
   */
  url: string;
}

export interface ArtistRouteQuery_artist_topTracks_album {
  __typename: "Album";
  /**
   * The [Spotify ID](https: // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: ArtistRouteQuery_artist_topTracks_album_images[];
}

export interface ArtistRouteQuery_artist_topTracks {
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
  album: ArtistRouteQuery_artist_topTracks_album;
}

export interface ArtistRouteQuery_artist {
  __typename: "Artist";
  /**
   * The [Spotify ID](https:   // developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: string;
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * Spotify catalog information about an artist's albums.
   */
  albums: ArtistRouteQuery_artist_albums | null;
  /**
   * Spotify catalog information about an artist's albums.
   */
  singles: ArtistRouteQuery_artist_singles | null;
  /**
   * Spotify catalog information about an artist's albums.
   */
  appearsOn: ArtistRouteQuery_artist_appearsOn | null;
  /**
   * Information about the followers of the artist.
   */
  followers: ArtistRouteQuery_artist_followers;
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: ArtistRouteQuery_artist_images[];
  /**
   * Spotify catalog information about artists similar to a given artist.
   * Similarity is based on analysis of the Spotify community's
   * [listening history](http: // news.spotify.com/se/2010/02/03/related-artists/).
   */
  relatedArtists: ArtistRouteQuery_artist_relatedArtists[];
  /**
   * Spotify catalog information about an artist's top tracks.
   */
  topTracks: ArtistRouteQuery_artist_topTracks[];
}

export interface ArtistRouteQuery {
  /**
   * Spotify catalog information for an artist.
   */
  artist: ArtistRouteQuery_artist | null;
}

export interface ArtistRouteQueryVariables {
  artistId: string;
}
