import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { Spotify } from 'spotify-api';
import { FieldConfig as FieldConfigType } from '@shared/field-synthetics';
import { Releasable } from './mappers';
import { ContextValue } from '../types/ContextValue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  ErrorRate: { input: number; output: number };
  Timestamp: { input: unknown; output: unknown };
  _FieldSet: { input: unknown; output: unknown };
};

export type Action =
  | 'interrupting_playback'
  | 'pausing'
  | 'resuming'
  | 'seeking'
  | 'skipping_next'
  | 'skipping_prev'
  | 'toggling_repeat_context'
  | 'toggling_repeat_track'
  | 'toggling_shuffle'
  | 'transferring_playback';

export type Actions = {
  __typename?: 'Actions';
  disallows: Array<Action>;
};

export type Device = {
  __typename?: 'Device';
  /** The device ID */
  id?: Maybe<Scalars['ID']['output']>;
  /** If this device is the currently active device. */
  isActive: Scalars['Boolean']['output'];
  /** If this device is currently in a private session. */
  isPrivateSession: Scalars['Boolean']['output'];
  /**
   * Whether controlling this device is restricted. At present if this is "true",
   * then no Web API commands will be accepted by this device.
   */
  isRestricted: Scalars['Boolean']['output'];
  /**
   * A human-readable name for the device. Some devices have a name that the user
   * can configure (e.g. "Loudest speaker") and some devices have a generic name
   * associated with the manufacturer or device model.
   */
  name: Scalars['String']['output'];
  /** Device type, such as "computer", "smartphone" or "speaker". */
  type: Scalars['String']['output'];
  /**
   * The current volume in percent.
   *
   * >= 0    <= 100
   */
  volumePercent: Scalars['Int']['output'];
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the object.
   */
  spotify?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Pause playback on the user's account. */
  pausePlayback?: Maybe<PausePlaybackResponse>;
  /** Start a new context or resume current playback on the user's active device. */
  resumePlayback?: Maybe<ResumePlaybackPayload>;
  /** Seeks to the given position in the user’s currently playing track. */
  seekToPosition?: Maybe<SeekToPositionResponse>;
  /** Set the repeat mode for the user's playback. */
  setRepeatMode?: Maybe<SetRepeatModeResponse>;
  /** Set the volume for the user’s current playback device. */
  setVolume?: Maybe<SetVolumeResponse>;
  /** Toggle shuffle on or off for user’s playback. */
  shufflePlayback?: Maybe<ShufflePlaybackResponse>;
  /** Skips to next track in the user’s queue. */
  skipToNext?: Maybe<SkipToNextResponse>;
  /** Skips to previous track in the user’s queue. */
  skipToPrevious?: Maybe<SkipToPreviousResponse>;
  /** Transfer playback to a new device and determine if it should start playing. */
  transferPlayback?: Maybe<TransferPlaybackPayload>;
};

export type MutationPausePlaybackArgs = {
  context?: InputMaybe<PausePlaybackContextInput>;
};

export type MutationResumePlaybackArgs = {
  input?: InputMaybe<ResumePlaybackInput>;
};

export type MutationSeekToPositionArgs = {
  context?: InputMaybe<SeekToPositionContextInput>;
  positionMs: Scalars['Int']['input'];
};

export type MutationSetRepeatModeArgs = {
  context?: InputMaybe<SetRepeatModeContextInput>;
  state: RepeatMode;
};

export type MutationSetVolumeArgs = {
  context?: InputMaybe<SetVolumeContextInput>;
  volumePercent: Scalars['Int']['input'];
};

export type MutationShufflePlaybackArgs = {
  context?: InputMaybe<ShufflePlaybackContextInput>;
  state: Scalars['Boolean']['input'];
};

export type MutationSkipToNextArgs = {
  context?: InputMaybe<SkipToNextContextInput>;
};

export type MutationSkipToPreviousArgs = {
  context?: InputMaybe<SkipToPreviousContextInput>;
};

export type MutationTransferPlaybackArgs = {
  input: TransferPlaybackInput;
};

export type PausePlaybackContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['String']['input']>;
};

export type PausePlaybackResponse = {
  __typename?: 'PausePlaybackResponse';
  /** The updated playback state */
  playbackState?: Maybe<PlaybackState>;
};

