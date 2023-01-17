import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Spotify } from '../dataSources/spotify.types';
import { FieldConfig as FieldConfigType } from '../fieldConfigs/fieldConfig';
import { Releasable } from './mappers';
import { ContextValue } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  ErrorRate: number;
  Timestamp: unknown;
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

export type AddItemToPlaybackQueueContextInput = {
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type AddItemToPlaybackQueueResponse = {
  __typename?: 'AddItemToPlaybackQueueResponse';
  queue?: Maybe<PlaybackQueue>;
};

/** Spotify catalog information for an album. */
export type Album = {
  __typename?: 'Album';
  /** The type of the album. */
  albumType: AlbumType;
  /** The artists of the album. */
  artists: Array<Artist>;
  /** The copyrights for the album. */
  copyrights: Array<Copyright>;
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
  label?: Maybe<Scalars['String']>;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: Scalars['String'];
  /** The date the album was first released. */
  releaseDate: ReleaseDate;
  /** The number of tracks in the album. */
  totalTracks: Scalars['Int'];
  /** The tracks of the album. */
  tracks?: Maybe<AlbumTrackConnection>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: Scalars['String'];
};


/** Spotify catalog information for an album. */
export type AlbumTracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type AlbumGroup =
  | 'album'
  | 'appears_on'
  | 'compilation'
  | 'single';

export type AlbumTrackConnection = {
  __typename?: 'AlbumTrackConnection';
  /** The set of tracks. */
  edges: Array<AlbumTrackEdge>;
  /** Pagination information for the set of tracks. */
  pageInfo: PageInfo;
};

export type AlbumTrackEdge = {
  __typename?: 'AlbumTrackEdge';
  /** The track on the album */
  node: Track;
};

export type AlbumType =
  | 'album'
  | 'compilation'
  | 'single';

/** Spotify catalog information for an artist. */
export type Artist = {
  __typename?: 'Artist';
  /** Spotify catalog information about an artist's albums. */
  albums?: Maybe<ArtistAlbumsConnection>;
  /** Known external URLs for this artist. */
  externalUrls: ExternalUrl;
  /** Information about the followers of the artist. */
  followers: Followers;
  /**
   * A list of the genres the artist is associated with. If not yet classified, the
   * array is empty.
   */
  genres: Array<Scalars['String']>;
  /** A link to the Web API endpoint providing full details of the artist. */
  href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: Scalars['ID'];
  /** Images of the artist in various sizes, widest first. */
  images: Array<Image>;
  /** The name of the artist. */
  name: Scalars['String'];
  /**
   * The popularity of the artist. The value will be between 0 and 100, with 100
   * being the most popular. The artist's popularity is calculated from the
   * popularity of all the artist's tracks.
   */
  popularity: Scalars['Int'];
  /**
   * Spotify catalog information about artists similar to a given artist.
   * Similarity is based on analysis of the Spotify community's
   * [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
   */
  relatedArtists: Array<Artist>;
  /** Spotify catalog information about an artist's top tracks. */
  topTracks: Array<Track>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  uri?: Maybe<Scalars['String']>;
};


/** Spotify catalog information for an artist. */
export type ArtistAlbumsArgs = {
  includeGroups?: InputMaybe<Array<AlbumGroup>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ArtistAlbumEdge = {
  __typename?: 'ArtistAlbumEdge';
  /** The album group this album belongs to. */
  albumGroup: AlbumGroup;
  /** Spotify catalog information for the album. */
  node: Album;
};

export type ArtistAlbumsConnection = {
  __typename?: 'ArtistAlbumsConnection';
  /** A list of albums that belong to the artist. */
  edges: Array<ArtistAlbumEdge>;
  /** "Pagination information for the set of albums" */
  pageInfo: PageInfo;
};

export type Contains = {
  __typename?: 'Contains';
  /**
   * List of booleans in order of albums requested. `true` means the album is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  albums?: Maybe<Array<Scalars['Boolean']>>;
  /**
   * List of booleans in order of episodes requested. `true` means the episode is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  episodes?: Maybe<Array<Scalars['Boolean']>>;
  /**
   * List of booleans in order of shows requested. `true` means the show is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  shows?: Maybe<Array<Scalars['Boolean']>>;
  /**
   * List of booleans in order of tracks requested. `true` means the track is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  tracks?: Maybe<Array<Scalars['Boolean']>>;
};

export type Copyright = {
  __typename?: 'Copyright';
  /** The copyright text for this content. */
  text: Scalars['String'];
  /**
   * The type of copyright: `C` = the copyright, `P` = the sound recording
   * (performance) copyright.
   */
  type?: Maybe<CopyrightType>;
};

export type CopyrightType =
  /** The copyright */
  | 'C'
  /** The sound recording (performance) copyright. */
  | 'P';

export type CurrentUser = {
  __typename?: 'CurrentUser';
  /** Check if one or mote items are already saved in the Spotify user's library. */
  contains?: Maybe<Contains>;
  /** Get the list of objects that make up the user's queue. */
  playbackQueue?: Maybe<PlaybackQueue>;
  /** Information about the user's current playback state */
  player: Player;
  /** Playlists owned or followed by the current Spotify user. */
  playlists?: Maybe<PlaylistConnection>;
  tracks?: Maybe<SavedTrackConnection>;
  /** Detailed profile information about the current user. */
  user: User;
};


export type CurrentUserContainsArgs = {
  albums?: InputMaybe<Array<Scalars['ID']>>;
  episodes?: InputMaybe<Array<Scalars['ID']>>;
  shows?: InputMaybe<Array<Scalars['ID']>>;
  tracks?: InputMaybe<Array<Scalars['ID']>>;
};


export type CurrentUserPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUserTracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type CurrentlyPlaying = {
  __typename?: 'CurrentlyPlaying';
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: Actions;
  /** A context object. */
  context?: Maybe<PlaybackContext>;
  /** If something is currently playing, return `true`. */
  isPlaying: Scalars['Boolean'];
  /** The currently playing track or episode */
  item?: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs?: Maybe<Scalars['Int']>;
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp'];
};

export type Device = {
  __typename?: 'Device';
  /** The device ID */
  id: Scalars['ID'];
  /** If this device is the currently active device. */
  isActive: Scalars['Boolean'];
  /** If this device is currently in a private session. */
  isPrivateSession: Scalars['Boolean'];
  /**
   * Whether controlling this device is restricted. At present if this is "true",
   * then no Web API commands will be accepted by this device.
   */
  isRestricted: Scalars['Boolean'];
  /**
   * A human-readable name for the device. Some devices have a name that the user
   * can configure (e.g. "Loudest speaker") and some devices have a generic name
   * associated with the manufacturer or device model.
   */
  name: Scalars['String'];
  /** Device type, such as "computer", "smartphone" or "speaker". */
  type: Scalars['String'];
  /**
   * The current volume in percent.
   *
   * >= 0    <= 100
   */
  volumePercent: Scalars['Int'];
};

/** Spotify catalog information for an episode. */
export type Episode = PlaybackItem & PlaylistTrack & {
  __typename?: 'Episode';
  /** A URL to a 30 second preview (MP3 format) of the episode. `null` if not available. */
  audioPreviewUrl?: Maybe<Scalars['String']>;
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
  releaseDate: ReleaseDate;
  /** The user's most recent position in the episode. */
  resumePoint: ResumePoint;
  /** The show containing the episode. */
  show: Show;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: Scalars['String'];
};


/** Spotify catalog information for an episode. */
export type EpisodeDescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the object.
   */
  spotify?: Maybe<Scalars['String']>;
};

export type FeaturedPlaylistConnection = {
  __typename?: 'FeaturedPlaylistConnection';
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify player's
   * 'Browse' tab).
   */
  edges: Array<FeaturedPlaylistEdge>;
  message: Scalars['String'];
  /** Pagination information for the set of playlists */
  pageInfo: PageInfo;
};

