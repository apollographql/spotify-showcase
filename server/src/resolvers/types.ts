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
  CountryCode: string;
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

export type AddItemToPlaybackQueueInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']>;
  /** The uri of the item to add to the queue. Must be a track or an episode uri. */
  uri: Scalars['String'];
};

export type AddItemToPlaybackQueuePayload = {
  __typename?: 'AddItemToPlaybackQueuePayload';
  playbackQueue?: Maybe<PlaybackQueue>;
};

export type AddItemsToPlaylistInput = {
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the playlist.
   */
  playlistId: Scalars['ID'];
  /**
   * The position to insert the items, a zero-based index. For example, to insert
   * the items in the first position: **position=0**; to insert the items in the
   * third position: **position=2**. If omitted, the items will be appended to the
   * playlist. Items are added in the order they are listed in the query string or
   * request body.
   */
  position?: InputMaybe<Scalars['Int']>;
  /**
   * A comma-separated list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * to add, can be track or episode URIs. A maximum of 100 items can be added in
   * one request.
   */
  uris: Array<Scalars['String']>;
};

export type AddItemsToPlaylistPayload = {
  __typename?: 'AddItemsToPlaylistPayload';
  /** The playlist that contains the newly added items */
  playlist?: Maybe<Playlist>;
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
  uri: Scalars['String'];
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
  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music'
   * library.
   */
  albums?: Maybe<SavedAlbumsConnection>;
  /**
   * Check if one or more albums is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  albumsContains?: Maybe<Array<Scalars['Boolean']>>;
  /**
   * Check if one or more episodes is already saved in the current Spotify user's
   * 'Your Episodes' library.
   */
  episodesContains?: Maybe<Array<Scalars['Boolean']>>;
  /** Get the list of objects that make up the user's queue. */
  playbackQueue?: Maybe<PlaybackQueue>;
  /** Information about the user's current playback state */
  player: Player;
  /** Playlists owned or followed by the current Spotify user. */
  playlists?: Maybe<PlaylistConnection>;
  /**
   * Check if one or more shows is already saved in the current Spotify user's
   * library.
   */
  showsContains?: Maybe<Array<Scalars['Boolean']>>;
  tracks?: Maybe<SavedTracksConnection>;
  /**
   * Check if one or more tracks is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  tracksContains?: Maybe<Array<Scalars['Boolean']>>;
  /** Detailed profile information about the current user. */
  user: User;
};


export type CurrentUserAlbumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUserAlbumsContainsArgs = {
  ids: Array<Scalars['ID']>;
};


export type CurrentUserEpisodesContainsArgs = {
  ids: Array<Scalars['ID']>;
};


export type CurrentUserPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUserShowsContainsArgs = {
  ids: Array<Scalars['ID']>;
};


