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
};

/** Spotify catalog information for an artist. */
export type Artist = {
  readonly __typename: 'Artist';
  /** Known external URLs for this artist. */
  readonly externalUrls: ReadonlyArray<ExternalUrl>;
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
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  readonly uri: Scalars['String'];
};

/** A paged set of playlists */
export type PlaylistConnection = {
  readonly __typename: 'PlaylistConnection';
  /** The set of playlists */
  readonly nodes: ReadonlyArray<Playlist>;
  /** Pagination information for the set of playlists */
  readonly pageInfo: PageInfo;
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
  readonly tracks: ReadonlyArray<TrackSimplified>;
};

/** Information about a [track (simplified)](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedtrackobject) object */
export type TrackSimplified = {
  readonly __typename: 'TrackSimplified';
  readonly artists: ReadonlyArray<Artist>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
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
  readonly images: ReadonlyArray<Image>;
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


export type SidebarPlaylistsQuery = { readonly me: { readonly __typename: 'CurrentUser', readonly playlists: { readonly __typename: 'PlaylistConnection', readonly nodes: ReadonlyArray<{ readonly __typename: 'Playlist', readonly id: string, readonly name: string }> } | null } | null };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { readonly playlist: { readonly __typename: 'Playlist', readonly id: string, readonly name: string, readonly images: ReadonlyArray<{ readonly __typename: 'Image', readonly url: string }> | null, readonly owner: { readonly __typename: 'User', readonly id: string, readonly displayName: string | null } } | null };