export type FeaturedPlaylistEdge = {
  __typename?: 'FeaturedPlaylistEdge';
  node: Playlist;
};

export type FieldConfig = {
  __typename?: 'FieldConfig';
  /** The synthetic error rate configured for the field. */
  errorRate: Scalars['ErrorRate'];
  /** The schema field that includes this config */
  schemaField: SchemaField;
  /** The synthetic timeout configured for the field. */
  timeout: Scalars['Int'];
};

export type FieldConfigInput = {
  /**
   * The synthetic error rate configured for a field. This should be a value
   * between `0` and `1` where `0` means no synthetic errors should be thrown and
   * `1` means errors should be thrown 100% of the time. Set to `null` to reset the
   * value back to its default. Omit this field to maintain its value. Defaults to
   * `0`.
   */
  errorRate?: InputMaybe<Scalars['ErrorRate']>;
  /**
   * The synthetic timeout configured for a field. Set to `null` to reset the value
   * back to its default. Omit this field to maintain its value. Defaults to `0`.
   */
  timeout?: InputMaybe<Scalars['Int']>;
};

export type FieldInput = {
  /**
   * Configure a field by its type in the schema. This will apply the config to all
   * fields of the given type regardless of where it is queried in the scheam.
   *
   * One of `path` or `schema` is required. If both are provided, `schema` will
   * take precendence as it has broader impact.
   */
  schemaField?: InputMaybe<SchemaFieldInput>;
};