export type PlaybackContext = {
  __typename?: 'PlaybackContext';
  /** External URLs for this context. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the track. */
  href: Scalars['String']['output'];
  /** The object type, e.g. "artist", "playlist", "album", "show". */
  type: PlaybackContextType;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: Scalars['String']['output'];
};

export type PlaybackContextType =
  | 'album'
  | 'artist'
  | 'audio_features'
  | 'collection'
  | 'collectionyourepisodes'
  | 'episode'
  | 'genre'
  | 'playlist'
  | 'show'
  | 'track'
  | 'user';

export type PlaybackItem = {
  __typename?: 'PlaybackItem';
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playback item.
   */
  id: Scalars['ID']['output'];
};

export type PlaybackState = {
  __typename?: 'PlaybackState';
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: Actions;
  /** A context object. */
  context?: Maybe<PlaybackContext>;
  /** The device that is currently active. */
  device: Device;
  /** If something is currently playing, return `true`. */
  isPlaying: Scalars['Boolean']['output'];
  /** The currently playing track or episode */
  item?: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs?: Maybe<Scalars['Int']['output']>;
  /** off, track, context */
  repeatState: RepeatMode;
  /** If shuffle is on or off. */
  shuffleState: Scalars['Boolean']['output'];
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp']['output'];
};

export type RepeatMode = 'context' | 'off' | 'track';