export type CurrentUserTracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUserTracksContainsArgs = {
  ids: Array<Scalars['ID']>;
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

export type Developer = {
  __typename?: 'Developer';
  /**
   * A list of configured GraphQL fields. Only fields that have non-zero timeouts
   * and error rates will be listed.
   */
  fieldConfigs: Array<FieldConfig>;
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
  addItemToPlaybackQueue?: Maybe<AddItemToPlaybackQueuePayload>;
  /** Add one or more items to a user's playlist. */
  addItemsToPlaylist?: Maybe<AddItemsToPlaylistPayload>;
  /** Pause playback on the user's account. */
  pausePlayback?: Maybe<PausePlaybackResponse>;
  /** Remove one or more items from a user's playlist. */
  removeItemFromPlaylist?: Maybe<RemoveItemFromPlaylistPayload>;
  /** Remove one or more albums from the current user's 'Your Music' library. */
  removeSavedAlbums?: Maybe<RemoveSavedAlbumsPayload>;
  /** Remove one or more episodes from the current user's library. */
  removeSavedEpisodes?: Maybe<RemoveSavedEpisodesPayload>;
  /** Delete one or more shows from current Spotify user's library. */
  removeSavedShows?: Maybe<RemoveSavedShowsPayload>;
  /** Remove one or more tracks from the current user's 'Your Music' library. */
  removeSavedTracks?: Maybe<RemoveSavedTracksPayload>;
  /** Reset a field's config back to its default values. */
  resetFieldConfig?: Maybe<ResetFieldConfigPayload>;
  /** Start a new context or resume current playback on the user's active device. */
  resumePlayback?: Maybe<ResumePlaybackPayload>;
  /** Save one or more albums to the current user's 'Your Music' library. */
  saveAlbums?: Maybe<SaveAlbumsPayload>;
  /** Save one or more episodes to the current user's library. */
  saveEpisodes?: Maybe<SaveEpisodesPayload>;
  /** Save one or more shows to current Spotify user's library. */
  saveShows?: Maybe<SaveShowsPayload>;
  /** Save one or more tracks to the current user's 'Your Music' library. */
  saveTracks?: Maybe<SaveTracksPayload>;
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
  /**
   * Update configuration for a field in the schema. Allows tweaks to the
   * synthetic timeouts and error rates associated with the field. By default, both
   * the timeout and error rate are set to 0.
   */
  updateFieldConfig?: Maybe<UpdateFieldConfigPayload>;
};


export type MutationAddItemToPlaybackQueueArgs = {
  input: AddItemToPlaybackQueueInput;
};


export type MutationAddItemsToPlaylistArgs = {
  input: AddItemsToPlaylistInput;
};


export type MutationPausePlaybackArgs = {
  context?: InputMaybe<PausePlaybackContextInput>;
};


export type MutationRemoveItemFromPlaylistArgs = {
  input: RemoveItemFromPlaylistInput;
};


export type MutationRemoveSavedAlbumsArgs = {
  input: RemoveSavedAlbumsInput;
};


export type MutationRemoveSavedEpisodesArgs = {
  input: RemoveSavedEpisodesInput;
};


export type MutationRemoveSavedShowsArgs = {
  input: RemoveSavedShowsInput;
};


export type MutationRemoveSavedTracksArgs = {
  input: RemoveSavedTracksInput;
};


export type MutationResetFieldConfigArgs = {
  input: ResetFieldConfigInput;
};


export type MutationResumePlaybackArgs = {
  input?: InputMaybe<ResumePlaybackInput>;
};


export type MutationSaveAlbumsArgs = {
  input: SaveAlbumsInput;
};


export type MutationSaveEpisodesArgs = {
  input: SaveEpisodesInput;
};


export type MutationSaveShowsArgs = {
  input: SaveShowsInput;
};


export type MutationSaveTracksArgs = {
  input: SaveTracksInput;
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


export type MutationTransferPlaybackArgs = {
  input: TransferPlaybackInput;
};


export type MutationUpdateFieldConfigArgs = {
  input: UpdateFieldConfigInput;
};

export type NewReleaseEdge = {
  __typename?: 'NewReleaseEdge';
  /** The newly released album */
  node: Album;
};

export type NewReleasesConnection = {
  __typename?: 'NewReleasesConnection';
  /** The list of new releases */
  edges: Array<NewReleaseEdge>;
  /** Pagination infomration for the new releases */
  pageInfo?: Maybe<PageInfo>;
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
  | 'audio_features'
  | 'collection'
  | 'episode'
  | 'genre'
  | 'playlist'
  | 'show'
  | 'track'
  | 'user';

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
  /**
   * Get tracks from the current user's recently played tracks. **Note**: Currently
   * doesn't support podcast episodes.
   */
  recentlyPlayed?: Maybe<RecentlyPlayedConnection>;
};


export type PlayerRecentlyPlayedArgs = {
  after?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
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
  /** Get Spotify catalog information for multiple albums identified by their Spotify IDs. */
  albums?: Maybe<Array<Album>>;
  /** Spotify catalog information for an artist. */
  artist?: Maybe<Artist>;
  /** Get Spotify catalog information for several artists based on their Spotify IDs. */
  artists?: Maybe<Array<Artist>>;
  /** Get a list of developer-specific settings, such as GraphQL field configuration. */
  developer: Developer;
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
  /** Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab). */
  newReleases?: Maybe<NewReleasesConnection>;
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


export type QueryAlbumsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryArtistArgs = {
  id: Scalars['ID'];
};


export type QueryArtistsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryFeaturedPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['DateTime']>;
};


export type QueryNewReleasesArgs = {
  country?: InputMaybe<Scalars['CountryCode']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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

export type RecentlyPlayedConnection = {
  __typename?: 'RecentlyPlayedConnection';
  /** The list of recently played items. */
  edges: Array<RecentlyPlayedEdge>;
};

export type RecentlyPlayedEdge = {
  __typename?: 'RecentlyPlayedEdge';
  /** The playback context for the track */
  context?: Maybe<PlaybackContext>;
  /** The item that was recently played. */
  node: PlaybackItem;
  /** The date and time the track was played at. */
  playedAt: Scalars['DateTime'];
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

export type RemoveItemFromPlaylistInput = {
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the playlist.
   */
  playlistId: Scalars['ID'];
  /**
   * The playlist's snapshot ID against which you want to make the changes. The API
   * will validate that the specified items exist and in the specified positions
   * and make the changes, even if more recent changes have been made to the
   * playlist.
   */
  snapshotId?: InputMaybe<Scalars['ID']>;
  /**
   * An array of objects containing [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the tracks or episodes to remove.
   */
  tracks: Array<RemoveItemFromPlaylistTrackInput>;
};

export type RemoveItemFromPlaylistPayload = {
  __typename?: 'RemoveItemFromPlaylistPayload';
  /** The playlist after the item was removed */
  playlist?: Maybe<Playlist>;
  /** A snapshot ID for the playlist */
  snapshotId?: Maybe<Scalars['ID']>;
};

export type RemoveItemFromPlaylistTrackInput = {
  uri: Scalars['String'];
};

export type RemoveSavedAlbumsInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 20 IDs.
   */
  ids: Array<Scalars['ID']>;
};

export type RemoveSavedAlbumsPayload = {
  __typename?: 'RemoveSavedAlbumsPayload';
  /** The albums that were removed from the Spotify user's library. */
  removedAlbums?: Maybe<Array<Album>>;
};

export type RemoveSavedEpisodesInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']>;
};

export type RemoveSavedEpisodesPayload = {
  __typename?: 'RemoveSavedEpisodesPayload';
  /** The episodes that were removed from the Spotify user's library. */
  removedEpisodes?: Maybe<Array<Episode>>;
};

export type RemoveSavedShowsInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * for the shows. Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']>;
};

export type RemoveSavedShowsPayload = {
  __typename?: 'RemoveSavedShowsPayload';
  /** The shows that were removed from the Spotify user's library. */
  removedShows?: Maybe<Array<Show>>;
};

export type RemoveSavedTracksInput = {
  /**
   * A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']>;
};

export type RemoveSavedTracksPayload = {
  __typename?: 'RemoveSavedTracksPayload';
  /** The tracks that were removed from the Spotify user's library. */
  removedTracks?: Maybe<Array<Track>>;
};

export type RepeatMode =
  | 'context'
  | 'off'
  | 'track';

export type ResetFieldConfigInput = {
  /** The field that will be reset to its default values */
  field: FieldInput;
};

export type ResetFieldConfigPayload = {
  __typename?: 'ResetFieldConfigPayload';
  /** The updated field config */
  fieldConfig?: Maybe<FieldConfig>;
};

export type ResumePlaybackInput = {
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

export type ResumePlaybackPayload = {
  __typename?: 'ResumePlaybackPayload';
  playbackState?: Maybe<PlaybackState>;
};

export type ResumePoint = {
  __typename?: 'ResumePoint';
  /** Whether or not the episode has been fully played by the user. */
  fullyPlayed: Scalars['Boolean'];
  /** The user's most recent position in the episode in milliseconds. */
  resumePositionMs: Scalars['Int'];
};

export type SaveAlbumsInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the albums. Maximum: 20 IDs
   */
  ids: Array<Scalars['ID']>;
};

export type SaveAlbumsPayload = {
  __typename?: 'SaveAlbumsPayload';
  /** The albums that were saved to the Spotify user's library */
  savedAlbums?: Maybe<Array<Album>>;
};

export type SaveEpisodesInput = {
  /**
   * An list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']>;
};

export type SaveEpisodesPayload = {
  __typename?: 'SaveEpisodesPayload';
  /** The episodes that were saved to the Spotify user's library */
  savedEpisodes?: Maybe<Array<Episode>>;
};

export type SaveShowsInput = {
  /**
   * An list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * for the shows. Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']>;
};

export type SaveShowsPayload = {
  __typename?: 'SaveShowsPayload';
  /** The shows that were saved to the Spotify user's library */
  savedShows?: Maybe<Array<Show>>;
};

export type SaveTracksInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']>;
};

