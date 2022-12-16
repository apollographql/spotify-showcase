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
  readonly __typename: 'Album';
  /** The type of the album. */
  readonly albumType: AlbumType;
  /** The artists of the album. */
  readonly artists: ReadonlyArray<Artist>;
  /** Known external URLs for this album. */
  readonly externalUrls: ExternalUrl;
  /** Genres for the album. */
  readonly genres: ReadonlyArray<Scalars['String']>;
  /** A link to the Web API endpoint providing full details of the album. */
  readonly href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  readonly id: Scalars['ID'];
  /** The cover art for the album in various sizes, widest first. */
  readonly images: ReadonlyArray<Image>;
  /** The label the album was released under. */
  readonly label: Maybe<Scalars['String']>;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  readonly name: Scalars['String'];
  /** The date the album was first released. */
  readonly releaseDate: ReleaseDate;
  /** The number of tracks in the album. */
  readonly totalTracks: Scalars['Int'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  readonly uri: Scalars['String'];
};

export enum AlbumType {
  Album = 'ALBUM',
  Compilation = 'COMPILATION',
  Single = 'SINGLE'
}

/** Spotify catalog information for an artist. */
export type Artist = {
  readonly __typename: 'Artist';
  /** Known external URLs for this artist. */
  readonly externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the artist. */
  readonly href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  readonly id: Scalars['ID'];
  /** The name of the artist. */
  readonly name: Scalars['String'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  readonly uri: Maybe<Scalars['String']>;
};

export type CurrentUser = {
  readonly __typename: 'CurrentUser';
  /** Playlists owned or followed by the current Spotify user. */
  readonly playlists: Maybe<PlaylistConnection>;
  /** Detailed profile information about the current user. */
  readonly user: User;
};


export type CurrentUserPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** Spotify catalog information for an episode. */
export type Episode = PlaylistTrack & {
  readonly __typename: 'Episode';
  /** A URL to a 30 second preview (MP3 format) of the episode. `null` if not available. */
  readonly audioPreviewUrl: Maybe<Scalars['String']>;
  /** A description of the episode */
  readonly description: Scalars['String'];
  /** The episode length in milliseconds. */
  readonly durationMs: Scalars['Int'];
  /**
   * Whether or not the episode has explicit content (`true` = yes it does;
   * `false` = no it does not OR unknown).
   */
  readonly explicit: Scalars['Boolean'];
  /** External URLs for this episode. */
  readonly externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the episode. */
  readonly href: Scalars['String'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode. */
  readonly id: Scalars['ID'];
  /** The cover art for the episode in various sizes, widest first. */
  readonly images: ReadonlyArray<Image>;
  /** `true` if the episode is hosted outside of Spotify's CDN. */
  readonly isExternallyHosted: Scalars['Boolean'];
  /** `true` if the episode is playable in the given market. Otherwise `false`. */
  readonly isPlayable: Scalars['Boolean'];
  /**
   * A list of the languages used in the episode, identified by their
   * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
   */
  readonly languages: ReadonlyArray<Scalars['String']>;
  /** The name of the episode. */
  readonly name: Scalars['String'];
  /** The date the episode was first released */
  readonly releaseDate: Maybe<ReleaseDate>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  readonly uri: Scalars['String'];
};


/** Spotify catalog information for an episode. */
export type EpisodeDescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

export type ExternalUrl = {
  readonly __typename: 'ExternalUrl';
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the object.
   */
  readonly spotify: Maybe<Scalars['String']>;
};

export type Followers = {
  readonly __typename: 'Followers';
  /** The total number of followers. */
  readonly total: Scalars['Int'];
};

export type Image = {
  readonly __typename: 'Image';
  /** The image height in pixels. */
  readonly height: Maybe<Scalars['Int']>;
  /** The source URL of the image. */
  readonly url: Scalars['String'];
  /** The image width in pixels. */
  readonly width: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  readonly __typename: 'PageInfo';
  /** Whether there is a next page of items. */
  readonly hasNextPage: Scalars['Boolean'];
  /** Whether there is a previous page of items. */
  readonly hasPreviousPage: Scalars['Boolean'];
  /** The maximum number of items in the response (as set in the query or default) */
  readonly limit: Scalars['Int'];
  /** The offset of the items returned (as set in the query or default) */
  readonly offset: Scalars['Int'];
  /** The total number of items returned for the page. */
  readonly total: Scalars['Int'];
};

/** Information about a playlist owned by a Spotify user */
export type Playlist = {
  readonly __typename: 'Playlist';
  /** `true` if the owner allows other users to modify the playlist. */
  readonly collaborative: Scalars['Boolean'];
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  readonly description: Maybe<Scalars['String']>;
  /** Known external URLs for this playlist. */
  readonly externalUrls: ExternalUrl;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  readonly id: Scalars['ID'];
  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order.
   * See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
   * **Note**: If returned, the source URL for the image (`url`) is temporary and
   * will expire in less than a day.
   */
  readonly images: Maybe<ReadonlyArray<Image>>;
  /** The name of the playlist. */
  readonly name: Scalars['String'];
  /** The user who owns the playlist. */
  readonly owner: User;
  /**
   * The playlist's public/private status: `true` the playlist is public, `false`
   * the playlist is private, `null` the playlist status is not relevant. For more
   * about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/)
   */
  readonly public: Maybe<Scalars['Boolean']>;
  /** The tracks of the playlist. */
  readonly tracks: PlaylistTrackConnection;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  readonly uri: Scalars['String'];
};


/** Information about a playlist owned by a Spotify user */
export type PlaylistTracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** A paged set of playlists */
export type PlaylistConnection = {
  readonly __typename: 'PlaylistConnection';
  /** The set of playlists. */
  readonly edges: ReadonlyArray<PlaylistEdge>;
  /** Pagination information for the set of playlists */
  readonly pageInfo: PageInfo;
};

export type PlaylistEdge = {
  readonly __typename: 'PlaylistEdge';
  /** The playlist */
  readonly node: Playlist;
};

export type PlaylistTrack = {
  /** The playlist track length in milliseconds. */
  readonly durationMs: Scalars['Int'];
  /** External URLs for this episode. */
  readonly externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the episode. */
  readonly href: Scalars['String'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist track. */
  readonly id: Scalars['ID'];
  /** The name of the episode. */
  readonly name: Scalars['String'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist track.
   */
  readonly uri: Scalars['String'];
};

/** A paged set of tracks for a playlist */
export type PlaylistTrackConnection = {
  readonly __typename: 'PlaylistTrackConnection';
  /** Pagination information for the tracks belonging to a playlist */
  readonly edges: ReadonlyArray<PlaylistTrackEdge>;
  /** Pagination information for the tracks belonging to a playlist */
  readonly pageInfo: PageInfo;
};

export type PlaylistTrackEdge = {
  readonly __typename: 'PlaylistTrackEdge';
  /** The date and time the track was added to the playlist */
  readonly addedAt: Scalars['DateTime'];
  /** The user that added the track to the playlist */
  readonly addedBy: User;
  /** The playlist track */
  readonly node: PlaylistTrack;
};

export type Query = {
  readonly __typename: 'Query';
  /**
   * A list of available genres seed parameter values for
   * [recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations).
   */
  readonly genres: ReadonlyArray<Scalars['String']>;
  /** Information about the current logged-in user. */
  readonly me: Maybe<CurrentUser>;
  /** A playlist owned by a Spotify user. */
  readonly playlist: Maybe<Playlist>;
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
  readonly recommendations: Maybe<Recommendations>;
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryRecommendationsArgs = {
  seeds: RecommendationSeedInput;
};

/** Information about a recommendation [seed object](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
export type RecommendationSeed = {
  readonly __typename: 'RecommendationSeed';
  /**
   * The number of tracks available after min_* and max_* filters have been
   * applied.
   */
  readonly afterFilteringSize: Scalars['Int'];
  /** The number of tracks available after relinking for regional availability. */
  readonly afterRelinkingSize: Scalars['Int'];
  /**
   * A link to the full track or artist data for this seed. For tracks this will
   * be a link to a [Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackobject).
   * For artists a link to an [Artist Object](https://developer.spotify.com/documentation/web-api/reference/#object-artistobject).
   * For genre seeds, this value will be `null`.
   */
  readonly href: Maybe<Scalars['String']>;
  /**
   * The id used to select this seed. This will be the same as the string used in
   * the `seedArtists`, `seedTracks` or `seedGenres` parameter.
   */
  readonly id: Scalars['ID'];
  /** The number of recommended tracks available for this seed. */
  readonly initialPoolSize: Scalars['Int'];
  /** The entity type of this seed. */
  readonly type: RecommendationSeedType;
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
  readonly limit?: InputMaybe<Scalars['Int']>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for seed artists. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["4NHQUGzhtTLFvgF5SZesLK"]
   */
  readonly seedArtists?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  /**
   * A list of any genres in the set of available genre seeds. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["classical", "country"]
   */
  readonly seedGenres?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for a seed track. Up to 5 seed values may be provided in any combination of
   * `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["0c6xIDDpzE81m2q797ordA"]
   */
  readonly seedTracks?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
};

/** Available entity types for recommendation seeds. */
export enum RecommendationSeedType {
  Artist = 'ARTIST',
  Genre = 'GENRE',
  Track = 'TRACK'
}

/** Information about recommendations for the current user */
export type Recommendations = {
  readonly __typename: 'Recommendations';
  /** An array of recommendation [seed objects](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
  readonly seeds: ReadonlyArray<RecommendationSeed>;
  /**
   * An array of [track object (simplified)](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedtrackobject)
   * ordered according to the parameters supplied.
   */
  readonly tracks: ReadonlyArray<Track>;
};

export type ReleaseDate = {
  readonly __typename: 'ReleaseDate';
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  readonly date: Scalars['String'];
  /** The precision with which the `date` value is known. */
  readonly precision: ReleaseDatePrecision;
};

export enum ReleaseDatePrecision {
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR'
}

export enum TextFormat {
  Html = 'HTML',
  Plain = 'PLAIN'
}

/** Spotify catalog information for a track. */
export type Track = PlaylistTrack & {
  readonly __typename: 'Track';
  /** The album on which the track appears. */
  readonly album: Album;
  /** The artists who performed the track. */
  readonly artists: ReadonlyArray<Artist>;
  /** The disc number (usually `1` unless the album consists of more than one disc). */
  readonly discNumber: Scalars['Int'];
  /** The track length in milliseconds */
  readonly durationMs: Scalars['Int'];
  /**
   * Whether or not the track has explicit lyrics (`true` = yes it does;
   * `false` = no it does not OR unknown)
   */
  readonly explicit: Scalars['Boolean'];
  /** Known external IDs for the track. */
  readonly externalIds: Maybe<TrackExternalIds>;
  /** Known external URLs for this track. */
  readonly externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the track. */
  readonly href: Scalars['String'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track. */
  readonly id: Scalars['ID'];
  /** Whether or not the track is from a local file. */
  readonly isLocal: Scalars['Boolean'];
  /**
   * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
   * is applied. If `true`, the track is playable in the given market.
   * Otherwise `false`.
   */
  readonly isPlayable: Scalars['Boolean'];
  /** The name of the track */
  readonly name: Scalars['String'];
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
  readonly popularity: Scalars['Int'];
  /** A link to a 30 second preview (MP3 format) of the track. Can be `null` */
  readonly previewUrl: Maybe<Scalars['String']>;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  readonly trackNumber: Maybe<Scalars['Int']>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  readonly uri: Scalars['String'];
};

export type TrackExternalIds = {
  readonly __typename: 'TrackExternalIds';
  /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
  readonly ean: Maybe<Scalars['String']>;
  /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
  readonly isrc: Maybe<Scalars['String']>;
  /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
  readonly upc: Maybe<Scalars['String']>;
};

/** Public profile information about a Spotify user. */
export type User = {
  readonly __typename: 'User';
  /** The name displayed on the user's profile. `null` if not available. */
  readonly displayName: Maybe<Scalars['String']>;
  /** Known public external URLs for this user. */
  readonly externalUrls: ExternalUrl;
  /** Information about the followers of this user. */
  readonly followers: Followers;
  /** A link to the Web API endpoint for this user. */
  readonly href: Scalars['String'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  readonly id: Scalars['ID'];
  /** The user's profile image. */
  readonly images: Maybe<ReadonlyArray<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  readonly uri: Scalars['String'];
};

export type SidebarPlaylistsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type SidebarPlaylistsQuery = { readonly me: { readonly __typename: 'CurrentUser', readonly playlists: { readonly __typename: 'PlaylistConnection', readonly edges: ReadonlyArray<{ readonly __typename: 'PlaylistEdge', readonly node: { readonly __typename: 'Playlist', readonly id: string, readonly name: string } }> } | null } | null };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { readonly playlist: { readonly __typename: 'Playlist', readonly id: string, readonly name: string, readonly images: ReadonlyArray<{ readonly __typename: 'Image', readonly url: string }> | null, readonly owner: { readonly __typename: 'User', readonly id: string, readonly displayName: string | null }, readonly tracks: { readonly __typename: 'PlaylistTrackConnection', readonly pageInfo: { readonly __typename: 'PageInfo', readonly total: number } } } | null };
