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

export type Artist = {
  readonly __typename: 'Artist';
  readonly externalUrls: ReadonlyArray<ExternalUrl>;
  readonly href: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly uri: Maybe<Scalars['String']>;
};

export type CurrentUser = UserOutline & {
  readonly __typename: 'CurrentUser';
  readonly country: Maybe<Scalars['String']>;
  readonly displayName: Maybe<Scalars['String']>;
  readonly email: Scalars['String'];
  readonly externalUrls: ExternalUrl;
  readonly followers: UserFollowers;
  readonly href: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly images: ReadonlyArray<UserProfileImage>;
  readonly product: Maybe<Scalars['String']>;
  readonly type: Scalars['String'];
  readonly uri: Scalars['String'];
};

export type ExternalUrl = {
  readonly __typename: 'ExternalUrl';
  readonly spotify: Maybe<Scalars['String']>;
};

export type Query = {
  readonly __typename: 'Query';
  readonly genres: ReadonlyArray<Scalars['String']>;
  readonly me: Maybe<CurrentUser>;
  readonly recommendations: Maybe<Recommendations>;
};


export type QueryRecommendationsArgs = {
  seeds: RecommendationSeedInput;
};

export type RecommendationSeed = {
  readonly __typename: 'RecommendationSeed';
  readonly afterFilteringSize: Scalars['Int'];
  readonly afterRelinkingSize: Scalars['Int'];
  readonly href: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly initialPoolSize: Scalars['Int'];
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
  readonly limit: InputMaybe<Scalars['Int']>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for seed artists. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["4NHQUGzhtTLFvgF5SZesLK"]
   */
  readonly seedArtists: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  /**
   * A list of any genres in the set of available genre seeds. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["classical", "country"]
   */
  readonly seedGenres: InputMaybe<ReadonlyArray<Scalars['String']>>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for a seed track. Up to 5 seed values may be provided in any combination of
   * `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["0c6xIDDpzE81m2q797ordA"]
   */
  readonly seedTracks: InputMaybe<ReadonlyArray<Scalars['ID']>>;
};

export enum RecommendationSeedType {
  Artist = 'ARTIST',
  Genre = 'GENRE',
  Track = 'TRACK'
}

export type Recommendations = {
  readonly __typename: 'Recommendations';
  readonly seeds: ReadonlyArray<RecommendationSeed>;
  readonly tracks: ReadonlyArray<TrackSimplified>;
};

export type TrackSimplified = {
  readonly __typename: 'TrackSimplified';
  readonly artists: ReadonlyArray<Artist>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

export type User = UserOutline & {
  readonly __typename: 'User';
  readonly displayName: Maybe<Scalars['String']>;
  readonly externalUrls: ExternalUrl;
  readonly followers: UserFollowers;
  readonly href: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly images: ReadonlyArray<UserProfileImage>;
  readonly type: Scalars['String'];
  readonly uri: Scalars['String'];
};

export type UserFollowers = {
  readonly __typename: 'UserFollowers';
  readonly href: Maybe<Scalars['String']>;
  readonly total: Scalars['Int'];
};

export type UserOutline = {
  readonly displayName: Maybe<Scalars['String']>;
  readonly externalUrls: ExternalUrl;
  readonly followers: UserFollowers;
  readonly href: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly images: ReadonlyArray<UserProfileImage>;
  readonly type: Scalars['String'];
  readonly uri: Scalars['String'];
};

export type UserProfileImage = {
  readonly __typename: 'UserProfileImage';
  readonly height: Maybe<Scalars['Int']>;
  readonly url: Scalars['String'];
  readonly width: Maybe<Scalars['Int']>;
};

export type RootQueryVariables = Exact<{ [key: string]: never; }>;


export type RootQuery = { readonly me: { readonly __typename: 'CurrentUser', readonly id: string } | null };
