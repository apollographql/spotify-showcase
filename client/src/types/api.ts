export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

/** Spotify catalog information for an album. */
export type Album = {
  __typename: 'Album';
  /** The type of the album. */
  albumType: AlbumType;
  /** The artists of the album. */
  artists: Array<Artist>;
  /** Known external URLs for this album. */
  externalUrls: ExternalUrl;
  /** Genres for the album. */
  genres: Array<Scalars['String']>;
  /** A link to the Web API endpoint providing full details of the album. */
  href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: Scalars['ID'];
  /** The cover art for the album in various sizes, widest first. */
  images: Array<Image>;
  /** The label the album was released under. */
  label: Maybe<Scalars['String']>;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: Scalars['String'];
  /** The date the album was first released. */
  releaseDate: ReleaseDate;
  /** The number of tracks in the album. */
  totalTracks: Scalars['Int'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: Scalars['String'];
};

export enum AlbumType {
  Album = 'ALBUM',
  Compilation = 'COMPILATION',
  Single = 'SINGLE'
}

/** Spotify catalog information for an artist. */
export type Artist = {
  __typename: 'Artist';
  /** Known external URLs for this artist. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the artist. */
  href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: Scalars['ID'];
  /** The name of the artist. */
  name: Scalars['String'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri: Maybe<Scalars['String']>;
};

export type CurrentUser = {
  __typename: 'CurrentUser';
  /** Playlists owned or followed by the current Spotify user. */
  playlists: Maybe<PlaylistConnection>;
  /** Detailed profile information about the current user. */
  user: User;
};


export type CurrentUserplaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** Spotify catalog information for an episode. */
export type Episode = PlaylistTrack & {
  __typename: 'Episode';
  /** A URL to a 30 second preview (MP3 format) of the episode. `null` if not available. */
  audioPreviewUrl: Maybe<Scalars['String']>;
  /** A description of the episode */
  description: Scalars['String'];
  /** The episode length in milliseconds. */
  durationMs: Scalars['Int'];
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  explicit: Scalars['Boolean'];
  /** External URLs for this episode. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the episode. */
  href: Scalars['String'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode. */
  id: Scalars['ID'];
  /** The cover art for the episode in various sizes, widest first. */
  images: Array<Image>;
  /** `true` if the episode is hosted outside of Spotify's CDN. */
  isExternallyHosted: Scalars['Boolean'];
  /** `true` if the episode is playable in the given market. Otherwise `false`. */
  isPlayable: Scalars['Boolean'];
  /**
   * A list of the languages used in the episode, identified by their
   * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  languages: Array<Scalars['String']>;
  /** The name of the episode. */
  name: Scalars['String'];
  /** The date the episode was first released */
  releaseDate: Maybe<ReleaseDate>;
  /** The show containing the episode. */
  show: Show;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: Scalars['String'];
};


/** Spotify catalog information for an episode. */
export type EpisodedescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

export type ExternalUrl = {
  __typename: 'ExternalUrl';
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the object.
   */
  spotify: Maybe<Scalars['String']>;
};

export type Followers = {
  __typename: 'Followers';
  /** The total number of followers. */
  total: Scalars['Int'];
};

export type Image = {
  __typename: 'Image';
  /** The image height in pixels. */
  height: Maybe<Scalars['Int']>;
  /** The source URL of the image. */
  url: Scalars['String'];
  /** The image width in pixels. */
  width: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename: 'PageInfo';
  /** Whether there is a next page of items. */
  hasNextPage: Scalars['Boolean'];
  /** Whether there is a previous page of items. */
  hasPreviousPage: Scalars['Boolean'];
  /** The maximum number of items in the response (as set in the query or default) */
  limit: Scalars['Int'];
  /** The offset of the items returned (as set in the query or default) */
  offset: Scalars['Int'];
  /** The total number of items returned for the page. */
  total: Scalars['Int'];
};

/** Information about a playlist owned by a Spotify user */
export type Playlist = {
  __typename: 'Playlist';
  /** `true` if the owner allows other users to modify the playlist. */
  collaborative: Scalars['Boolean'];
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  description: Maybe<Scalars['String']>;
  /** Known external URLs for this playlist. */
  externalUrls: ExternalUrl;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: Scalars['ID'];
  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order.
   * See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
   * **Note**: If returned, the source URL for the image (`url`) is temporary and
   * will expire in less than a day.
   */
  images: Maybe<Array<Image>>;
  /** The name of the playlist. */
  name: Scalars['String'];
  /** The user who owns the playlist. */
  owner: User;
  /**
   * The playlist's public/private status: `true` the playlist is public, `false`
   * the playlist is private, `null` the playlist status is not relevant. For more
   * about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/)
   */
  public: Maybe<Scalars['Boolean']>;
  /** The tracks of the playlist. */
  tracks: PlaylistTrackConnection;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  uri: Scalars['String'];
};


/** Information about a playlist owned by a Spotify user */
export type PlaylisttracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** A paged set of playlists */
export type PlaylistConnection = {
  __typename: 'PlaylistConnection';
  /** The set of playlists. */
  edges: Array<PlaylistEdge>;
  /** Pagination information for the set of playlists */
  pageInfo: PageInfo;
};

export type PlaylistEdge = {
  __typename: 'PlaylistEdge';
  /** The playlist */
  node: Playlist;
};

export type PlaylistTrack = {
  /** The playlist track length in milliseconds. */
  durationMs: Scalars['Int'];
  /** External URLs for this episode. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the episode. */
  href: Scalars['String'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist track. */
  id: Scalars['ID'];
  /** The name of the episode. */
  name: Scalars['String'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist track.
   */
  uri: Scalars['String'];
};

/** A paged set of tracks for a playlist */
export type PlaylistTrackConnection = {
  __typename: 'PlaylistTrackConnection';
  /** Pagination information for the tracks belonging to a playlist */
  edges: Array<PlaylistTrackEdge>;
  /** Pagination information for the tracks belonging to a playlist */
  pageInfo: PageInfo;
};

export type PlaylistTrackEdge = {
  __typename: 'PlaylistTrackEdge';
  /** The date and time the track was added to the playlist */
  addedAt: Scalars['DateTime'];
  /** The user that added the track to the playlist */
  addedBy: User;
  /** The playlist track */
  node: PlaylistTrack;
};

export type Query = {
  __typename: 'Query';
  /**
   * A list of available genres seed parameter values for
   * [recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations).
   */
  genres: Array<Scalars['String']>;
  /** Information about the current logged-in user. */
  me: Maybe<CurrentUser>;
  /** A playlist owned by a Spotify user. */
  playlist: Maybe<Playlist>;
  /**
   * Recommendations for the current user.
   *
   * Recommendations are generated based on the available information for a given
   * seed entity and matched against similar artists and tracks. If there is
   * sufficient information about the provided seeds, a list of tracks will be
   * returned together with pool size details.
   *
   * For artists and tracks that are very new or obscure there might not be enough
   * data to generate a list of tracks.
   */
  recommendations: Maybe<Recommendations>;
};


export type QueryplaylistArgs = {
  id: Scalars['ID'];
};


export type QueryrecommendationsArgs = {
  seeds: RecommendationSeedInput;
};

/** Information about a recommendation [seed object](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
export type RecommendationSeed = {
  __typename: 'RecommendationSeed';
  /**
   * The number of tracks available after min_* and max_* filters have been
   * applied.
   */
  afterFilteringSize: Scalars['Int'];
  /** The number of tracks available after relinking for regional availability. */
  afterRelinkingSize: Scalars['Int'];
  /**
   * A link to the full track or artist data for this seed. For tracks this will
   * be a link to a [Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackobject).
   * For artists a link to an [Artist Object](https://developer.spotify.com/documentation/web-api/reference/#object-artistobject).
   * For genre seeds, this value will be `null`.
   */
  href: Maybe<Scalars['String']>;
  /**
   * The id used to select this seed. This will be the same as the string used in
   * the `seedArtists`, `seedTracks` or `seedGenres` parameter.
   */
  id: Scalars['ID'];
  /** The number of recommended tracks available for this seed. */
  initialPoolSize: Scalars['Int'];
  /** The entity type of this seed. */
  type: RecommendationSeedType;
};

export type RecommendationSeedInput = {
  /**
   * The target size of the list of recommended tracks. For seeds with unusually
   * small pools or when highly restrictive filtering is applied, it may be
   * impossible to generate the requested number of recommended tracks. Debugging
   * information for such cases is available in the response.
   *
   * Default value: 20.
   * Minimum value: 1.
   * Maximum value: 100.
   */
  limit?: InputMaybe<Scalars['Int']>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for seed artists. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["4NHQUGzhtTLFvgF5SZesLK"]
   */
  seedArtists?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * A list of any genres in the set of available genre seeds. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["classical", "country"]
   */
  seedGenres?: InputMaybe<Array<Scalars['String']>>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for a seed track. Up to 5 seed values may be provided in any combination of
   * `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["0c6xIDDpzE81m2q797ordA"]
   */
  seedTracks?: InputMaybe<Array<Scalars['ID']>>;
};

/** Available entity types for recommendation seeds. */
export enum RecommendationSeedType {
  Artist = 'ARTIST',
  Genre = 'GENRE',
  Track = 'TRACK'
}

/** Information about recommendations for the current user */
export type Recommendations = {
  __typename: 'Recommendations';
  /** An array of recommendation [seed objects](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
  seeds: Array<RecommendationSeed>;
  /**
   * An array of [track object (simplified)](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedtrackobject)
   * ordered according to the parameters supplied.
   */
  tracks: Array<Track>;
};

export type ReleaseDate = {
  __typename: 'ReleaseDate';
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: Scalars['String'];
  /** The precision with which the `date` value is known. */
  precision: ReleaseDatePrecision;
};

export enum ReleaseDatePrecision {
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR'
}

/** Spotify catalog information for a show. */
export type Show = {
  __typename: 'Show';
  /** A description of the show. */
  description: Scalars['String'];
  /**
   * Whether or not the show has explicit content (`true` = yes it does; `false`
   * = no it does not OR unknown).
   */
  explicit: Scalars['Boolean'];
  /** External URLs for this show. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the show. */
  href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: Scalars['ID'];
  /** The cover art for the show in various sizes, widest first. */
  images: Array<Image>;
  /**
   * `true` if all of the shows episodes are hosted outside of Spotify's CDN. This
   * field might be `null` in some cases.
   */
  isExternallyHosted: Maybe<Scalars['Boolean']>;
  /** A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
  languages: Array<Scalars['String']>;
  /** The media type of the show. */
  mediaType: Scalars['String'];
  /** The name of the episode. */
  name: Scalars['String'];
  /** The publisher of the show. */
  publisher: Scalars['String'];
  /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the show. */
  uri: Scalars['String'];
};


/** Spotify catalog information for a show. */
export type ShowdescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

export enum TextFormat {
  Html = 'HTML',
  Plain = 'PLAIN'
}

/** Spotify catalog information for a track. */
export type Track = PlaylistTrack & {
  __typename: 'Track';
  /** The album on which the track appears. */
  album: Album;
  /** The artists who performed the track. */
  artists: Array<Artist>;
  /** The disc number (usually `1` unless the album consists of more than one disc). */
  discNumber: Scalars['Int'];
  /** The track length in milliseconds */
  durationMs: Scalars['Int'];
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  explicit: Scalars['Boolean'];
  /** Known external IDs for the track. */
  externalIds: Maybe<TrackExternalIds>;
  /** Known external URLs for this track. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the track. */
  href: Scalars['String'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track. */
  id: Scalars['ID'];
  /** Whether or not the track is from a local file. */
  isLocal: Scalars['Boolean'];
  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
   * is applied. If `true`, the track is playable in the given market.
   * Otherwise `false`.
   */
  isPlayable: Scalars['Boolean'];
  /** The name of the track */
  name: Scalars['String'];
  /**
   * The popularity of the track. The value will be between 0 and 100, with 100
   * being the most popular.
   *
   * The popularity of a track is a value between 0 and 100, with 100 being the
   * most popular. The popularity is calculated by algorithm and is based, in the
   * most part, on the total number of plays the track has had and how recent those
   * plays are.
   *
   * Generally speaking, songs that are being played a lot now will have a higher
   * popularity than songs that were played a lot in the past. Duplicate tracks
   * (e.g. the same track from a single and an album) are rated independently.
   * Artist and album popularity is derived mathematically from track popularity.
   * Note: the popularity value may lag actual popularity by a few days: the value
   * is not updated in real time.
   */
  popularity: Scalars['Int'];
  /** A link to a 30 second preview (MP3 format) of the track. Can be `null` */
  previewUrl: Maybe<Scalars['String']>;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber: Maybe<Scalars['Int']>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: Scalars['String'];
};

export type TrackExternalIds = {
  __typename: 'TrackExternalIds';
  /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
  ean: Maybe<Scalars['String']>;
  /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
  isrc: Maybe<Scalars['String']>;
  /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
  upc: Maybe<Scalars['String']>;
};

/** Public profile information about a Spotify user. */
export type User = {
  __typename: 'User';
  /** The name displayed on the user's profile. `null` if not available. */
  displayName: Maybe<Scalars['String']>;
  /** Known public external URLs for this user. */
  externalUrls: ExternalUrl;
  /** Information about the followers of this user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  id: Scalars['ID'];
  /** The user's profile image. */
  images: Maybe<Array<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  uri: Scalars['String'];
};

export type SidebarPlaylistsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type SidebarPlaylistsQuery = { me: { __typename: 'CurrentUser', playlists: { __typename: 'PlaylistConnection', edges: Array<{ __typename: 'PlaylistEdge', node: { __typename: 'Playlist', id: string, name: string } }> } | null } | null };

export type PlaylistTable_playlistTrackEdges = { __typename: 'PlaylistTrackEdge', addedAt: string, node: { __typename: 'Episode', id: string, name: string, durationMs: number, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision } | null, show: { __typename: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, durationMs: number, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } };

type PlaylistTitleCell_playlistTrack_Episode_ = { __typename: 'Episode', id: string, name: string, show: { __typename: 'Show', id: string, publisher: string, images: Array<{ __typename: 'Image', url: string }> } };

type PlaylistTitleCell_playlistTrack_Track_ = { __typename: 'Track', id: string, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } };

export type PlaylistTitleCell_playlistTrack = PlaylistTitleCell_playlistTrack_Episode_ | PlaylistTitleCell_playlistTrack_Track_;

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { playlist: { __typename: 'Playlist', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> | null, owner: { __typename: 'User', id: string, displayName: string | null }, tracks: { __typename: 'PlaylistTrackConnection', edges: Array<{ __typename: 'PlaylistTrackEdge', addedAt: string, node: { __typename: 'Episode', id: string, name: string, durationMs: number, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision } | null, show: { __typename: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, durationMs: number, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } }>, pageInfo: { __typename: 'PageInfo', total: number } } } | null };