export type Followers = {
  __typename?: 'Followers';
  /** The total number of followers. */
  total: Scalars['Int'];
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

export type Mutation = {
  __typename?: 'Mutation';
  /** Add an item to the end of the user's current playback queue. */
  addItemToPlaybackQueue?: Maybe<AddItemToPlaybackQueueResponse>;
  /** Pause playback on the user's account. */
  pausePlayback?: Maybe<PausePlaybackResponse>;
  /** Reset a field's config back to its default values. */
  resetFieldConfig?: Maybe<ResetFieldConfigResponse>;
  /** Start a new context or resume current playback on the user's active device. */
  resumePlayback?: Maybe<ResumePlaybackResponse>;
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
  /**
   * Update configuration for a field in the schema. Allows tweaks to the
   * synthetic timeouts and error rates associated with the field. By default, both
   * the timeout and error rate are set to 0.
   */
  updateFieldConfig?: Maybe<UpdateFieldConfigResponse>;
};


export type MutationAddItemToPlaybackQueueArgs = {
  context?: InputMaybe<AddItemToPlaybackQueueContextInput>;
  uri: Scalars['String'];
};


export type MutationPausePlaybackArgs = {
  context?: InputMaybe<PausePlaybackContextInput>;
};


export type MutationResetFieldConfigArgs = {
  field: FieldInput;
};


export type MutationResumePlaybackArgs = {
  context?: InputMaybe<ResumePlaybackContextInput>;
};


export type MutationSeekToPositionArgs = {
  context?: InputMaybe<SeekToPositionContextInput>;
  positionMs: Scalars['Int'];
};


export type MutationSetRepeatModeArgs = {
  context?: InputMaybe<SetRepeatModeContextInput>;
  state: RepeatMode;
};


export type MutationSetVolumeArgs = {
  context?: InputMaybe<SetVolumeContextInput>;
  volumePercent: Scalars['Int'];
};


export type MutationShufflePlaybackArgs = {
  context?: InputMaybe<ShufflePlaybackContextInput>;
  state: Scalars['Boolean'];
};


export type MutationSkipToNextArgs = {
  context?: InputMaybe<SkipToNextContextInput>;
};


export type MutationSkipToPreviousArgs = {
  context?: InputMaybe<SkipToPreviousContextInput>;
};


export type MutationUpdateFieldConfigArgs = {
  config: FieldConfigInput;
  field: FieldInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
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

export type PausePlaybackContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['String']>;
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
  href: Scalars['String'];
  /** The object type, e.g. "artist", "playlist", "album", "show". */
  type: PlaybackContextType;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: Scalars['String'];
};

export type PlaybackContextType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'show';

export type PlaybackItem = {
  /** The duration for the playback item in milliseconds. */
  durationMs: Scalars['Int'];
  /** Known external URLs for this playback item. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the playlist item. */
  href: Scalars['String'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playback item.
   */
  id: Scalars['ID'];
  /** The name of the playlist item. */
  name: Scalars['String'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: Scalars['String'];
};

export type PlaybackQueue = {
  __typename?: 'PlaybackQueue';
  currentlyPlaying?: Maybe<PlaybackItem>;
  queue: Array<PlaybackItem>;
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
  isPlaying: Scalars['Boolean'];
  /** The currently playing track or episode */
  item?: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs?: Maybe<Scalars['Int']>;
  /** off, track, context */
  repeatState: RepeatMode;
  /** If shuffle is on or off. */
  shuffleState: Scalars['Boolean'];
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp'];
};

export type Player = {
  __typename?: 'Player';
  /** Information about the object currently being played on the user's Spotify account. */
  currentlyPlaying?: Maybe<CurrentlyPlaying>;
  /** Information about a user's available devices. */
  devices?: Maybe<Array<Device>>;
  /**
   * Information about the user's current playback state, including track or
   * episode, progress, and active device.
   */
  playbackState?: Maybe<PlaybackState>;
};

/** Information about a playlist owned by a Spotify user */
export type Playlist = {
  __typename?: 'Playlist';
  /** `true` if the owner allows other users to modify the playlist. */
  collaborative: Scalars['Boolean'];
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  description?: Maybe<Scalars['String']>;
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
  images: Array<Image>;
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
  /** The tracks of the playlist. */
  tracks: PlaylistTrackConnection;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  uri: Scalars['String'];
};


/** Information about a playlist owned by a Spotify user */
export type PlaylistTracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** A paged set of playlists */
export type PlaylistConnection = {
  __typename?: 'PlaylistConnection';
  /** The set of playlists. */
  edges: Array<PlaylistEdge>;
  /** Pagination information for the set of playlists */
  pageInfo: PageInfo;
};

export type PlaylistEdge = {
  __typename?: 'PlaylistEdge';
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
  __typename?: 'PlaylistTrackConnection';
  /** Pagination information for the tracks belonging to a playlist */
  edges: Array<PlaylistTrackEdge>;
  /** Pagination information for the tracks belonging to a playlist */
  pageInfo: PageInfo;
};

export type PlaylistTrackEdge = {
  __typename?: 'PlaylistTrackEdge';
  /** The date and time the track was added to the playlist */
  addedAt?: Maybe<Scalars['DateTime']>;
  /** The user that added the track to the playlist */
  addedBy: User;
  /** The playlist track */
  node: PlaylistTrack;
};

export type Query = {
  __typename?: 'Query';
  /** Spotify catalog information for an album. */
  album?: Maybe<Album>;
  /** Spotify catalog information for an artist. */
  artist?: Maybe<Artist>;
  /**
   * Get Spotify catalog information for a single episode identified by its unique
   * Spotify ID.
   */
  episode?: Maybe<Episode>;
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify
   * player's 'Browse' tab).
   */
  featuredPlaylists?: Maybe<FeaturedPlaylistConnection>;
  /**
   * A list of available genres seed parameter values for
   * [recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations).
   */
  genres: Array<Scalars['String']>;
  /** Information about the current logged-in user. */
  me?: Maybe<CurrentUser>;
  /** A playlist owned by a Spotify user. */
  playlist?: Maybe<Playlist>;
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
  recommendations?: Maybe<Recommendations>;
  /**
   * Get Spotify catalog information for a single show identified by its unique
   * Spotify ID.
   */
  show?: Maybe<Show>;
  /**
   * Get Spotify catalog information for a single track identified by its unique
   * Spotify ID.
   */
  track?: Maybe<Track>;
};


export type QueryAlbumArgs = {
  id: Scalars['ID'];
};


export type QueryArtistArgs = {
  id: Scalars['ID'];
};


export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryFeaturedPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['DateTime']>;
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryRecommendationsArgs = {
  seeds: RecommendationSeedInput;
};


export type QueryShowArgs = {
  id: Scalars['ID'];
};


export type QueryTrackArgs = {
  id: Scalars['ID'];
};

/** Information about a recommendation [seed object](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
export type RecommendationSeed = {
  __typename?: 'RecommendationSeed';
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
  href?: Maybe<Scalars['String']>;
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
export type RecommendationSeedType =
  | 'ARTIST'
  | 'GENRE'
  | 'TRACK';

/** Information about recommendations for the current user */
export type Recommendations = {
  __typename?: 'Recommendations';
  /** An array of recommendation [seed objects](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
  seeds: Array<RecommendationSeed>;
  /**
   * An array of [track object (simplified)](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedtrackobject)
   * ordered according to the parameters supplied.
   */
  tracks: Array<Track>;
};

export type ReleaseDate = {
  __typename?: 'ReleaseDate';
  /**
   * The date the item was first released, for example `1981-12-15`. Depending on
   * the precision, it might be shown as `1981-12`, or `1981-12-15`.
   */
  date: Scalars['String'];
  /** The precision with which the `date` value is known. */
  precision: ReleaseDatePrecision;
};

export type ReleaseDatePrecision =
  | 'day'
  | 'month'
  | 'year';

export type RepeatMode =
  | 'context'
  | 'off'
  | 'track';

export type ResetFieldConfigResponse = {
  __typename?: 'ResetFieldConfigResponse';
  /** The updated field config */
  fieldConfig?: Maybe<FieldConfig>;
};

export type ResumePlaybackContextInput = {
  /**
   * Spotify URI of the context to play. Valid contexts are albums, artists &
   * playlists.
   */
  contextUri?: InputMaybe<Scalars['String']>;
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']>;
  /**
   * Indicates from where in the context playback should start. Only available when
   * contextUri corresponds to an album or playlist object.
   */
  offset?: InputMaybe<ResumePlaybackOffsetInput>;
  /** Indicates the position where playback should occur in milliseconds. */
  positionMs?: InputMaybe<Scalars['Int']>;
  /** An array of the Spotify track URIs to play. */
  uris?: InputMaybe<Array<Scalars['String']>>;
};

export type ResumePlaybackOffsetInput = {
  /**
   * Non-negative, zero-based value that corresponds to the numeric position in the
   * album or playlist
   */
  position?: InputMaybe<Scalars['Int']>;
  /** Spotify URI of the item in the album or playlist */
  uri?: InputMaybe<Scalars['String']>;
};

export type ResumePlaybackResponse = {
  __typename?: 'ResumePlaybackResponse';
  playbackState?: Maybe<PlaybackState>;
};

export type ResumePoint = {
  __typename?: 'ResumePoint';
  /** Whether or not the episode has been fully played by the user. */
  fullyPlayed: Scalars['Boolean'];
  /** The user's most recent position in the episode in milliseconds. */
  resumePositionMs: Scalars['Int'];
};

export type SavedTrackConnection = {
  __typename?: 'SavedTrackConnection';
  /** A list of saved tracks. */
  edges: Array<SavedTrackEdge>;
  /** "Pagination information for the set of playlists" */
  pageInfo: PageInfo;
};

export type SavedTrackEdge = {
  __typename?: 'SavedTrackEdge';
  /** The date the track was saved. */
  addedAt: Scalars['DateTime'];
  /** The track */
  node: Track;
};

export type SchemaField = {
  __typename?: 'SchemaField';
  /** The name of the field in the type (ex: `firstName`) */
  fieldName: Scalars['String'];
  /** The parent type name in the schema (ex: `User`) */
  typename: Scalars['String'];
};

export type SchemaFieldInput = {
  /** The name of the field in the type (ex: `firstName`) */
  fieldName: Scalars['String'];
  /** The parent type name in the schema (ex: `User`) */
  typename: Scalars['String'];
};

export type SeekToPositionContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SeekToPositionResponse = {
  __typename?: 'SeekToPositionResponse';
  /** The updated state of playback after seeking to a position. */
  playbackState?: Maybe<PlaybackState>;
};

export type SetRepeatModeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SetRepeatModeResponse = {
  __typename?: 'SetRepeatModeResponse';
  /** The updated state of playback after setting a repeat mode. */
  playbackState?: Maybe<PlaybackState>;
};

export type SetVolumeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SetVolumeResponse = {
  __typename?: 'SetVolumeResponse';
  /** The state of playback after the volume has been set. */
  playbackState?: Maybe<PlaybackState>;
};

/** Spotify catalog information for a show. */
export type Show = {
  __typename?: 'Show';
  /** A description of the show. */
  description: Scalars['String'];
  /** Spotify catalog information about an show’s episodes. */
  episodes?: Maybe<ShowEpisodesConnection>;
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
  isExternallyHosted?: Maybe<Scalars['Boolean']>;
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
export type ShowDescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};


/** Spotify catalog information for a show. */
export type ShowEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ShowEpisodeEdge = {
  __typename?: 'ShowEpisodeEdge';
  /** The episode */
  node: Episode;
};

export type ShowEpisodesConnection = {
  __typename?: 'ShowEpisodesConnection';
  /** A list of episodes for the show. */
  edges: Array<ShowEpisodeEdge>;
  /** Pagination information for the set of episodes */
  pageInfo: PageInfo;
};

export type ShufflePlaybackContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']>;
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
  deviceId?: InputMaybe<Scalars['ID']>;
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
  deviceId?: InputMaybe<Scalars['ID']>;
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

export type TextFormat =
  | 'HTML'
  | 'PLAIN';

/** Spotify catalog information for a track. */
export type Track = PlaybackItem & PlaylistTrack & {
  __typename?: 'Track';
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
  externalIds?: Maybe<TrackExternalIds>;
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
  previewUrl?: Maybe<Scalars['String']>;
  /**
   * The number of the track. If an album has several discs, the track number is
   * the number on the specified disc.
   */
  trackNumber?: Maybe<Scalars['Int']>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the track.
   */
  uri: Scalars['String'];
};

export type TrackExternalIds = {
  __typename?: 'TrackExternalIds';
  /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
  ean?: Maybe<Scalars['String']>;
  /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
  isrc?: Maybe<Scalars['String']>;
  /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
  upc?: Maybe<Scalars['String']>;
};

export type UpdateFieldConfigResponse = {
  __typename?: 'UpdateFieldConfigResponse';
  /** The updated field config */
  fieldConfig?: Maybe<FieldConfig>;
};

/** Public profile information about a Spotify user. */
export type User = {
  __typename?: 'User';
  /** The name displayed on the user's profile. `null` if not available. */
  displayName?: Maybe<Scalars['String']>;
  /** Known public external URLs for this user. */
  externalUrls: ExternalUrl;
  /** Information about the followers of this user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  id: Scalars['ID'];
  /** The user's profile image. */
  images?: Maybe<Array<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  uri: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

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
  Action: Action;
  Actions: ResolverTypeWrapper<Spotify.Object.Actions>;
  AddItemToPlaybackQueueContextInput: AddItemToPlaybackQueueContextInput;
  AddItemToPlaybackQueueResponse: ResolverTypeWrapper<Omit<AddItemToPlaybackQueueResponse, 'queue'> & { queue?: Maybe<ResolversTypes['PlaybackQueue']> }>;
  Album: ResolverTypeWrapper<Spotify.Object.Album | Spotify.Object.AlbumSimplified>;
  AlbumGroup: AlbumGroup;
  AlbumTrackConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.TrackSimplified>>;
  AlbumTrackEdge: ResolverTypeWrapper<Spotify.Object.TrackSimplified>;
  AlbumType: AlbumType;
  Artist: ResolverTypeWrapper<Spotify.Object.Artist>;
  ArtistAlbumEdge: ResolverTypeWrapper<Spotify.Object.AlbumSimplified>;
  ArtistAlbumsConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Contains: ResolverTypeWrapper<Contains>;
  Copyright: ResolverTypeWrapper<Copyright>;
  CopyrightType: CopyrightType;
  CurrentUser: ResolverTypeWrapper<Spotify.Object.CurrentUser>;
  CurrentlyPlaying: ResolverTypeWrapper<Spotify.Object.CurrentlyPlaying>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Device: ResolverTypeWrapper<Spotify.Object.Device>;
  Episode: ResolverTypeWrapper<Spotify.Object.Episode | Spotify.Object.EpisodeSimplified>;
  ErrorRate: ResolverTypeWrapper<Scalars['ErrorRate']>;
  ExternalUrl: ResolverTypeWrapper<ExternalUrl>;
  FeaturedPlaylistConnection: ResolverTypeWrapper<Spotify.Object.FeaturedPlaylists>;
  FeaturedPlaylistEdge: ResolverTypeWrapper<Spotify.Object.PlaylistSimplified>;
  FieldConfig: ResolverTypeWrapper<FieldConfigType>;
  FieldConfigInput: FieldConfigInput;
  FieldInput: FieldInput;
  Followers: ResolverTypeWrapper<Followers>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<Spotify.Object.Paginated<unknown>>;
  PausePlaybackContextInput: PausePlaybackContextInput;
  PausePlaybackResponse: ResolverTypeWrapper<Omit<PausePlaybackResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  PlaybackContext: ResolverTypeWrapper<Spotify.Object.Context>;
  PlaybackContextType: PlaybackContextType;
  PlaybackItem: ResolverTypeWrapper<Spotify.Object.Episode | Spotify.Object.Track>;
  PlaybackQueue: ResolverTypeWrapper<Spotify.Object.PlaybackQueue>;
  PlaybackState: ResolverTypeWrapper<Spotify.Object.PlaybackState>;
  Player: ResolverTypeWrapper<{}>;
  Playlist: ResolverTypeWrapper<Spotify.Object.Playlist | Spotify.Object.PlaylistSimplified>;
  PlaylistConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.Playlist>>;
  PlaylistEdge: ResolverTypeWrapper<Spotify.Object.Playlist>;
  PlaylistTrack: ResolverTypeWrapper<Spotify.Object.Track | Spotify.Object.Episode>;
  PlaylistTrackConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.PlaylistTrack>>;
  PlaylistTrackEdge: ResolverTypeWrapper<Spotify.Object.PlaylistTrack>;
  Query: ResolverTypeWrapper<{}>;
  RecommendationSeed: ResolverTypeWrapper<RecommendationSeed>;
  RecommendationSeedInput: RecommendationSeedInput;
  RecommendationSeedType: RecommendationSeedType;
  Recommendations: ResolverTypeWrapper<Spotify.Object.Recommendations>;
  ReleaseDate: ResolverTypeWrapper<Releasable>;
  ReleaseDatePrecision: ReleaseDatePrecision;
  RepeatMode: RepeatMode;
  ResetFieldConfigResponse: ResolverTypeWrapper<Omit<ResetFieldConfigResponse, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversTypes['FieldConfig']> }>;
  ResumePlaybackContextInput: ResumePlaybackContextInput;
  ResumePlaybackOffsetInput: ResumePlaybackOffsetInput;
  ResumePlaybackResponse: ResolverTypeWrapper<Omit<ResumePlaybackResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  ResumePoint: ResolverTypeWrapper<Spotify.Object.ResumePoint>;
  SavedTrackConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.SavedTrack>>;
  SavedTrackEdge: ResolverTypeWrapper<Spotify.Object.SavedTrack>;
  SchemaField: ResolverTypeWrapper<SchemaField>;
  SchemaFieldInput: SchemaFieldInput;
  SeekToPositionContextInput: SeekToPositionContextInput;
  SeekToPositionResponse: ResolverTypeWrapper<Omit<SeekToPositionResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  SetRepeatModeContextInput: SetRepeatModeContextInput;
  SetRepeatModeResponse: ResolverTypeWrapper<Omit<SetRepeatModeResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  SetVolumeContextInput: SetVolumeContextInput;
  SetVolumeResponse: ResolverTypeWrapper<Omit<SetVolumeResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  Show: ResolverTypeWrapper<Spotify.Object.Show | Spotify.Object.ShowSimplified>;
  ShowEpisodeEdge: ResolverTypeWrapper<Spotify.Object.EpisodeSimplified>;
  ShowEpisodesConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>>;
  ShufflePlaybackContextInput: ShufflePlaybackContextInput;
  ShufflePlaybackResponse: ResolverTypeWrapper<Omit<ShufflePlaybackResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  SkipToNextContextInput: SkipToNextContextInput;
  SkipToNextResponse: ResolverTypeWrapper<Omit<SkipToNextResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  SkipToPreviousContextInput: SkipToPreviousContextInput;
  SkipToPreviousResponse: ResolverTypeWrapper<Omit<SkipToPreviousResponse, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TextFormat: TextFormat;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  Track: ResolverTypeWrapper<Spotify.Object.Track | Spotify.Object.TrackSimplified>;
  TrackExternalIds: ResolverTypeWrapper<TrackExternalIds>;
  UpdateFieldConfigResponse: ResolverTypeWrapper<Omit<UpdateFieldConfigResponse, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversTypes['FieldConfig']> }>;
  User: ResolverTypeWrapper<Spotify.Object.User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actions: Spotify.Object.Actions;
  AddItemToPlaybackQueueContextInput: AddItemToPlaybackQueueContextInput;
  AddItemToPlaybackQueueResponse: Omit<AddItemToPlaybackQueueResponse, 'queue'> & { queue?: Maybe<ResolversParentTypes['PlaybackQueue']> };
  Album: Spotify.Object.Album | Spotify.Object.AlbumSimplified;
  AlbumTrackConnection: Spotify.Object.Paginated<Spotify.Object.TrackSimplified>;
  AlbumTrackEdge: Spotify.Object.TrackSimplified;
  Artist: Spotify.Object.Artist;
  ArtistAlbumEdge: Spotify.Object.AlbumSimplified;
  ArtistAlbumsConnection: Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>;
  Boolean: Scalars['Boolean'];
  Contains: Contains;
  Copyright: Copyright;
  CurrentUser: Spotify.Object.CurrentUser;
  CurrentlyPlaying: Spotify.Object.CurrentlyPlaying;
  DateTime: Scalars['DateTime'];
  Device: Spotify.Object.Device;
  Episode: Spotify.Object.Episode | Spotify.Object.EpisodeSimplified;
  ErrorRate: Scalars['ErrorRate'];
  ExternalUrl: ExternalUrl;
  FeaturedPlaylistConnection: Spotify.Object.FeaturedPlaylists;
  FeaturedPlaylistEdge: Spotify.Object.PlaylistSimplified;
  FieldConfig: FieldConfigType;
  FieldConfigInput: FieldConfigInput;
  FieldInput: FieldInput;
  Followers: Followers;
  ID: Scalars['ID'];
  Image: Image;
  Int: Scalars['Int'];
  Mutation: {};
  PageInfo: Spotify.Object.Paginated<unknown>;
  PausePlaybackContextInput: PausePlaybackContextInput;
  PausePlaybackResponse: Omit<PausePlaybackResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  PlaybackContext: Spotify.Object.Context;
  PlaybackItem: Spotify.Object.Episode | Spotify.Object.Track;
  PlaybackQueue: Spotify.Object.PlaybackQueue;
  PlaybackState: Spotify.Object.PlaybackState;
  Player: {};
  Playlist: Spotify.Object.Playlist | Spotify.Object.PlaylistSimplified;
  PlaylistConnection: Spotify.Object.Paginated<Spotify.Object.Playlist>;
  PlaylistEdge: Spotify.Object.Playlist;
  PlaylistTrack: Spotify.Object.Track | Spotify.Object.Episode;
  PlaylistTrackConnection: Spotify.Object.Paginated<Spotify.Object.PlaylistTrack>;
  PlaylistTrackEdge: Spotify.Object.PlaylistTrack;
  Query: {};
  RecommendationSeed: RecommendationSeed;
  RecommendationSeedInput: RecommendationSeedInput;
  Recommendations: Spotify.Object.Recommendations;
  ReleaseDate: Releasable;
  ResetFieldConfigResponse: Omit<ResetFieldConfigResponse, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversParentTypes['FieldConfig']> };
  ResumePlaybackContextInput: ResumePlaybackContextInput;
  ResumePlaybackOffsetInput: ResumePlaybackOffsetInput;
  ResumePlaybackResponse: Omit<ResumePlaybackResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  ResumePoint: Spotify.Object.ResumePoint;
  SavedTrackConnection: Spotify.Object.Paginated<Spotify.Object.SavedTrack>;
  SavedTrackEdge: Spotify.Object.SavedTrack;
  SchemaField: SchemaField;
  SchemaFieldInput: SchemaFieldInput;
  SeekToPositionContextInput: SeekToPositionContextInput;
  SeekToPositionResponse: Omit<SeekToPositionResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  SetRepeatModeContextInput: SetRepeatModeContextInput;
  SetRepeatModeResponse: Omit<SetRepeatModeResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  SetVolumeContextInput: SetVolumeContextInput;
  SetVolumeResponse: Omit<SetVolumeResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  Show: Spotify.Object.Show | Spotify.Object.ShowSimplified;
  ShowEpisodeEdge: Spotify.Object.EpisodeSimplified;
  ShowEpisodesConnection: Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>;
  ShufflePlaybackContextInput: ShufflePlaybackContextInput;
  ShufflePlaybackResponse: Omit<ShufflePlaybackResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  SkipToNextContextInput: SkipToNextContextInput;
  SkipToNextResponse: Omit<SkipToNextResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  SkipToPreviousContextInput: SkipToPreviousContextInput;
  SkipToPreviousResponse: Omit<SkipToPreviousResponse, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  String: Scalars['String'];
  Subscription: {};
  Timestamp: Scalars['Timestamp'];
  Track: Spotify.Object.Track | Spotify.Object.TrackSimplified;
  TrackExternalIds: TrackExternalIds;
  UpdateFieldConfigResponse: Omit<UpdateFieldConfigResponse, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversParentTypes['FieldConfig']> };
  User: Spotify.Object.User;
}>;

