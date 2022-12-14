import { ContextValue } from '../types';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Artist = {
  __typename?: 'Artist';
  externalUrls: Array<ExternalUrl>;
  href: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  uri?: Maybe<Scalars['String']>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  spotify?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  /** The image height in pixels. */
  height?: Maybe<Scalars['Int']>;
  /** The source URL of the image. */
  url: Scalars['String'];
  /** The image width in pixels. */
  width?: Maybe<Scalars['Int']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  /** `true` if the owner allows other users to modify the playlist. */
  collaborative: Scalars['Boolean'];
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
  images?: Maybe<Array<Image>>;
  /** The name of the playlist. */
  name: Scalars['String'];
  /** The user who owns the playlist. */
  owner: User;
  /**
   * The playlist's public/private status: `true` the playlist is public, `false`
   * the playlist is private, `null` the playlist status is not relevant. For more
   * about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/)
   */
  public?: Maybe<Scalars['Boolean']>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  uri: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  genres: Array<Scalars['String']>;
  me?: Maybe<User>;
  recommendations?: Maybe<Recommendations>;
};


export type QueryRecommendationsArgs = {
  seeds: RecommendationSeedInput;
};

export type RecommendationSeed = {
  __typename?: 'RecommendationSeed';
  afterFilteringSize: Scalars['Int'];
  afterRelinkingSize: Scalars['Int'];
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  initialPoolSize: Scalars['Int'];
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

export type RecommendationSeedType =
  | 'ARTIST'
  | 'GENRE'
  | 'TRACK';

export type Recommendations = {
  __typename?: 'Recommendations';
  seeds: Array<RecommendationSeed>;
  tracks: Array<TrackSimplified>;
};

export type TrackSimplified = {
  __typename?: 'TrackSimplified';
  artists: Array<Artist>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']>;
  externalUrls: ExternalUrl;
  followers: UserFollowers;
  href: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Image>;
  type: Scalars['String'];
  uri: Scalars['String'];
};

export type UserFollowers = {
  __typename?: 'UserFollowers';
  href?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Artist: ResolverTypeWrapper<Artist>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ExternalUrl: ResolverTypeWrapper<ExternalUrl>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Playlist: ResolverTypeWrapper<Playlist>;
  Query: ResolverTypeWrapper<{}>;
  RecommendationSeed: ResolverTypeWrapper<RecommendationSeed>;
  RecommendationSeedInput: RecommendationSeedInput;
  RecommendationSeedType: RecommendationSeedType;
  Recommendations: ResolverTypeWrapper<Recommendations>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TrackSimplified: ResolverTypeWrapper<TrackSimplified>;
  User: ResolverTypeWrapper<User>;
  UserFollowers: ResolverTypeWrapper<UserFollowers>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Artist: Artist;
  Boolean: Scalars['Boolean'];
  ExternalUrl: ExternalUrl;
  ID: Scalars['ID'];
  Image: Image;
  Int: Scalars['Int'];
  Playlist: Playlist;
  Query: {};
  RecommendationSeed: RecommendationSeed;
  RecommendationSeedInput: RecommendationSeedInput;
  Recommendations: Recommendations;
  String: Scalars['String'];
  TrackSimplified: TrackSimplified;
  User: User;
  UserFollowers: UserFollowers;
}>;

export type ArtistResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = ResolversObject<{
  externalUrls?: Resolver<Array<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExternalUrlResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl']> = ResolversObject<{
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']> = ResolversObject<{
  collaborative?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  public?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  recommendations?: Resolver<Maybe<ResolversTypes['Recommendations']>, ParentType, ContextType, RequireFields<QueryRecommendationsArgs, 'seeds'>>;
}>;

export type RecommendationSeedResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RecommendationSeed'] = ResolversParentTypes['RecommendationSeed']> = ResolversObject<{
  afterFilteringSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  afterRelinkingSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initialPoolSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RecommendationSeedType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecommendationsResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Recommendations'] = ResolversParentTypes['Recommendations']> = ResolversObject<{
  seeds?: Resolver<Array<ResolversTypes['RecommendationSeed']>, ParentType, ContextType>;
  tracks?: Resolver<Array<ResolversTypes['TrackSimplified']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackSimplifiedResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['TrackSimplified'] = ResolversParentTypes['TrackSimplified']> = ResolversObject<{
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['UserFollowers'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFollowersResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['UserFollowers'] = ResolversParentTypes['UserFollowers']> = ResolversObject<{
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ContextValue> = ResolversObject<{
  Artist?: ArtistResolvers<ContextType>;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Playlist?: PlaylistResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecommendationSeed?: RecommendationSeedResolvers<ContextType>;
  Recommendations?: RecommendationsResolvers<ContextType>;
  TrackSimplified?: TrackSimplifiedResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserFollowers?: UserFollowersResolvers<ContextType>;
}>;