export type SaveTracksPayload = {
  __typename?: 'SaveTracksPayload';
  /** The tracks that were saved to the Spotify user's library */
  savedTracks?: Maybe<Array<Track>>;
};

export type SavedAlbumEdge = {
  __typename?: 'SavedAlbumEdge';
  /** The date the album was saved. */
  addedAt: Scalars['DateTime'];
  /** The album object. */
  node: Album;
};

export type SavedAlbumsConnection = {
  __typename?: 'SavedAlbumsConnection';
  /** The list of saved albums. */
  edges: Array<SavedAlbumEdge>;
  /** Pagination information for the set of playlists */
  pageInfo: PageInfo;
};

export type SavedTrackEdge = {
  __typename?: 'SavedTrackEdge';
  /** The date the track was saved. */
  addedAt: Scalars['DateTime'];
  /** The track */
  node: Track;
};

export type SavedTracksConnection = {
  __typename?: 'SavedTracksConnection';
  /** A list of saved tracks. */
  edges: Array<SavedTrackEdge>;
  /** "Pagination information for the set of playlists" */
  pageInfo: PageInfo;
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

export type TransferPlaybackInput = {
  /**
   * A list containing the ID of the device on which playback should be
   * started/transferred.
   */
  deviceIds: Array<Scalars['ID']>;
  /**
   * `true`: ensure playback happens on new device.
   * `false` or not provided: keep the current playback state.
   */
  play?: InputMaybe<Scalars['Boolean']>;
};

export type TransferPlaybackPayload = {
  __typename?: 'TransferPlaybackPayload';
  /** The state of playback after transferring devices. */
  playbackState?: Maybe<PlaybackState>;
};

export type UpdateFieldConfigInput = {
  config: FieldConfigInput;
  field: FieldInput;
};

export type UpdateFieldConfigPayload = {
  __typename?: 'UpdateFieldConfigPayload';
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

/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __Directive = {
  __typename?: '__Directive';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isRepeatable: Scalars['Boolean'];
  locations: Array<__DirectiveLocation>;
  args: Array<__InputValue>;
};


/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __DirectiveArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies. */
export type __DirectiveLocation =
  /** Location adjacent to a query operation. */
  | 'QUERY'
  /** Location adjacent to a mutation operation. */
  | 'MUTATION'
  /** Location adjacent to a subscription operation. */
  | 'SUBSCRIPTION'
  /** Location adjacent to a field. */
  | 'FIELD'
  /** Location adjacent to a fragment definition. */
  | 'FRAGMENT_DEFINITION'
  /** Location adjacent to a fragment spread. */
  | 'FRAGMENT_SPREAD'
  /** Location adjacent to an inline fragment. */
  | 'INLINE_FRAGMENT'
  /** Location adjacent to a variable definition. */
  | 'VARIABLE_DEFINITION'
  /** Location adjacent to a schema definition. */
  | 'SCHEMA'
  /** Location adjacent to a scalar definition. */
  | 'SCALAR'
  /** Location adjacent to an object type definition. */
  | 'OBJECT'
  /** Location adjacent to a field definition. */
  | 'FIELD_DEFINITION'
  /** Location adjacent to an argument definition. */
  | 'ARGUMENT_DEFINITION'
  /** Location adjacent to an interface definition. */
  | 'INTERFACE'
  /** Location adjacent to a union definition. */
  | 'UNION'
  /** Location adjacent to an enum definition. */
  | 'ENUM'
  /** Location adjacent to an enum value definition. */
  | 'ENUM_VALUE'
  /** Location adjacent to an input object type definition. */
  | 'INPUT_OBJECT'
  /** Location adjacent to an input object field definition. */
  | 'INPUT_FIELD_DEFINITION';

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations. */
export type __Schema = {
  __typename?: '__Schema';
  description?: Maybe<Scalars['String']>;
  /** A list of all types supported by this server. */
  types: Array<__Type>;
  /** The type that query operations will be rooted at. */
  queryType: __Type;
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<__Type>;
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<__Type>;
  /** A list of all directives supported by this server. */
  directives: Array<__Directive>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByURL?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export type __TypeKind =
  /** Indicates this type is a scalar. */
  | 'SCALAR'
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  | 'OBJECT'
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  | 'INTERFACE'
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  | 'UNION'
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  | 'ENUM'
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  | 'INPUT_OBJECT'
  /** Indicates this type is a list. `ofType` is a valid field. */
  | 'LIST'
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  | 'NON_NULL';

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
  AddItemToPlaybackQueueInput: AddItemToPlaybackQueueInput;
  AddItemToPlaybackQueuePayload: ResolverTypeWrapper<Omit<AddItemToPlaybackQueuePayload, 'playbackQueue'> & { playbackQueue?: Maybe<ResolversTypes['PlaybackQueue']> }>;
  AddItemsToPlaylistInput: AddItemsToPlaylistInput;
  AddItemsToPlaylistPayload: ResolverTypeWrapper<Omit<AddItemsToPlaylistPayload, 'playlist'> & { playlist?: Maybe<ResolversTypes['Playlist']> }>;
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
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  CurrentUser: ResolverTypeWrapper<Spotify.Object.CurrentUser>;
  CurrentlyPlaying: ResolverTypeWrapper<Spotify.Object.CurrentlyPlaying>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Developer: ResolverTypeWrapper<{}>;
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
  NewReleaseEdge: ResolverTypeWrapper<Spotify.Object.AlbumSimplified>;
  NewReleasesConnection: ResolverTypeWrapper<Spotify.Object.NewReleases>;
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
  RecentlyPlayedConnection: ResolverTypeWrapper<Spotify.Object.PaginatedCursorBased<Spotify.Object.PlayHistory>>;
  RecentlyPlayedEdge: ResolverTypeWrapper<Spotify.Object.PlayHistory>;
  RecommendationSeed: ResolverTypeWrapper<RecommendationSeed>;
  RecommendationSeedInput: RecommendationSeedInput;
  RecommendationSeedType: RecommendationSeedType;
  Recommendations: ResolverTypeWrapper<Spotify.Object.Recommendations>;
  ReleaseDate: ResolverTypeWrapper<Releasable>;
  ReleaseDatePrecision: ReleaseDatePrecision;
  RemoveItemFromPlaylistInput: RemoveItemFromPlaylistInput;
  RemoveItemFromPlaylistPayload: ResolverTypeWrapper<Omit<RemoveItemFromPlaylistPayload, 'playlist'> & { playlist?: Maybe<ResolversTypes['Playlist']> }>;
  RemoveItemFromPlaylistTrackInput: RemoveItemFromPlaylistTrackInput;
  RemoveSavedAlbumsInput: RemoveSavedAlbumsInput;
  RemoveSavedAlbumsPayload: ResolverTypeWrapper<Omit<RemoveSavedAlbumsPayload, 'removedAlbums'> & { removedAlbums?: Maybe<Array<ResolversTypes['Album']>> }>;
  RemoveSavedEpisodesInput: RemoveSavedEpisodesInput;
  RemoveSavedEpisodesPayload: ResolverTypeWrapper<Omit<RemoveSavedEpisodesPayload, 'removedEpisodes'> & { removedEpisodes?: Maybe<Array<ResolversTypes['Episode']>> }>;
  RemoveSavedShowsInput: RemoveSavedShowsInput;
  RemoveSavedShowsPayload: ResolverTypeWrapper<Omit<RemoveSavedShowsPayload, 'removedShows'> & { removedShows?: Maybe<Array<ResolversTypes['Show']>> }>;
  RemoveSavedTracksInput: RemoveSavedTracksInput;
  RemoveSavedTracksPayload: ResolverTypeWrapper<Omit<RemoveSavedTracksPayload, 'removedTracks'> & { removedTracks?: Maybe<Array<ResolversTypes['Track']>> }>;
  RepeatMode: RepeatMode;
  ResetFieldConfigInput: ResetFieldConfigInput;
  ResetFieldConfigPayload: ResolverTypeWrapper<Omit<ResetFieldConfigPayload, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversTypes['FieldConfig']> }>;
  ResumePlaybackInput: ResumePlaybackInput;
  ResumePlaybackOffsetInput: ResumePlaybackOffsetInput;
  ResumePlaybackPayload: ResolverTypeWrapper<Omit<ResumePlaybackPayload, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  ResumePoint: ResolverTypeWrapper<Spotify.Object.ResumePoint>;
  SaveAlbumsInput: SaveAlbumsInput;
  SaveAlbumsPayload: ResolverTypeWrapper<Omit<SaveAlbumsPayload, 'savedAlbums'> & { savedAlbums?: Maybe<Array<ResolversTypes['Album']>> }>;
  SaveEpisodesInput: SaveEpisodesInput;
  SaveEpisodesPayload: ResolverTypeWrapper<Omit<SaveEpisodesPayload, 'savedEpisodes'> & { savedEpisodes?: Maybe<Array<ResolversTypes['Episode']>> }>;
  SaveShowsInput: SaveShowsInput;
  SaveShowsPayload: ResolverTypeWrapper<Omit<SaveShowsPayload, 'savedShows'> & { savedShows?: Maybe<Array<ResolversTypes['Show']>> }>;
  SaveTracksInput: SaveTracksInput;
  SaveTracksPayload: ResolverTypeWrapper<Omit<SaveTracksPayload, 'savedTracks'> & { savedTracks?: Maybe<Array<ResolversTypes['Track']>> }>;
  SavedAlbumEdge: ResolverTypeWrapper<Spotify.Object.SavedAlbum>;
  SavedAlbumsConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.SavedAlbum>>;
  SavedTrackEdge: ResolverTypeWrapper<Spotify.Object.SavedTrack>;
  SavedTracksConnection: ResolverTypeWrapper<Spotify.Object.Paginated<Spotify.Object.SavedTrack>>;
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
  TransferPlaybackInput: TransferPlaybackInput;
  TransferPlaybackPayload: ResolverTypeWrapper<Omit<TransferPlaybackPayload, 'playbackState'> & { playbackState?: Maybe<ResolversTypes['PlaybackState']> }>;
  UpdateFieldConfigInput: UpdateFieldConfigInput;
  UpdateFieldConfigPayload: ResolverTypeWrapper<Omit<UpdateFieldConfigPayload, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversTypes['FieldConfig']> }>;
  User: ResolverTypeWrapper<Spotify.Object.User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actions: Spotify.Object.Actions;
  AddItemToPlaybackQueueInput: AddItemToPlaybackQueueInput;
  AddItemToPlaybackQueuePayload: Omit<AddItemToPlaybackQueuePayload, 'playbackQueue'> & { playbackQueue?: Maybe<ResolversParentTypes['PlaybackQueue']> };
  AddItemsToPlaylistInput: AddItemsToPlaylistInput;
  AddItemsToPlaylistPayload: Omit<AddItemsToPlaylistPayload, 'playlist'> & { playlist?: Maybe<ResolversParentTypes['Playlist']> };
  Album: Spotify.Object.Album | Spotify.Object.AlbumSimplified;
  AlbumTrackConnection: Spotify.Object.Paginated<Spotify.Object.TrackSimplified>;
  AlbumTrackEdge: Spotify.Object.TrackSimplified;
  Artist: Spotify.Object.Artist;
  ArtistAlbumEdge: Spotify.Object.AlbumSimplified;
  ArtistAlbumsConnection: Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>;
  Boolean: Scalars['Boolean'];
  Contains: Contains;
  Copyright: Copyright;
  CountryCode: Scalars['CountryCode'];
  CurrentUser: Spotify.Object.CurrentUser;
  CurrentlyPlaying: Spotify.Object.CurrentlyPlaying;
  DateTime: Scalars['DateTime'];
  Developer: {};
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
  NewReleaseEdge: Spotify.Object.AlbumSimplified;
  NewReleasesConnection: Spotify.Object.NewReleases;
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
  RecentlyPlayedConnection: Spotify.Object.PaginatedCursorBased<Spotify.Object.PlayHistory>;
  RecentlyPlayedEdge: Spotify.Object.PlayHistory;
  RecommendationSeed: RecommendationSeed;
  RecommendationSeedInput: RecommendationSeedInput;
  Recommendations: Spotify.Object.Recommendations;
  ReleaseDate: Releasable;
  RemoveItemFromPlaylistInput: RemoveItemFromPlaylistInput;
  RemoveItemFromPlaylistPayload: Omit<RemoveItemFromPlaylistPayload, 'playlist'> & { playlist?: Maybe<ResolversParentTypes['Playlist']> };
  RemoveItemFromPlaylistTrackInput: RemoveItemFromPlaylistTrackInput;
  RemoveSavedAlbumsInput: RemoveSavedAlbumsInput;
  RemoveSavedAlbumsPayload: Omit<RemoveSavedAlbumsPayload, 'removedAlbums'> & { removedAlbums?: Maybe<Array<ResolversParentTypes['Album']>> };
  RemoveSavedEpisodesInput: RemoveSavedEpisodesInput;
  RemoveSavedEpisodesPayload: Omit<RemoveSavedEpisodesPayload, 'removedEpisodes'> & { removedEpisodes?: Maybe<Array<ResolversParentTypes['Episode']>> };
  RemoveSavedShowsInput: RemoveSavedShowsInput;
  RemoveSavedShowsPayload: Omit<RemoveSavedShowsPayload, 'removedShows'> & { removedShows?: Maybe<Array<ResolversParentTypes['Show']>> };
  RemoveSavedTracksInput: RemoveSavedTracksInput;
  RemoveSavedTracksPayload: Omit<RemoveSavedTracksPayload, 'removedTracks'> & { removedTracks?: Maybe<Array<ResolversParentTypes['Track']>> };
  ResetFieldConfigInput: ResetFieldConfigInput;
  ResetFieldConfigPayload: Omit<ResetFieldConfigPayload, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversParentTypes['FieldConfig']> };
  ResumePlaybackInput: ResumePlaybackInput;
  ResumePlaybackOffsetInput: ResumePlaybackOffsetInput;
  ResumePlaybackPayload: Omit<ResumePlaybackPayload, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  ResumePoint: Spotify.Object.ResumePoint;
  SaveAlbumsInput: SaveAlbumsInput;
  SaveAlbumsPayload: Omit<SaveAlbumsPayload, 'savedAlbums'> & { savedAlbums?: Maybe<Array<ResolversParentTypes['Album']>> };
  SaveEpisodesInput: SaveEpisodesInput;
  SaveEpisodesPayload: Omit<SaveEpisodesPayload, 'savedEpisodes'> & { savedEpisodes?: Maybe<Array<ResolversParentTypes['Episode']>> };
  SaveShowsInput: SaveShowsInput;
  SaveShowsPayload: Omit<SaveShowsPayload, 'savedShows'> & { savedShows?: Maybe<Array<ResolversParentTypes['Show']>> };
  SaveTracksInput: SaveTracksInput;
  SaveTracksPayload: Omit<SaveTracksPayload, 'savedTracks'> & { savedTracks?: Maybe<Array<ResolversParentTypes['Track']>> };
  SavedAlbumEdge: Spotify.Object.SavedAlbum;
  SavedAlbumsConnection: Spotify.Object.Paginated<Spotify.Object.SavedAlbum>;
  SavedTrackEdge: Spotify.Object.SavedTrack;
  SavedTracksConnection: Spotify.Object.Paginated<Spotify.Object.SavedTrack>;
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
  TransferPlaybackInput: TransferPlaybackInput;
  TransferPlaybackPayload: Omit<TransferPlaybackPayload, 'playbackState'> & { playbackState?: Maybe<ResolversParentTypes['PlaybackState']> };
  UpdateFieldConfigInput: UpdateFieldConfigInput;
  UpdateFieldConfigPayload: Omit<UpdateFieldConfigPayload, 'fieldConfig'> & { fieldConfig?: Maybe<ResolversParentTypes['FieldConfig']> };
  User: Spotify.Object.User;
}>;