export type ResumePlaybackInput = {
  /**
   * Spotify URI of the context to play. Valid contexts are albums, artists &
   * playlists.
   */
  contextUri?: InputMaybe<Scalars['String']['input']>;
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * Indicates from where in the context playback should start. Only available when
   * contextUri corresponds to an album or playlist object.
   */
  offset?: InputMaybe<ResumePlaybackOffsetInput>;
  /** Indicates the position where playback should occur in milliseconds. */
  positionMs?: InputMaybe<Scalars['Int']['input']>;
  /** An array of the Spotify track URIs to play. */
  uris?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ResumePlaybackOffsetInput = {
  /**
   * Non-negative, zero-based value that corresponds to the numeric position in the
   * album or playlist
   */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Spotify URI of the item in the album or playlist */
  uri?: InputMaybe<Scalars['String']['input']>;
};

export type ResumePlaybackPayload = {
  __typename?: 'ResumePlaybackPayload';
  playbackState?: Maybe<PlaybackState>;
};

export type SeekToPositionContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SeekToPositionResponse = {
  __typename?: 'SeekToPositionResponse';
  /** The updated state of playback after seeking to a position. */
  playbackState?: Maybe<PlaybackState>;
};

export type SetRepeatModeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SetRepeatModeResponse = {
  __typename?: 'SetRepeatModeResponse';
  /** The updated state of playback after setting a repeat mode. */
  playbackState?: Maybe<PlaybackState>;
};

export type SetVolumeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SetVolumeResponse = {
  __typename?: 'SetVolumeResponse';
  /** The state of playback after the volume has been set. */
  playbackState?: Maybe<PlaybackState>;
};

export type ShufflePlaybackContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type ShufflePlaybackResponse = {
  __typename?: 'ShufflePlaybackResponse';
  /** The state of playback after shuffling playback. */
  playbackState?: Maybe<PlaybackState>;
};

export type SkipToNextContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SkipToNextResponse = {
  __typename?: 'SkipToNextResponse';
  /** The updated state of playback after skipping to next. */
  playbackState?: Maybe<PlaybackState>;
};

export type SkipToPreviousContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SkipToPreviousResponse = {
  __typename?: 'SkipToPreviousResponse';
  /** The updated state of playback after skipping to previous. */
  playbackState?: Maybe<PlaybackState>;
};

export type Subscription = {
  __typename?: 'Subscription';
  playbackStateChanged?: Maybe<PlaybackState>;
};

export type TransferPlaybackInput = {
  /**
   * A list containing the ID of the device on which playback should be
   * started/transferred.
   */
  deviceIds: Array<Scalars['ID']['input']>;
  /**
   * `true`: ensure playback happens on new device.
   * `false` or not provided: keep the current playback state.
   */
  play?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransferPlaybackPayload = {
  __typename?: 'TransferPlaybackPayload';
  /** The state of playback after transferring devices. */
  playbackState?: Maybe<PlaybackState>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
  reference: TReference,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
type NullableCheck<T, S> = Maybe<T> extends T
  ? Maybe<ListCheck<NonNullable<T>, S>>
  : ListCheck<T, S>;
type ListCheck<T, S> = T extends (infer U)[]
  ? NullableCheck<U, S>[]
  : GraphQLRecursivePick<T, S>;
export type GraphQLRecursivePick<T, S> = {
  [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]>;
};

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {},
> = ResolverFn<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Action: Action;
  Actions: ResolverTypeWrapper<Spotify.Object.Actions>;
  Device: ResolverTypeWrapper<Spotify.Object.Device>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ErrorRate: ResolverTypeWrapper<Scalars['ErrorRate']['output']>;
  ExternalUrl: ResolverTypeWrapper<ExternalUrl>;
  Mutation: ResolverTypeWrapper<{}>;
  PausePlaybackContextInput: PausePlaybackContextInput;
  PausePlaybackResponse: ResolverTypeWrapper<
    Omit<PausePlaybackResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  PlaybackContext: ResolverTypeWrapper<Spotify.Object.Context>;
  PlaybackContextType: PlaybackContextType;
  PlaybackItem: ResolverTypeWrapper<
    Spotify.Object.Episode | Spotify.Object.Track
  >;
  PlaybackState: ResolverTypeWrapper<Spotify.Object.PlaybackState>;
  RepeatMode: RepeatMode;
  ResumePlaybackInput: ResumePlaybackInput;
  ResumePlaybackOffsetInput: ResumePlaybackOffsetInput;
  ResumePlaybackPayload: ResolverTypeWrapper<
    Omit<ResumePlaybackPayload, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  SeekToPositionContextInput: SeekToPositionContextInput;
  SeekToPositionResponse: ResolverTypeWrapper<
    Omit<SeekToPositionResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  SetRepeatModeContextInput: SetRepeatModeContextInput;
  SetRepeatModeResponse: ResolverTypeWrapper<
    Omit<SetRepeatModeResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  SetVolumeContextInput: SetVolumeContextInput;
  SetVolumeResponse: ResolverTypeWrapper<
    Omit<SetVolumeResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  ShufflePlaybackContextInput: ShufflePlaybackContextInput;
  ShufflePlaybackResponse: ResolverTypeWrapper<
    Omit<ShufflePlaybackResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  SkipToNextContextInput: SkipToNextContextInput;
  SkipToNextResponse: ResolverTypeWrapper<
    Omit<SkipToNextResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  SkipToPreviousContextInput: SkipToPreviousContextInput;
  SkipToPreviousResponse: ResolverTypeWrapper<
    Omit<SkipToPreviousResponse, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TransferPlaybackInput: TransferPlaybackInput;
  TransferPlaybackPayload: ResolverTypeWrapper<
    Omit<TransferPlaybackPayload, 'playbackState'> & {
      playbackState?: Maybe<ResolversTypes['PlaybackState']>;
    }
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actions: Spotify.Object.Actions;
  Device: Spotify.Object.Device;
  ID: Scalars['ID']['output'];
  Boolean: Scalars['Boolean']['output'];
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  ErrorRate: Scalars['ErrorRate']['output'];
  ExternalUrl: ExternalUrl;
  Mutation: {};
  PausePlaybackContextInput: PausePlaybackContextInput;
  PausePlaybackResponse: Omit<PausePlaybackResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  PlaybackContext: Spotify.Object.Context;
  PlaybackItem: Spotify.Object.Episode | Spotify.Object.Track;
  PlaybackState: Spotify.Object.PlaybackState;
  ResumePlaybackInput: ResumePlaybackInput;
  ResumePlaybackOffsetInput: ResumePlaybackOffsetInput;
  ResumePlaybackPayload: Omit<ResumePlaybackPayload, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  SeekToPositionContextInput: SeekToPositionContextInput;
  SeekToPositionResponse: Omit<SeekToPositionResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  SetRepeatModeContextInput: SetRepeatModeContextInput;
  SetRepeatModeResponse: Omit<SetRepeatModeResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  SetVolumeContextInput: SetVolumeContextInput;
  SetVolumeResponse: Omit<SetVolumeResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  ShufflePlaybackContextInput: ShufflePlaybackContextInput;
  ShufflePlaybackResponse: Omit<ShufflePlaybackResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  SkipToNextContextInput: SkipToNextContextInput;
  SkipToNextResponse: Omit<SkipToNextResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  SkipToPreviousContextInput: SkipToPreviousContextInput;
  SkipToPreviousResponse: Omit<SkipToPreviousResponse, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  TransferPlaybackInput: TransferPlaybackInput;
  TransferPlaybackPayload: Omit<TransferPlaybackPayload, 'playbackState'> & {
    playbackState?: Maybe<ResolversParentTypes['PlaybackState']>;
  };
}>;

export type ContactDirectiveArgs = {
  description?: Maybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  url?: Maybe<Scalars['String']['input']>;
};

export type ContactDirectiveResolver<
  Result,
  Parent,
  ContextType = ContextValue,
  Args = ContactDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SyntheticsDirectiveArgs = {
  enabled?: Maybe<Scalars['Boolean']['input']>;
  errorRate?: Maybe<Scalars['ErrorRate']['input']>;
  timeout?: Maybe<Scalars['Int']['input']>;
};

export type SyntheticsDirectiveResolver<
  Result,
  Parent,
  ContextType = ContextValue,
  Args = SyntheticsDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActionResolvers = {
  INTERRUPTING_PLAYBACK: 'interrupting_playback';
  PAUSING: 'pausing';
  RESUMING: 'resuming';
  SEEKING: 'seeking';
  SKIPPING_NEXT: 'skipping_next';
  SKIPPING_PREV: 'skipping_prev';
  TOGGLING_REPEAT_CONTEXT: 'toggling_repeat_context';
  TOGGLING_REPEAT_TRACK: 'toggling_repeat_track';
  TOGGLING_SHUFFLE: 'toggling_shuffle';
  TRANSFERRING_PLAYBACK: 'transferring_playback';
};

export type ActionsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Actions'] = ResolversParentTypes['Actions'],
> = ResolversObject<{
  disallows?: Resolver<
    Array<ResolversTypes['Action']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeviceResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Device'] = ResolversParentTypes['Device'],
> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPrivateSession?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  isRestricted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volumePercent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ErrorRateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ErrorRate'], any> {
  name: 'ErrorRate';
}

export type ExternalUrlResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl'],
> = ResolversObject<{
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  pausePlayback?: Resolver<
    Maybe<ResolversTypes['PausePlaybackResponse']>,
    ParentType,
    ContextType,
    Partial<MutationPausePlaybackArgs>
  >;
  resumePlayback?: Resolver<
    Maybe<ResolversTypes['ResumePlaybackPayload']>,
    ParentType,
    ContextType,
    Partial<MutationResumePlaybackArgs>
  >;
  seekToPosition?: Resolver<
    Maybe<ResolversTypes['SeekToPositionResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationSeekToPositionArgs, 'positionMs'>
  >;
  setRepeatMode?: Resolver<
    Maybe<ResolversTypes['SetRepeatModeResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationSetRepeatModeArgs, 'state'>
  >;
  setVolume?: Resolver<
    Maybe<ResolversTypes['SetVolumeResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationSetVolumeArgs, 'volumePercent'>
  >;
  shufflePlayback?: Resolver<
    Maybe<ResolversTypes['ShufflePlaybackResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationShufflePlaybackArgs, 'state'>
  >;
  skipToNext?: Resolver<
    Maybe<ResolversTypes['SkipToNextResponse']>,
    ParentType,
    ContextType,
    Partial<MutationSkipToNextArgs>
  >;
  skipToPrevious?: Resolver<
    Maybe<ResolversTypes['SkipToPreviousResponse']>,
    ParentType,
    ContextType,
    Partial<MutationSkipToPreviousArgs>
  >;
  transferPlayback?: Resolver<
    Maybe<ResolversTypes['TransferPlaybackPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationTransferPlaybackArgs, 'input'>
  >;
}>;

export type PausePlaybackResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PausePlaybackResponse'] = ResolversParentTypes['PausePlaybackResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaybackContextResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaybackContext'] = ResolversParentTypes['PlaybackContext'],
> = ResolversObject<{
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['PlaybackContextType'],
    ParentType,
    ContextType
  >;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaybackContextTypeResolvers = {
  ALBUM: 'album';
  ARTIST: 'artist';
  AUDIO_FEATURES: 'audio_features';
  COLLECTION: 'collection';
  COLLECTION_YOUR_EPISODES: 'collectionyourepisodes';
  EPISODE: 'episode';
  GENRE: 'genre';
  PLAYLIST: 'playlist';
  SHOW: 'show';
  TRACK: 'track';
  USER: 'user';
};

export type PlaybackItemResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaybackItem'] = ResolversParentTypes['PlaybackItem'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['PlaybackItem']>,
    { __typename: 'PlaybackItem' } & GraphQLRecursivePick<
      ParentType,
      { id: true }
    >,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaybackStateResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaybackState'] = ResolversParentTypes['PlaybackState'],
> = ResolversObject<{
  actions?: Resolver<ResolversTypes['Actions'], ParentType, ContextType>;
  context?: Resolver<
    Maybe<ResolversTypes['PlaybackContext']>,
    ParentType,
    ContextType
  >;
  device?: Resolver<ResolversTypes['Device'], ParentType, ContextType>;
  isPlaying?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  item?: Resolver<
    Maybe<ResolversTypes['PlaybackItem']>,
    ParentType,
    ContextType
  >;
  progressMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repeatState?: Resolver<ResolversTypes['RepeatMode'], ParentType, ContextType>;
  shuffleState?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepeatModeResolvers = {
  CONTEXT: 'context';
  OFF: 'off';
  TRACK: 'track';
};

export type ResumePlaybackPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ResumePlaybackPayload'] = ResolversParentTypes['ResumePlaybackPayload'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SeekToPositionResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SeekToPositionResponse'] = ResolversParentTypes['SeekToPositionResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetRepeatModeResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SetRepeatModeResponse'] = ResolversParentTypes['SetRepeatModeResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetVolumeResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SetVolumeResponse'] = ResolversParentTypes['SetVolumeResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShufflePlaybackResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ShufflePlaybackResponse'] = ResolversParentTypes['ShufflePlaybackResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SkipToNextResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SkipToNextResponse'] = ResolversParentTypes['SkipToNextResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SkipToPreviousResponseResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SkipToPreviousResponse'] = ResolversParentTypes['SkipToPreviousResponse'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = ResolversObject<{
  playbackStateChanged?: SubscriptionResolver<
    Maybe<ResolversTypes['PlaybackState']>,
    'playbackStateChanged',
    ParentType,
    ContextType
  >;
}>;

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TransferPlaybackPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TransferPlaybackPayload'] = ResolversParentTypes['TransferPlaybackPayload'],
> = ResolversObject<{
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ContextValue> = ResolversObject<{
  Action?: ActionResolvers;
  Actions?: ActionsResolvers<ContextType>;
  Device?: DeviceResolvers<ContextType>;
  ErrorRate?: GraphQLScalarType;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PausePlaybackResponse?: PausePlaybackResponseResolvers<ContextType>;
  PlaybackContext?: PlaybackContextResolvers<ContextType>;
  PlaybackContextType?: PlaybackContextTypeResolvers;
  PlaybackItem?: PlaybackItemResolvers<ContextType>;
  PlaybackState?: PlaybackStateResolvers<ContextType>;
  RepeatMode?: RepeatModeResolvers;
  ResumePlaybackPayload?: ResumePlaybackPayloadResolvers<ContextType>;
  SeekToPositionResponse?: SeekToPositionResponseResolvers<ContextType>;
  SetRepeatModeResponse?: SetRepeatModeResponseResolvers<ContextType>;
  SetVolumeResponse?: SetVolumeResponseResolvers<ContextType>;
  ShufflePlaybackResponse?: ShufflePlaybackResponseResolvers<ContextType>;
  SkipToNextResponse?: SkipToNextResponseResolvers<ContextType>;
  SkipToPreviousResponse?: SkipToPreviousResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TransferPlaybackPayload?: TransferPlaybackPayloadResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ContextValue> = ResolversObject<{
  contact?: ContactDirectiveResolver<any, any, ContextType>;
  synthetics?: SyntheticsDirectiveResolver<any, any, ContextType>;
}>;