export type ActionResolvers = { INTERRUPTING_PLAYBACK: 'interrupting_playback', PAUSING: 'pausing', RESUMING: 'resuming', SEEKING: 'seeking', SKIPPING_NEXT: 'skipping_next', SKIPPING_PREV: 'skipping_prev', TOGGLING_REPEAT_CONTEXT: 'toggling_repeat_context', TOGGLING_REPEAT_TRACK: 'toggling_repeat_track', TOGGLING_SHUFFLE: 'toggling_shuffle', TRANSFERRING_PLAYBACK: 'transferring_playback' };

export type ActionsResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Actions'] = ResolversParentTypes['Actions']> = ResolversObject<{
  disallows?: Resolver<Array<ResolversTypes['Action']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddItemToPlaybackQueueResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['AddItemToPlaybackQueueResponse'] = ResolversParentTypes['AddItemToPlaybackQueueResponse']> = ResolversObject<{
  queue?: Resolver<Maybe<ResolversTypes['PlaybackQueue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = ResolversObject<{
  albumType?: Resolver<ResolversTypes['AlbumType'], ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  copyrights?: Resolver<Array<ResolversTypes['Copyright']>, ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['ReleaseDate'], ParentType, ContextType>;
  totalTracks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tracks?: Resolver<Maybe<ResolversTypes['AlbumTrackConnection']>, ParentType, ContextType, Partial<AlbumTracksArgs>>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumGroupResolvers = { ALBUM: 'album', APPEARS_ON: 'appears_on', COMPILATION: 'compilation', SINGLE: 'single' };

export type AlbumTrackConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['AlbumTrackConnection'] = ResolversParentTypes['AlbumTrackConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['AlbumTrackEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumTrackEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['AlbumTrackEdge'] = ResolversParentTypes['AlbumTrackEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumTypeResolvers = { ALBUM: 'album', COMPILATION: 'compilation', SINGLE: 'single' };

export type ArtistResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = ResolversObject<{
  albums?: Resolver<Maybe<ResolversTypes['ArtistAlbumsConnection']>, ParentType, ContextType, Partial<ArtistAlbumsArgs>>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relatedArtists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  topTracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistAlbumEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ArtistAlbumEdge'] = ResolversParentTypes['ArtistAlbumEdge']> = ResolversObject<{
  albumGroup?: Resolver<ResolversTypes['AlbumGroup'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistAlbumsConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ArtistAlbumsConnection'] = ResolversParentTypes['ArtistAlbumsConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['ArtistAlbumEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContainsResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Contains'] = ResolversParentTypes['Contains']> = ResolversObject<{
  albums?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType>;
  episodes?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType>;
  shows?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType>;
  tracks?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CopyrightResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Copyright'] = ResolversParentTypes['Copyright']> = ResolversObject<{
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['CopyrightType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentUserResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = ResolversObject<{
  contains?: Resolver<Maybe<ResolversTypes['Contains']>, ParentType, ContextType, Partial<CurrentUserContainsArgs>>;
  playbackQueue?: Resolver<Maybe<ResolversTypes['PlaybackQueue']>, ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  playlists?: Resolver<Maybe<ResolversTypes['PlaylistConnection']>, ParentType, ContextType, Partial<CurrentUserPlaylistsArgs>>;
  tracks?: Resolver<Maybe<ResolversTypes['SavedTrackConnection']>, ParentType, ContextType, Partial<CurrentUserTracksArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentlyPlayingResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['CurrentlyPlaying'] = ResolversParentTypes['CurrentlyPlaying']> = ResolversObject<{
  actions?: Resolver<ResolversTypes['Actions'], ParentType, ContextType>;
  context?: Resolver<Maybe<ResolversTypes['PlaybackContext']>, ParentType, ContextType>;
  isPlaying?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['PlaybackItem']>, ParentType, ContextType>;
  progressMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeviceResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPrivateSession?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isRestricted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volumePercent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EpisodeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = ResolversObject<{
  audioPreviewUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<EpisodeDescriptionArgs, 'format'>>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  explicit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  isExternallyHosted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPlayable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['ReleaseDate'], ParentType, ContextType>;
  resumePoint?: Resolver<ResolversTypes['ResumePoint'], ParentType, ContextType>;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ErrorRateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ErrorRate'], any> {
  name: 'ErrorRate';
}

export type ExternalUrlResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl']> = ResolversObject<{
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeaturedPlaylistConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['FeaturedPlaylistConnection'] = ResolversParentTypes['FeaturedPlaylistConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['FeaturedPlaylistEdge']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeaturedPlaylistEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['FeaturedPlaylistEdge'] = ResolversParentTypes['FeaturedPlaylistEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FieldConfigResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['FieldConfig'] = ResolversParentTypes['FieldConfig']> = ResolversObject<{
  errorRate?: Resolver<ResolversTypes['ErrorRate'], ParentType, ContextType>;
  schemaField?: Resolver<ResolversTypes['SchemaField'], ParentType, ContextType>;
  timeout?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowersResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Followers'] = ResolversParentTypes['Followers']> = ResolversObject<{
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addItemToPlaybackQueue?: Resolver<Maybe<ResolversTypes['AddItemToPlaybackQueueResponse']>, ParentType, ContextType, RequireFields<MutationAddItemToPlaybackQueueArgs, 'uri'>>;
  pausePlayback?: Resolver<Maybe<ResolversTypes['PausePlaybackResponse']>, ParentType, ContextType, Partial<MutationPausePlaybackArgs>>;
  resetFieldConfig?: Resolver<Maybe<ResolversTypes['ResetFieldConfigResponse']>, ParentType, ContextType, RequireFields<MutationResetFieldConfigArgs, 'field'>>;
  resumePlayback?: Resolver<Maybe<ResolversTypes['ResumePlaybackResponse']>, ParentType, ContextType, Partial<MutationResumePlaybackArgs>>;
  seekToPosition?: Resolver<Maybe<ResolversTypes['SeekToPositionResponse']>, ParentType, ContextType, RequireFields<MutationSeekToPositionArgs, 'positionMs'>>;
  setRepeatMode?: Resolver<Maybe<ResolversTypes['SetRepeatModeResponse']>, ParentType, ContextType, RequireFields<MutationSetRepeatModeArgs, 'state'>>;
  setVolume?: Resolver<Maybe<ResolversTypes['SetVolumeResponse']>, ParentType, ContextType, RequireFields<MutationSetVolumeArgs, 'volumePercent'>>;
  shufflePlayback?: Resolver<Maybe<ResolversTypes['ShufflePlaybackResponse']>, ParentType, ContextType, RequireFields<MutationShufflePlaybackArgs, 'state'>>;
  skipToNext?: Resolver<Maybe<ResolversTypes['SkipToNextResponse']>, ParentType, ContextType, Partial<MutationSkipToNextArgs>>;
  skipToPrevious?: Resolver<Maybe<ResolversTypes['SkipToPreviousResponse']>, ParentType, ContextType, Partial<MutationSkipToPreviousArgs>>;
  updateFieldConfig?: Resolver<Maybe<ResolversTypes['UpdateFieldConfigResponse']>, ParentType, ContextType, RequireFields<MutationUpdateFieldConfigArgs, 'config' | 'field'>>;
}>;

export type PageInfoResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PausePlaybackResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PausePlaybackResponse'] = ResolversParentTypes['PausePlaybackResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaybackContextResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaybackContext'] = ResolversParentTypes['PlaybackContext']> = ResolversObject<{
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PlaybackContextType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaybackContextTypeResolvers = { ALBUM: 'album', ARTIST: 'artist', PLAYLIST: 'playlist', SHOW: 'show' };

export type PlaybackItemResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaybackItem'] = ResolversParentTypes['PlaybackItem']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Episode' | 'Track', ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PlaybackQueueResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaybackQueue'] = ResolversParentTypes['PlaybackQueue']> = ResolversObject<{
  currentlyPlaying?: Resolver<Maybe<ResolversTypes['PlaybackItem']>, ParentType, ContextType>;
  queue?: Resolver<Array<ResolversTypes['PlaybackItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaybackStateResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaybackState'] = ResolversParentTypes['PlaybackState']> = ResolversObject<{
  actions?: Resolver<ResolversTypes['Actions'], ParentType, ContextType>;
  context?: Resolver<Maybe<ResolversTypes['PlaybackContext']>, ParentType, ContextType>;
  device?: Resolver<ResolversTypes['Device'], ParentType, ContextType>;
  isPlaying?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes['PlaybackItem']>, ParentType, ContextType>;
  progressMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repeatState?: Resolver<ResolversTypes['RepeatMode'], ParentType, ContextType>;
  shuffleState?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  currentlyPlaying?: Resolver<Maybe<ResolversTypes['CurrentlyPlaying']>, ParentType, ContextType>;
  devices?: Resolver<Maybe<Array<ResolversTypes['Device']>>, ParentType, ContextType>;
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']> = ResolversObject<{
  collaborative?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  public?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  tracks?: Resolver<ResolversTypes['PlaylistTrackConnection'], ParentType, ContextType, Partial<PlaylistTracksArgs>>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaylistConnection'] = ResolversParentTypes['PlaylistConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['PlaylistEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaylistEdge'] = ResolversParentTypes['PlaylistEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistTrackResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaylistTrack'] = ResolversParentTypes['PlaylistTrack']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Episode' | 'Track', ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PlaylistTrackConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaylistTrackConnection'] = ResolversParentTypes['PlaylistTrackConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['PlaylistTrackEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistTrackEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['PlaylistTrackEdge'] = ResolversParentTypes['PlaylistTrackEdge']> = ResolversObject<{
  addedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  addedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlaylistTrack'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType, RequireFields<QueryAlbumArgs, 'id'>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  episode?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QueryEpisodeArgs, 'id'>>;
  featuredPlaylists?: Resolver<Maybe<ResolversTypes['FeaturedPlaylistConnection']>, ParentType, ContextType, Partial<QueryFeaturedPlaylistsArgs>>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['CurrentUser']>, ParentType, ContextType>;
  playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType, RequireFields<QueryPlaylistArgs, 'id'>>;
  recommendations?: Resolver<Maybe<ResolversTypes['Recommendations']>, ParentType, ContextType, RequireFields<QueryRecommendationsArgs, 'seeds'>>;
  show?: Resolver<Maybe<ResolversTypes['Show']>, ParentType, ContextType, RequireFields<QueryShowArgs, 'id'>>;
  track?: Resolver<Maybe<ResolversTypes['Track']>, ParentType, ContextType, RequireFields<QueryTrackArgs, 'id'>>;
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
  tracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReleaseDateResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ReleaseDate'] = ResolversParentTypes['ReleaseDate']> = ResolversObject<{
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  precision?: Resolver<ResolversTypes['ReleaseDatePrecision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReleaseDatePrecisionResolvers = { DAY: 'day', MONTH: 'month', YEAR: 'year' };

export type RepeatModeResolvers = { CONTEXT: 'context', OFF: 'off', TRACK: 'track' };

export type ResetFieldConfigResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ResetFieldConfigResponse'] = ResolversParentTypes['ResetFieldConfigResponse']> = ResolversObject<{
  fieldConfig?: Resolver<Maybe<ResolversTypes['FieldConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResumePlaybackResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ResumePlaybackResponse'] = ResolversParentTypes['ResumePlaybackResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResumePointResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ResumePoint'] = ResolversParentTypes['ResumePoint']> = ResolversObject<{
  fullyPlayed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resumePositionMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedTrackConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SavedTrackConnection'] = ResolversParentTypes['SavedTrackConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['SavedTrackEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedTrackEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SavedTrackEdge'] = ResolversParentTypes['SavedTrackEdge']> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SchemaFieldResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SchemaField'] = ResolversParentTypes['SchemaField']> = ResolversObject<{
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SeekToPositionResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SeekToPositionResponse'] = ResolversParentTypes['SeekToPositionResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetRepeatModeResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SetRepeatModeResponse'] = ResolversParentTypes['SetRepeatModeResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetVolumeResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SetVolumeResponse'] = ResolversParentTypes['SetVolumeResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShowResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Show'] = ResolversParentTypes['Show']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<ShowDescriptionArgs, 'format'>>;
  episodes?: Resolver<Maybe<ResolversTypes['ShowEpisodesConnection']>, ParentType, ContextType, Partial<ShowEpisodesArgs>>;
  explicit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  isExternallyHosted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  mediaType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShowEpisodeEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ShowEpisodeEdge'] = ResolversParentTypes['ShowEpisodeEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShowEpisodesConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ShowEpisodesConnection'] = ResolversParentTypes['ShowEpisodesConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['ShowEpisodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShufflePlaybackResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ShufflePlaybackResponse'] = ResolversParentTypes['ShufflePlaybackResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SkipToNextResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SkipToNextResponse'] = ResolversParentTypes['SkipToNextResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SkipToPreviousResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SkipToPreviousResponse'] = ResolversParentTypes['SkipToPreviousResponse']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  playbackStateChanged?: SubscriptionResolver<Maybe<ResolversTypes['PlaybackState']>, "playbackStateChanged", ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TrackResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = ResolversObject<{
  album?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  discNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  explicit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalIds?: Resolver<Maybe<ResolversTypes['TrackExternalIds']>, ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLocal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPlayable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  previewUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trackNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackExternalIdsResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['TrackExternalIds'] = ResolversParentTypes['TrackExternalIds']> = ResolversObject<{
  ean?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  upc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateFieldConfigResponseResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['UpdateFieldConfigResponse'] = ResolversParentTypes['UpdateFieldConfigResponse']> = ResolversObject<{
  fieldConfig?: Resolver<Maybe<ResolversTypes['FieldConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalUrls?: Resolver<ResolversTypes['ExternalUrl'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ContextValue> = ResolversObject<{
  Action?: ActionResolvers;
  Actions?: ActionsResolvers<ContextType>;
  AddItemToPlaybackQueueResponse?: AddItemToPlaybackQueueResponseResolvers<ContextType>;
  Album?: AlbumResolvers<ContextType>;
  AlbumGroup?: AlbumGroupResolvers;
  AlbumTrackConnection?: AlbumTrackConnectionResolvers<ContextType>;
  AlbumTrackEdge?: AlbumTrackEdgeResolvers<ContextType>;
  AlbumType?: AlbumTypeResolvers;
  Artist?: ArtistResolvers<ContextType>;
  ArtistAlbumEdge?: ArtistAlbumEdgeResolvers<ContextType>;
  ArtistAlbumsConnection?: ArtistAlbumsConnectionResolvers<ContextType>;
  Contains?: ContainsResolvers<ContextType>;
  Copyright?: CopyrightResolvers<ContextType>;
  CurrentUser?: CurrentUserResolvers<ContextType>;
  CurrentlyPlaying?: CurrentlyPlayingResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Device?: DeviceResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  ErrorRate?: GraphQLScalarType;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  FeaturedPlaylistConnection?: FeaturedPlaylistConnectionResolvers<ContextType>;
  FeaturedPlaylistEdge?: FeaturedPlaylistEdgeResolvers<ContextType>;
  FieldConfig?: FieldConfigResolvers<ContextType>;
  Followers?: FollowersResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PausePlaybackResponse?: PausePlaybackResponseResolvers<ContextType>;
  PlaybackContext?: PlaybackContextResolvers<ContextType>;
  PlaybackContextType?: PlaybackContextTypeResolvers;
  PlaybackItem?: PlaybackItemResolvers<ContextType>;
  PlaybackQueue?: PlaybackQueueResolvers<ContextType>;
  PlaybackState?: PlaybackStateResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Playlist?: PlaylistResolvers<ContextType>;
  PlaylistConnection?: PlaylistConnectionResolvers<ContextType>;
  PlaylistEdge?: PlaylistEdgeResolvers<ContextType>;
  PlaylistTrack?: PlaylistTrackResolvers<ContextType>;
  PlaylistTrackConnection?: PlaylistTrackConnectionResolvers<ContextType>;
  PlaylistTrackEdge?: PlaylistTrackEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecommendationSeed?: RecommendationSeedResolvers<ContextType>;
  Recommendations?: RecommendationsResolvers<ContextType>;
  ReleaseDate?: ReleaseDateResolvers<ContextType>;
  ReleaseDatePrecision?: ReleaseDatePrecisionResolvers;
  RepeatMode?: RepeatModeResolvers;
  ResetFieldConfigResponse?: ResetFieldConfigResponseResolvers<ContextType>;
  ResumePlaybackResponse?: ResumePlaybackResponseResolvers<ContextType>;
  ResumePoint?: ResumePointResolvers<ContextType>;
  SavedTrackConnection?: SavedTrackConnectionResolvers<ContextType>;
  SavedTrackEdge?: SavedTrackEdgeResolvers<ContextType>;
  SchemaField?: SchemaFieldResolvers<ContextType>;
  SeekToPositionResponse?: SeekToPositionResponseResolvers<ContextType>;
  SetRepeatModeResponse?: SetRepeatModeResponseResolvers<ContextType>;
  SetVolumeResponse?: SetVolumeResponseResolvers<ContextType>;
  Show?: ShowResolvers<ContextType>;
  ShowEpisodeEdge?: ShowEpisodeEdgeResolvers<ContextType>;
  ShowEpisodesConnection?: ShowEpisodesConnectionResolvers<ContextType>;
  ShufflePlaybackResponse?: ShufflePlaybackResponseResolvers<ContextType>;
  SkipToNextResponse?: SkipToNextResponseResolvers<ContextType>;
  SkipToPreviousResponse?: SkipToPreviousResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Track?: TrackResolvers<ContextType>;
  TrackExternalIds?: TrackExternalIdsResolvers<ContextType>;
  UpdateFieldConfigResponse?: UpdateFieldConfigResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