export type ActionResolvers = { INTERRUPTING_PLAYBACK: 'interrupting_playback', PAUSING: 'pausing', RESUMING: 'resuming', SEEKING: 'seeking', SKIPPING_NEXT: 'skipping_next', SKIPPING_PREV: 'skipping_prev', TOGGLING_REPEAT_CONTEXT: 'toggling_repeat_context', TOGGLING_REPEAT_TRACK: 'toggling_repeat_track', TOGGLING_SHUFFLE: 'toggling_shuffle', TRANSFERRING_PLAYBACK: 'transferring_playback' };

export type ActionsResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Actions'] = ResolversParentTypes['Actions']> = ResolversObject<{
  disallows?: Resolver<Array<ResolversTypes['Action']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddItemToPlaybackQueuePayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['AddItemToPlaybackQueuePayload'] = ResolversParentTypes['AddItemToPlaybackQueuePayload']> = ResolversObject<{
  playbackQueue?: Resolver<Maybe<ResolversTypes['PlaybackQueue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddItemsToPlaylistPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['AddItemsToPlaylistPayload'] = ResolversParentTypes['AddItemsToPlaylistPayload']> = ResolversObject<{
  playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType>;
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
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export type CurrentUserResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = ResolversObject<{
  albums?: Resolver<Maybe<ResolversTypes['SavedAlbumsConnection']>, ParentType, ContextType, Partial<CurrentUserAlbumsArgs>>;
  albumsContains?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType, RequireFields<CurrentUserAlbumsContainsArgs, 'ids'>>;
  episodesContains?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType, RequireFields<CurrentUserEpisodesContainsArgs, 'ids'>>;
  playbackQueue?: Resolver<Maybe<ResolversTypes['PlaybackQueue']>, ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  playlists?: Resolver<Maybe<ResolversTypes['PlaylistConnection']>, ParentType, ContextType, Partial<CurrentUserPlaylistsArgs>>;
  showsContains?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType, RequireFields<CurrentUserShowsContainsArgs, 'ids'>>;
  tracks?: Resolver<Maybe<ResolversTypes['SavedTracksConnection']>, ParentType, ContextType, Partial<CurrentUserTracksArgs>>;
  tracksContains?: Resolver<Maybe<Array<ResolversTypes['Boolean']>>, ParentType, ContextType, RequireFields<CurrentUserTracksContainsArgs, 'ids'>>;
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

export type DeveloperResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Developer'] = ResolversParentTypes['Developer']> = ResolversObject<{
  fieldConfigs?: Resolver<Array<ResolversTypes['FieldConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

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
  addItemToPlaybackQueue?: Resolver<Maybe<ResolversTypes['AddItemToPlaybackQueuePayload']>, ParentType, ContextType, RequireFields<MutationAddItemToPlaybackQueueArgs, 'input'>>;
  addItemsToPlaylist?: Resolver<Maybe<ResolversTypes['AddItemsToPlaylistPayload']>, ParentType, ContextType, RequireFields<MutationAddItemsToPlaylistArgs, 'input'>>;
  pausePlayback?: Resolver<Maybe<ResolversTypes['PausePlaybackResponse']>, ParentType, ContextType, Partial<MutationPausePlaybackArgs>>;
  removeItemFromPlaylist?: Resolver<Maybe<ResolversTypes['RemoveItemFromPlaylistPayload']>, ParentType, ContextType, RequireFields<MutationRemoveItemFromPlaylistArgs, 'input'>>;
  removeSavedAlbums?: Resolver<Maybe<ResolversTypes['RemoveSavedAlbumsPayload']>, ParentType, ContextType, RequireFields<MutationRemoveSavedAlbumsArgs, 'input'>>;
  removeSavedEpisodes?: Resolver<Maybe<ResolversTypes['RemoveSavedEpisodesPayload']>, ParentType, ContextType, RequireFields<MutationRemoveSavedEpisodesArgs, 'input'>>;
  removeSavedShows?: Resolver<Maybe<ResolversTypes['RemoveSavedShowsPayload']>, ParentType, ContextType, RequireFields<MutationRemoveSavedShowsArgs, 'input'>>;
  removeSavedTracks?: Resolver<Maybe<ResolversTypes['RemoveSavedTracksPayload']>, ParentType, ContextType, RequireFields<MutationRemoveSavedTracksArgs, 'input'>>;
  resetFieldConfig?: Resolver<Maybe<ResolversTypes['ResetFieldConfigPayload']>, ParentType, ContextType, RequireFields<MutationResetFieldConfigArgs, 'input'>>;
  resumePlayback?: Resolver<Maybe<ResolversTypes['ResumePlaybackPayload']>, ParentType, ContextType, Partial<MutationResumePlaybackArgs>>;
  saveAlbums?: Resolver<Maybe<ResolversTypes['SaveAlbumsPayload']>, ParentType, ContextType, RequireFields<MutationSaveAlbumsArgs, 'input'>>;
  saveEpisodes?: Resolver<Maybe<ResolversTypes['SaveEpisodesPayload']>, ParentType, ContextType, RequireFields<MutationSaveEpisodesArgs, 'input'>>;
  saveShows?: Resolver<Maybe<ResolversTypes['SaveShowsPayload']>, ParentType, ContextType, RequireFields<MutationSaveShowsArgs, 'input'>>;
  saveTracks?: Resolver<Maybe<ResolversTypes['SaveTracksPayload']>, ParentType, ContextType, RequireFields<MutationSaveTracksArgs, 'input'>>;
  seekToPosition?: Resolver<Maybe<ResolversTypes['SeekToPositionResponse']>, ParentType, ContextType, RequireFields<MutationSeekToPositionArgs, 'positionMs'>>;
  setRepeatMode?: Resolver<Maybe<ResolversTypes['SetRepeatModeResponse']>, ParentType, ContextType, RequireFields<MutationSetRepeatModeArgs, 'state'>>;
  setVolume?: Resolver<Maybe<ResolversTypes['SetVolumeResponse']>, ParentType, ContextType, RequireFields<MutationSetVolumeArgs, 'volumePercent'>>;
  shufflePlayback?: Resolver<Maybe<ResolversTypes['ShufflePlaybackResponse']>, ParentType, ContextType, RequireFields<MutationShufflePlaybackArgs, 'state'>>;
  skipToNext?: Resolver<Maybe<ResolversTypes['SkipToNextResponse']>, ParentType, ContextType, Partial<MutationSkipToNextArgs>>;
  skipToPrevious?: Resolver<Maybe<ResolversTypes['SkipToPreviousResponse']>, ParentType, ContextType, Partial<MutationSkipToPreviousArgs>>;
  transferPlayback?: Resolver<Maybe<ResolversTypes['TransferPlaybackPayload']>, ParentType, ContextType, RequireFields<MutationTransferPlaybackArgs, 'input'>>;
  updateFieldConfig?: Resolver<Maybe<ResolversTypes['UpdateFieldConfigPayload']>, ParentType, ContextType, RequireFields<MutationUpdateFieldConfigArgs, 'input'>>;
}>;

export type NewReleaseEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['NewReleaseEdge'] = ResolversParentTypes['NewReleaseEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewReleasesConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['NewReleasesConnection'] = ResolversParentTypes['NewReleasesConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['NewReleaseEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type PlaybackContextTypeResolvers = { ALBUM: 'album', ARTIST: 'artist', AUDIO_FEATURES: 'audio_features', COLLECTION: 'collection', EPISODE: 'episode', GENRE: 'genre', PLAYLIST: 'playlist', SHOW: 'show', TRACK: 'track', USER: 'user' };

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
  recentlyPlayed?: Resolver<Maybe<ResolversTypes['RecentlyPlayedConnection']>, ParentType, ContextType, Partial<PlayerRecentlyPlayedArgs>>;
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
  albums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType, RequireFields<QueryAlbumsArgs, 'ids'>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  artists?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType, RequireFields<QueryArtistsArgs, 'ids'>>;
  developer?: Resolver<ResolversTypes['Developer'], ParentType, ContextType>;
  episode?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QueryEpisodeArgs, 'id'>>;
  featuredPlaylists?: Resolver<Maybe<ResolversTypes['FeaturedPlaylistConnection']>, ParentType, ContextType, Partial<QueryFeaturedPlaylistsArgs>>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['CurrentUser']>, ParentType, ContextType>;
  newReleases?: Resolver<Maybe<ResolversTypes['NewReleasesConnection']>, ParentType, ContextType, Partial<QueryNewReleasesArgs>>;
  playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType, RequireFields<QueryPlaylistArgs, 'id'>>;
  recommendations?: Resolver<Maybe<ResolversTypes['Recommendations']>, ParentType, ContextType, RequireFields<QueryRecommendationsArgs, 'seeds'>>;
  show?: Resolver<Maybe<ResolversTypes['Show']>, ParentType, ContextType, RequireFields<QueryShowArgs, 'id'>>;
  track?: Resolver<Maybe<ResolversTypes['Track']>, ParentType, ContextType, RequireFields<QueryTrackArgs, 'id'>>;
}>;

export type RecentlyPlayedConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RecentlyPlayedConnection'] = ResolversParentTypes['RecentlyPlayedConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['RecentlyPlayedEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecentlyPlayedEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RecentlyPlayedEdge'] = ResolversParentTypes['RecentlyPlayedEdge']> = ResolversObject<{
  context?: Resolver<Maybe<ResolversTypes['PlaybackContext']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlaybackItem'], ParentType, ContextType>;
  playedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type RemoveItemFromPlaylistPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RemoveItemFromPlaylistPayload'] = ResolversParentTypes['RemoveItemFromPlaylistPayload']> = ResolversObject<{
  playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType>;
  snapshotId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedAlbumsPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RemoveSavedAlbumsPayload'] = ResolversParentTypes['RemoveSavedAlbumsPayload']> = ResolversObject<{
  removedAlbums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedEpisodesPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RemoveSavedEpisodesPayload'] = ResolversParentTypes['RemoveSavedEpisodesPayload']> = ResolversObject<{
  removedEpisodes?: Resolver<Maybe<Array<ResolversTypes['Episode']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedShowsPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RemoveSavedShowsPayload'] = ResolversParentTypes['RemoveSavedShowsPayload']> = ResolversObject<{
  removedShows?: Resolver<Maybe<Array<ResolversTypes['Show']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedTracksPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RemoveSavedTracksPayload'] = ResolversParentTypes['RemoveSavedTracksPayload']> = ResolversObject<{
  removedTracks?: Resolver<Maybe<Array<ResolversTypes['Track']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepeatModeResolvers = { CONTEXT: 'context', OFF: 'off', TRACK: 'track' };

export type ResetFieldConfigPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ResetFieldConfigPayload'] = ResolversParentTypes['ResetFieldConfigPayload']> = ResolversObject<{
  fieldConfig?: Resolver<Maybe<ResolversTypes['FieldConfig']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResumePlaybackPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ResumePlaybackPayload'] = ResolversParentTypes['ResumePlaybackPayload']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResumePointResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ResumePoint'] = ResolversParentTypes['ResumePoint']> = ResolversObject<{
  fullyPlayed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resumePositionMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveAlbumsPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SaveAlbumsPayload'] = ResolversParentTypes['SaveAlbumsPayload']> = ResolversObject<{
  savedAlbums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveEpisodesPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SaveEpisodesPayload'] = ResolversParentTypes['SaveEpisodesPayload']> = ResolversObject<{
  savedEpisodes?: Resolver<Maybe<Array<ResolversTypes['Episode']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveShowsPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SaveShowsPayload'] = ResolversParentTypes['SaveShowsPayload']> = ResolversObject<{
  savedShows?: Resolver<Maybe<Array<ResolversTypes['Show']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveTracksPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SaveTracksPayload'] = ResolversParentTypes['SaveTracksPayload']> = ResolversObject<{
  savedTracks?: Resolver<Maybe<Array<ResolversTypes['Track']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedAlbumEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SavedAlbumEdge'] = ResolversParentTypes['SavedAlbumEdge']> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedAlbumsConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SavedAlbumsConnection'] = ResolversParentTypes['SavedAlbumsConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['SavedAlbumEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedTrackEdgeResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SavedTrackEdge'] = ResolversParentTypes['SavedTrackEdge']> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedTracksConnectionResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['SavedTracksConnection'] = ResolversParentTypes['SavedTracksConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['SavedTrackEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
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

export type TransferPlaybackPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['TransferPlaybackPayload'] = ResolversParentTypes['TransferPlaybackPayload']> = ResolversObject<{
  playbackState?: Resolver<Maybe<ResolversTypes['PlaybackState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateFieldConfigPayloadResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['UpdateFieldConfigPayload'] = ResolversParentTypes['UpdateFieldConfigPayload']> = ResolversObject<{
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
  AddItemToPlaybackQueuePayload?: AddItemToPlaybackQueuePayloadResolvers<ContextType>;
  AddItemsToPlaylistPayload?: AddItemsToPlaylistPayloadResolvers<ContextType>;
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
  CountryCode?: GraphQLScalarType;
  CurrentUser?: CurrentUserResolvers<ContextType>;
  CurrentlyPlaying?: CurrentlyPlayingResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Developer?: DeveloperResolvers<ContextType>;
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
  NewReleaseEdge?: NewReleaseEdgeResolvers<ContextType>;
  NewReleasesConnection?: NewReleasesConnectionResolvers<ContextType>;
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
  RecentlyPlayedConnection?: RecentlyPlayedConnectionResolvers<ContextType>;
  RecentlyPlayedEdge?: RecentlyPlayedEdgeResolvers<ContextType>;
  RecommendationSeed?: RecommendationSeedResolvers<ContextType>;
  Recommendations?: RecommendationsResolvers<ContextType>;
  ReleaseDate?: ReleaseDateResolvers<ContextType>;
  ReleaseDatePrecision?: ReleaseDatePrecisionResolvers;
  RemoveItemFromPlaylistPayload?: RemoveItemFromPlaylistPayloadResolvers<ContextType>;
  RemoveSavedAlbumsPayload?: RemoveSavedAlbumsPayloadResolvers<ContextType>;
  RemoveSavedEpisodesPayload?: RemoveSavedEpisodesPayloadResolvers<ContextType>;
  RemoveSavedShowsPayload?: RemoveSavedShowsPayloadResolvers<ContextType>;
  RemoveSavedTracksPayload?: RemoveSavedTracksPayloadResolvers<ContextType>;
  RepeatMode?: RepeatModeResolvers;
  ResetFieldConfigPayload?: ResetFieldConfigPayloadResolvers<ContextType>;
  ResumePlaybackPayload?: ResumePlaybackPayloadResolvers<ContextType>;
  ResumePoint?: ResumePointResolvers<ContextType>;
  SaveAlbumsPayload?: SaveAlbumsPayloadResolvers<ContextType>;
  SaveEpisodesPayload?: SaveEpisodesPayloadResolvers<ContextType>;
  SaveShowsPayload?: SaveShowsPayloadResolvers<ContextType>;
  SaveTracksPayload?: SaveTracksPayloadResolvers<ContextType>;
  SavedAlbumEdge?: SavedAlbumEdgeResolvers<ContextType>;
  SavedAlbumsConnection?: SavedAlbumsConnectionResolvers<ContextType>;
  SavedTrackEdge?: SavedTrackEdgeResolvers<ContextType>;
  SavedTracksConnection?: SavedTracksConnectionResolvers<ContextType>;
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
  TransferPlaybackPayload?: TransferPlaybackPayloadResolvers<ContextType>;
  UpdateFieldConfigPayload?: UpdateFieldConfigPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

