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
  ErrorRate: number;
  Timestamp: number;
};

export enum Action {
  InterruptingPlayback = 'INTERRUPTING_PLAYBACK',
  Pausing = 'PAUSING',
  Resuming = 'RESUMING',
  Seeking = 'SEEKING',
  SkippingNext = 'SKIPPING_NEXT',
  SkippingPrev = 'SKIPPING_PREV',
  TogglingRepeatContext = 'TOGGLING_REPEAT_CONTEXT',
  TogglingRepeatTrack = 'TOGGLING_REPEAT_TRACK',
  TogglingShuffle = 'TOGGLING_SHUFFLE',
  TransferringPlayback = 'TRANSFERRING_PLAYBACK'
}

export type Actions = {
  __typename: 'Actions';
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
  __typename: 'AddItemToPlaybackQueuePayload';
  playbackQueue: Maybe<PlaybackQueue>;
};

/** Spotify catalog information for an album. */
export type Album = {
  __typename: 'Album';
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
  /** The tracks of the album. */
  tracks: Maybe<AlbumTrackConnection>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: Scalars['String'];
};


/** Spotify catalog information for an album. */
export type AlbumtracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export enum AlbumGroup {
  Album = 'ALBUM',
  AppearsOn = 'APPEARS_ON',
  Compilation = 'COMPILATION',
  Single = 'SINGLE'
}

export type AlbumTrackConnection = {
  __typename: 'AlbumTrackConnection';
  /** The set of tracks. */
  edges: Array<AlbumTrackEdge>;
  /** Pagination information for the set of tracks. */
  pageInfo: PageInfo;
};

export type AlbumTrackEdge = {
  __typename: 'AlbumTrackEdge';
  /** The track on the album */
  node: Track;
};

export enum AlbumType {
  Album = 'ALBUM',
  Compilation = 'COMPILATION',
  Single = 'SINGLE'
}

/** Spotify catalog information for an artist. */
export type Artist = {
  __typename: 'Artist';
  /** Spotify catalog information about an artist's albums. */
  albums: Maybe<ArtistAlbumsConnection>;
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
  uri: Maybe<Scalars['String']>;
};


/** Spotify catalog information for an artist. */
export type ArtistalbumsArgs = {
  includeGroups?: InputMaybe<Array<AlbumGroup>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ArtistAlbumEdge = {
  __typename: 'ArtistAlbumEdge';
  /** The album group this album belongs to. */
  albumGroup: AlbumGroup;
  /** Spotify catalog information for the album. */
  node: Album;
};

export type ArtistAlbumsConnection = {
  __typename: 'ArtistAlbumsConnection';
  /** A list of albums that belong to the artist. */
  edges: Array<ArtistAlbumEdge>;
  /** "Pagination information for the set of albums" */
  pageInfo: PageInfo;
};

export type Contains = {
  __typename: 'Contains';
  /**
   * List of booleans in order of albums requested. `true` means the album is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  albums: Maybe<Array<Scalars['Boolean']>>;
  /**
   * List of booleans in order of episodes requested. `true` means the episode is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  episodes: Maybe<Array<Scalars['Boolean']>>;
  /**
   * List of booleans in order of shows requested. `true` means the show is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  shows: Maybe<Array<Scalars['Boolean']>>;
  /**
   * List of booleans in order of tracks requested. `true` means the track is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  tracks: Maybe<Array<Scalars['Boolean']>>;
};

export type Copyright = {
  __typename: 'Copyright';
  /** The copyright text for this content. */
  text: Scalars['String'];
  /**
   * The type of copyright: `C` = the copyright, `P` = the sound recording
   * (performance) copyright.
   */
  type: Maybe<CopyrightType>;
};

export enum CopyrightType {
  /** The copyright */
  C = 'C',
  /** The sound recording (performance) copyright. */
  P = 'P'
}

export type CurrentUser = {
  __typename: 'CurrentUser';
  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music'
   * library.
   */
  albums: Maybe<SavedAlbumsConnection>;
  /**
   * Check if one or more albums is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  albumsContains: Maybe<Array<Scalars['Boolean']>>;
  /**
   * Check if one or more episodes is already saved in the current Spotify user's
   * 'Your Episodes' library.
   */
  episodesContains: Maybe<Array<Scalars['Boolean']>>;
  /** Get the list of objects that make up the user's queue. */
  playbackQueue: Maybe<PlaybackQueue>;
  /** Information about the user's current playback state */
  player: Player;
  /** Playlists owned or followed by the current Spotify user. */
  playlists: Maybe<PlaylistConnection>;
  /**
   * Check if one or more shows is already saved in the current Spotify user's
   * library.
   */
  showsContains: Maybe<Array<Scalars['Boolean']>>;
  tracks: Maybe<SavedTracksConnection>;
  /**
   * Check if one or more tracks is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  tracksContains: Maybe<Array<Scalars['Boolean']>>;
  /** Detailed profile information about the current user. */
  user: User;
};


export type CurrentUseralbumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUseralbumsContainsArgs = {
  ids: Array<Scalars['ID']>;
};


export type CurrentUserepisodesContainsArgs = {
  ids: Array<Scalars['ID']>;
};


export type CurrentUserplaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUsershowsContainsArgs = {
  ids: Array<Scalars['ID']>;
};


export type CurrentUsertracksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CurrentUsertracksContainsArgs = {
  ids: Array<Scalars['ID']>;
};

export type CurrentlyPlaying = {
  __typename: 'CurrentlyPlaying';
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: Actions;
  /** A context object. */
  context: Maybe<PlaybackContext>;
  /** If something is currently playing, return `true`. */
  isPlaying: Scalars['Boolean'];
  /** The currently playing track or episode */
  item: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs: Maybe<Scalars['Int']>;
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp'];
};

export type Device = {
  __typename: 'Device';
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

export type FeaturedPlaylistConnection = {
  __typename: 'FeaturedPlaylistConnection';
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
  __typename: 'FeaturedPlaylistEdge';
  node: Playlist;
};

export type FieldConfig = {
  __typename: 'FieldConfig';
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

export type Mutation = {
  __typename: 'Mutation';
  /** Add an item to the end of the user's current playback queue. */
  addItemToPlaybackQueue: Maybe<AddItemToPlaybackQueuePayload>;
  /** Pause playback on the user's account. */
  pausePlayback: Maybe<PausePlaybackResponse>;
  /** Remove one or more albums from the current user's 'Your Music' library. */
  removeSavedAlbums: Maybe<RemoveSavedAlbumsPayload>;
  /** Remove one or more tracks from the current user's 'Your Music' library. */
  removeSavedTracks: Maybe<RemoveSavedTracksPayload>;
  /** Reset a field's config back to its default values. */
  resetFieldConfig: Maybe<ResetFieldConfigResponse>;
  /** Start a new context or resume current playback on the user's active device. */
  resumePlayback: Maybe<ResumePlaybackPayload>;
  /** Save one or more albums to the current user's 'Your Music' library. */
  saveAlbums: Maybe<SaveAlbumsPayload>;
  /** Save one or more tracks to the current user's 'Your Music' library. */
  saveTracks: Maybe<SaveTracksPayload>;
  /** Seeks to the given position in the user’s currently playing track. */
  seekToPosition: Maybe<SeekToPositionResponse>;
  /** Set the repeat mode for the user's playback. */
  setRepeatMode: Maybe<SetRepeatModeResponse>;
  /** Set the volume for the user’s current playback device. */
  setVolume: Maybe<SetVolumeResponse>;
  /** Toggle shuffle on or off for user’s playback. */
  shufflePlayback: Maybe<ShufflePlaybackResponse>;
  /** Skips to next track in the user’s queue. */
  skipToNext: Maybe<SkipToNextResponse>;
  /** Skips to previous track in the user’s queue. */
  skipToPrevious: Maybe<SkipToPreviousResponse>;
  /** Transfer playback to a new device and determine if it should start playing. */
  transferPlayback: Maybe<TransferPlaybackPayload>;
  /**
   * Update configuration for a field in the schema. Allows tweaks to the
   * synthetic timeouts and error rates associated with the field. By default, both
   * the timeout and error rate are set to 0.
   */
  updateFieldConfig: Maybe<UpdateFieldConfigResponse>;
};


export type MutationaddItemToPlaybackQueueArgs = {
  input: AddItemToPlaybackQueueInput;
};


export type MutationpausePlaybackArgs = {
  context?: InputMaybe<PausePlaybackContextInput>;
};


export type MutationremoveSavedAlbumsArgs = {
  input: RemoveSavedAlbumsInput;
};


export type MutationremoveSavedTracksArgs = {
  input: RemoveSavedTracksInput;
};


export type MutationresetFieldConfigArgs = {
  field: FieldInput;
};


export type MutationresumePlaybackArgs = {
  input?: InputMaybe<ResumePlaybackInput>;
};


export type MutationsaveAlbumsArgs = {
  input: SaveAlbumsInput;
};


export type MutationsaveTracksArgs = {
  input: SaveTracksInput;
};


export type MutationseekToPositionArgs = {
  context?: InputMaybe<SeekToPositionContextInput>;
  positionMs: Scalars['Int'];
};


export type MutationsetRepeatModeArgs = {
  context?: InputMaybe<SetRepeatModeContextInput>;
  state: RepeatMode;
};


export type MutationsetVolumeArgs = {
  context?: InputMaybe<SetVolumeContextInput>;
  volumePercent: Scalars['Int'];
};


export type MutationshufflePlaybackArgs = {
  context?: InputMaybe<ShufflePlaybackContextInput>;
  state: Scalars['Boolean'];
};


export type MutationskipToNextArgs = {
  context?: InputMaybe<SkipToNextContextInput>;
};


export type MutationskipToPreviousArgs = {
  context?: InputMaybe<SkipToPreviousContextInput>;
};


export type MutationtransferPlaybackArgs = {
  input: TransferPlaybackInput;
};


export type MutationupdateFieldConfigArgs = {
  config: FieldConfigInput;
  field: FieldInput;
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

export type PausePlaybackContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['String']>;
};

export type PausePlaybackResponse = {
  __typename: 'PausePlaybackResponse';
  /** The updated playback state */
  playbackState: Maybe<PlaybackState>;
};

export type PlaybackContext = {
  __typename: 'PlaybackContext';
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

export enum PlaybackContextType {
  Album = 'ALBUM',
  Artist = 'ARTIST',
  Playlist = 'PLAYLIST',
  Show = 'SHOW'
}

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
  __typename: 'PlaybackQueue';
  currentlyPlaying: Maybe<PlaybackItem>;
  queue: Array<PlaybackItem>;
};

export type PlaybackState = {
  __typename: 'PlaybackState';
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: Actions;
  /** A context object. */
  context: Maybe<PlaybackContext>;
  /** The device that is currently active. */
  device: Device;
  /** If something is currently playing, return `true`. */
  isPlaying: Scalars['Boolean'];
  /** The currently playing track or episode */
  item: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs: Maybe<Scalars['Int']>;
  /** off, track, context */
  repeatState: RepeatMode;
  /** If shuffle is on or off. */
  shuffleState: Scalars['Boolean'];
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp'];
};

export type Player = {
  __typename: 'Player';
  /** Information about the object currently being played on the user's Spotify account. */
  currentlyPlaying: Maybe<CurrentlyPlaying>;
  /** Information about a user's available devices. */
  devices: Maybe<Array<Device>>;
  /**
   * Information about the user's current playback state, including track or
   * episode, progress, and active device.
   */
  playbackState: Maybe<PlaybackState>;
  /**
   * Get tracks from the current user's recently played tracks. **Note**: Currently
   * doesn't support podcast episodes.
   */
  recentlyPlayed: Maybe<RecentlyPlayedConnection>;
};


export type PlayerrecentlyPlayedArgs = {
  after?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
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
  addedAt: Maybe<Scalars['DateTime']>;
  /** The user that added the track to the playlist */
  addedBy: User;
  /** The playlist track */
  node: PlaylistTrack;
};

export type Query = {
  __typename: 'Query';
  /** Spotify catalog information for an album. */
  album: Maybe<Album>;
  /** Spotify catalog information for an artist. */
  artist: Maybe<Artist>;
  /**
   * Get Spotify catalog information for a single episode identified by its unique
   * Spotify ID.
   */
  episode: Maybe<Episode>;
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify
   * player's 'Browse' tab).
   */
  featuredPlaylists: Maybe<FeaturedPlaylistConnection>;
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
  /**
   * Get Spotify catalog information for a single show identified by its unique
   * Spotify ID.
   */
  show: Maybe<Show>;
  /**
   * Get Spotify catalog information for a single track identified by its unique
   * Spotify ID.
   */
  track: Maybe<Track>;
};


export type QueryalbumArgs = {
  id: Scalars['ID'];
};


export type QueryartistArgs = {
  id: Scalars['ID'];
};


export type QueryepisodeArgs = {
  id: Scalars['ID'];
};


export type QueryfeaturedPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['DateTime']>;
};


export type QueryplaylistArgs = {
  id: Scalars['ID'];
};


export type QueryrecommendationsArgs = {
  seeds: RecommendationSeedInput;
};


export type QueryshowArgs = {
  id: Scalars['ID'];
};


export type QuerytrackArgs = {
  id: Scalars['ID'];
};

export type RecentlyPlayedConnection = {
  __typename: 'RecentlyPlayedConnection';
  /** The list of recently played items. */
  edges: Array<RecentlyPlayedEdge>;
};

export type RecentlyPlayedEdge = {
  __typename: 'RecentlyPlayedEdge';
  /** The playback context for the track */
  context: Maybe<PlaybackContext>;
  /** The item that was recently played. */
  node: PlaybackItem;
  /** The date and time the track was played at. */
  playedAt: Scalars['DateTime'];
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

export type RemoveSavedAlbumsInput = {
  /**
   * A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 20 IDs.
   */
  ids: Array<Scalars['ID']>;
};

export type RemoveSavedAlbumsPayload = {
  __typename: 'RemoveSavedAlbumsPayload';
  /** The albums that were removed from Spotify user's library. */
  removedAlbums: Maybe<Array<Album>>;
};

export type RemoveSavedTracksInput = {
  /**
   * A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']>;
};

export type RemoveSavedTracksPayload = {
  __typename: 'RemoveSavedTracksPayload';
  /** The tracks that were removed from the Spotify user's library. */
  removedTracks: Maybe<Array<Track>>;
};

export enum RepeatMode {
  Context = 'CONTEXT',
  Off = 'OFF',
  Track = 'TRACK'
}

export type ResetFieldConfigResponse = {
  __typename: 'ResetFieldConfigResponse';
  /** The updated field config */
  fieldConfig: Maybe<FieldConfig>;
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
  __typename: 'ResumePlaybackPayload';
  playbackState: Maybe<PlaybackState>;
};

export type ResumePoint = {
  __typename: 'ResumePoint';
  /** Whether or not the episode has been fully played by the user. */
  fullyPlayed: Scalars['Boolean'];
  /** The user's most recent position in the episode in milliseconds. */
  resumePositionMs: Scalars['Int'];
};

export type SaveAlbumsInput = {
  /**
   * A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the albums. Maximum: 20 IDs
   */
  ids: Array<Scalars['ID']>;
};

export type SaveAlbumsPayload = {
  __typename: 'SaveAlbumsPayload';
  /** The albums that were saved to the Spotify user's library */
  savedAlbums: Maybe<Array<Album>>;
};

export type SaveTracksInput = {
  /**
   * A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']>;
};

export type SaveTracksPayload = {
  __typename: 'SaveTracksPayload';
  /** The tracks that were saved to the Spotify user's library */
  savedTracks: Maybe<Array<Track>>;
};

export type SavedAlbumEdge = {
  __typename: 'SavedAlbumEdge';
  /** The date the album was saved. */
  addedAt: Scalars['DateTime'];
  /** The album object. */
  node: Album;
};

export type SavedAlbumsConnection = {
  __typename: 'SavedAlbumsConnection';
  /** The list of saved albums. */
  edges: Array<SavedAlbumEdge>;
  /** Pagination information for the set of playlists */
  pageInfo: PageInfo;
};

export type SavedTrackEdge = {
  __typename: 'SavedTrackEdge';
  /** The date the track was saved. */
  addedAt: Scalars['DateTime'];
  /** The track */
  node: Track;
};

export type SavedTracksConnection = {
  __typename: 'SavedTracksConnection';
  /** A list of saved tracks. */
  edges: Array<SavedTrackEdge>;
  /** "Pagination information for the set of playlists" */
  pageInfo: PageInfo;
};

export type SchemaField = {
  __typename: 'SchemaField';
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
  __typename: 'SeekToPositionResponse';
  /** The updated state of playback after seeking to a position. */
  playbackState: Maybe<PlaybackState>;
};

export type SetRepeatModeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SetRepeatModeResponse = {
  __typename: 'SetRepeatModeResponse';
  /** The updated state of playback after setting a repeat mode. */
  playbackState: Maybe<PlaybackState>;
};

export type SetVolumeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SetVolumeResponse = {
  __typename: 'SetVolumeResponse';
  /** The state of playback after the volume has been set. */
  playbackState: Maybe<PlaybackState>;
};

/** Spotify catalog information for a show. */
export type Show = {
  __typename: 'Show';
  /** A description of the show. */
  description: Scalars['String'];
  /** Spotify catalog information about an show’s episodes. */
  episodes: Maybe<ShowEpisodesConnection>;
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


/** Spotify catalog information for a show. */
export type ShowepisodesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ShowEpisodeEdge = {
  __typename: 'ShowEpisodeEdge';
  /** The episode */
  node: Episode;
};

export type ShowEpisodesConnection = {
  __typename: 'ShowEpisodesConnection';
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
  __typename: 'ShufflePlaybackResponse';
  /** The state of playback after shuffling playback. */
  playbackState: Maybe<PlaybackState>;
};

export type SkipToNextContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SkipToNextResponse = {
  __typename: 'SkipToNextResponse';
  /** The updated state of playback after skipping to next. */
  playbackState: Maybe<PlaybackState>;
};

export type SkipToPreviousContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['ID']>;
};

export type SkipToPreviousResponse = {
  __typename: 'SkipToPreviousResponse';
  /** The updated state of playback after skipping to previous. */
  playbackState: Maybe<PlaybackState>;
};

export type Subscription = {
  __typename: 'Subscription';
  playbackStateChanged: Maybe<PlaybackState>;
};

export enum TextFormat {
  Html = 'HTML',
  Plain = 'PLAIN'
}

/** Spotify catalog information for a track. */
export type Track = PlaybackItem & PlaylistTrack & {
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
  __typename: 'TransferPlaybackPayload';
  /** The state of playback after transferring devices. */
  playbackState: Maybe<PlaybackState>;
};

export type UpdateFieldConfigResponse = {
  __typename: 'UpdateFieldConfigResponse';
  /** The updated field config */
  fieldConfig: Maybe<FieldConfig>;
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

export type AlbumTile_album = { __typename: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename: 'ReleaseDate', date: string }, images: Array<{ __typename: 'Image', url: string }> };

export type AlbumTrackTitleCell_track = { __typename: 'Track', id: string, name: string, explicit: boolean, artists: Array<{ __typename: 'Artist', id: string, name: string }> };

export type AlbumTracksTable_tracks = { __typename: 'Track', id: string, durationMs: number, trackNumber: number | null, name: string, explicit: boolean, artists: Array<{ __typename: 'Artist', id: string, name: string }> };

export type ArtistTile_artist = { __typename: 'Artist', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> };

export type ArtistTopTracks_tracks = { __typename: 'Track', id: string, durationMs: number, explicit: boolean, name: string, album: { __typename: 'Album', id: string, images: Array<{ __typename: 'Image', url: string }> } };

export type Avatar_user = { __typename: 'User', id: string, images: Array<{ __typename: 'Image', url: string }> | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { me: { __typename: 'CurrentUser', user: { __typename: 'User', id: string, displayName: string | null, images: Array<{ __typename: 'Image', url: string }> | null } } | null };

export type DevicePopover_playbackState = { __typename: 'PlaybackState', isPlaying: boolean, device: { __typename: 'Device', id: string } };

export type DevicePopover_devices = { __typename: 'Device', id: string, name: string, type: string };

export type EpisodePlaybackDetails_episode = { __typename: 'Episode', id: string, name: string, show: { __typename: 'Show', id: string, name: string } };

export type EpisodeRemainingDuration_episode = { __typename: 'Episode', id: string, durationMs: number, resumePoint: { __typename: 'ResumePoint', fullyPlayed: boolean, resumePositionMs: number } };

export type Sidebar_currentUser = { __typename: 'CurrentUser', user: { __typename: 'User', id: string } };

export type Sidebar_playbackState = { __typename: 'PlaybackState', isPlaying: boolean, context: { __typename: 'PlaybackContext', uri: string } | null };

export type LikeControlQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type LikeControlQuery = { me: { __typename: 'CurrentUser', episodesContains: Array<boolean> | null, tracksContains: Array<boolean> | null } | null };

type LikeControl_playbackItem_Episode_ = { __typename: 'Episode', id: string };

type LikeControl_playbackItem_Track_ = { __typename: 'Track', id: string };

export type LikeControl_playbackItem = LikeControl_playbackItem_Episode_ | LikeControl_playbackItem_Track_;

export type PlaybackItemProgressBar_playbackState = { __typename: 'PlaybackState', isPlaying: boolean, progressMs: number | null, timestamp: number, item: { __typename: 'Episode', id: string, durationMs: number } | { __typename: 'Track', id: string, durationMs: number } | null };

export type PlaybackStateFragment = { __typename: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs: number | null, timestamp: number, actions: { __typename: 'Actions', disallows: Array<Action> }, context: { __typename: 'PlaybackContext', uri: string } | null, device: { __typename: 'Device', id: string, name: string, type: string, volumePercent: number }, item: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } | null };

export type PlaybackStateSubscriberQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaybackStateSubscriberQuery = { me: { __typename: 'CurrentUser', player: { __typename: 'Player', playbackState: { __typename: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs: number | null, timestamp: number, actions: { __typename: 'Actions', disallows: Array<Action> }, context: { __typename: 'PlaybackContext', uri: string } | null, device: { __typename: 'Device', id: string, name: string, type: string, volumePercent: number }, item: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } | null } | null } } | null };

export type PlaybackStateSubscriberSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PlaybackStateSubscriberSubscription = { playbackStateChanged: { __typename: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs: number | null, timestamp: number, actions: { __typename: 'Actions', disallows: Array<Action> }, context: { __typename: 'PlaybackContext', uri: string } | null, device: { __typename: 'Device', id: string, name: string, type: string, volumePercent: number }, item: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } | null } | null };

export type PlaybarQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaybarQuery = { me: { __typename: 'CurrentUser', player: { __typename: 'Player', devices: Array<{ __typename: 'Device', id: string, name: string, type: string }> | null } } | null };

export type Playbar_playbackState = { __typename: 'PlaybackState', isPlaying: boolean, repeatState: RepeatMode, shuffleState: boolean, progressMs: number | null, timestamp: number, actions: { __typename: 'Actions', disallows: Array<Action> }, device: { __typename: 'Device', id: string, name: string, type: string, volumePercent: number }, item: { __typename: 'Episode', id: string, durationMs: number, name: string, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, durationMs: number, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } | null };

export type PlaylistEpisodeContextMenu_currentUser = { __typename: 'CurrentUser', user: { __typename: 'User', id: string } };

export type PlaylistEpisodeContextMenu_episode = { __typename: 'Episode', id: string, uri: string };

export type PlaylistEpisodeContextMenu_playlist = { __typename: 'Playlist', id: string, owner: { __typename: 'User', id: string } };

export type PlaylistTable_currentUser = { __typename: 'CurrentUser', user: { __typename: 'User', id: string } };

export type PlaylistTable_playlist = { __typename: 'Playlist', id: string, uri: string, tracks: { __typename: 'PlaylistTrackConnection', edges: Array<{ __typename: 'PlaylistTrackEdge', addedAt: string | null, node: { __typename: 'Episode', id: string, name: string, durationMs: number, uri: string, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, show: { __typename: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, durationMs: number, uri: string, trackNumber: number | null, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } }> }, owner: { __typename: 'User', id: string } };

export type PlaylistTile_playlist = { __typename: 'Playlist', id: string, name: string, description: string | null, images: Array<{ __typename: 'Image', url: string }> };

export type PlaylistTitleCell_playbackState = { __typename: 'PlaybackState', context: { __typename: 'PlaybackContext', uri: string } | null, item: { __typename: 'Episode', id: string, uri: string } | { __typename: 'Track', id: string, uri: string } | null };

export type PlaylistTitleCell_playlist = { __typename: 'Playlist', id: string, uri: string };

type PlaylistTitleCell_playlistTrack_Episode_ = { __typename: 'Episode', id: string, name: string, uri: string, show: { __typename: 'Show', id: string, publisher: string, images: Array<{ __typename: 'Image', url: string }> } };

type PlaylistTitleCell_playlistTrack_Track_ = { __typename: 'Track', id: string, name: string, uri: string, artists: Array<{ __typename: 'Artist', id: string, name: string }>, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } };

export type PlaylistTitleCell_playlistTrack = PlaylistTitleCell_playlistTrack_Episode_ | PlaylistTitleCell_playlistTrack_Track_;

export type PlaylistTrackContextMenu_currentUser = { __typename: 'User', id: string };

export type PlaylistTrackContextMenu_track = { __typename: 'Track', id: string, uri: string, artists: Array<{ __typename: 'Artist', id: string }>, album: { __typename: 'Album', id: string } };

export type PlaylistTrackContextMenu_playlist = { __typename: 'Playlist', id: string, owner: { __typename: 'User', id: string } };

export type TrackNumberCell_playbackState = { __typename: 'PlaybackState', isPlaying: boolean, context: { __typename: 'PlaybackContext', uri: string } | null, item: { __typename: 'Episode', id: string, uri: string } | { __typename: 'Track', id: string, uri: string } | null };

export type TrackNumberCell_track = { __typename: 'Track', id: string, uri: string, trackNumber: number | null };

export type TrackPlaybackDetails_track = { __typename: 'Track', id: string, name: string, album: { __typename: 'Album', id: string, name: string }, artists: Array<{ __typename: 'Artist', id: string, name: string }> };

export type TrackTitleCell_playbackState = { __typename: 'PlaybackState', context: { __typename: 'PlaybackContext', uri: string } | null, item: { __typename: 'Episode', id: string, uri: string } | { __typename: 'Track', id: string, uri: string } | null };

export type TrackTitleCell_track = { __typename: 'Track', id: string, name: string, uri: string, album: { __typename: 'Album', id: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> };

export type AddToQueueMutationVariables = Exact<{
  input: AddItemToPlaybackQueueInput;
}>;


export type AddToQueueMutation = { addItemToPlaybackQueue: { __typename: 'AddItemToPlaybackQueuePayload', playbackQueue: { __typename: 'PlaybackQueue', currentlyPlaying: { __typename: 'Episode', id: string } | { __typename: 'Track', id: string } | null } | null } | null };

export type PausePlaybackMutationVariables = Exact<{ [key: string]: never; }>;


export type PausePlaybackMutation = { pausePlayback: { __typename: 'PausePlaybackResponse', playbackState: { __typename: 'PlaybackState', isPlaying: boolean } | null } | null };

export type RemoveSavedTracksMutationVariables = Exact<{
  input: RemoveSavedTracksInput;
}>;


export type RemoveSavedTracksMutation = { removeSavedTracks: { __typename: 'RemoveSavedTracksPayload', removedTracks: Array<{ __typename: 'Track', id: string }> | null } | null };

export type ResumePlaybackMutationVariables = Exact<{
  input?: InputMaybe<ResumePlaybackInput>;
}>;


export type ResumePlaybackMutation = { resumePlayback: { __typename: 'ResumePlaybackPayload', playbackState: { __typename: 'PlaybackState', isPlaying: boolean, context: { __typename: 'PlaybackContext', uri: string } | null } | null } | null };

export type UseResumePlaybackStateFragment = { __typename: 'PlaybackState', context: { __typename: 'PlaybackContext', uri: string } | null };

export type SaveTracksMutationVariables = Exact<{
  input: SaveTracksInput;
}>;


export type SaveTracksMutation = { saveTracks: { __typename: 'SaveTracksPayload', savedTracks: Array<{ __typename: 'Track', id: string }> | null } | null };

export type SeekToPositionMutationVariables = Exact<{
  positionMs: Scalars['Int'];
}>;


export type SeekToPositionMutation = { seekToPosition: { __typename: 'SeekToPositionResponse', playbackState: { __typename: 'PlaybackState', progressMs: number | null } | null } | null };

export type SetRepeatModeMutationVariables = Exact<{
  state: RepeatMode;
}>;


export type SetRepeatModeMutation = { setRepeatMode: { __typename: 'SetRepeatModeResponse', playbackState: { __typename: 'PlaybackState', repeatState: RepeatMode } | null } | null };

export type SetVolumeMutationVariables = Exact<{
  volumePercent: Scalars['Int'];
}>;


export type SetVolumeMutation = { setVolume: { __typename: 'SetVolumeResponse', playbackState: { __typename: 'PlaybackState', device: { __typename: 'Device', id: string, volumePercent: number } } | null } | null };

export type SetVolumeCacheFragment = { __typename: 'PlaybackState', device: { __typename: 'Device', id: string, volumePercent: number } };

export type ShufflePlaybackMutationVariables = Exact<{
  state: Scalars['Boolean'];
}>;


export type ShufflePlaybackMutation = { shufflePlayback: { __typename: 'ShufflePlaybackResponse', playbackState: { __typename: 'PlaybackState', shuffleState: boolean } | null } | null };

export type SkipToNextMutationVariables = Exact<{ [key: string]: never; }>;


export type SkipToNextMutation = { skipToNext: { __typename: 'SkipToNextResponse', playbackState: { __typename: 'PlaybackState', progressMs: number | null, item: { __typename: 'Episode', id: string, name: string, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } | null } | null } | null };

export type SkipToPreviousMutationVariables = Exact<{ [key: string]: never; }>;


export type SkipToPreviousMutation = { skipToPrevious: { __typename: 'SkipToPreviousResponse', playbackState: { __typename: 'PlaybackState', progressMs: number | null, item: { __typename: 'Episode', id: string, name: string, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } | null } | null } | null };

export type TransferPlaybackMutationVariables = Exact<{
  input: TransferPlaybackInput;
}>;


export type TransferPlaybackMutation = { transferPlayback: { __typename: 'TransferPlaybackPayload', playbackState: { __typename: 'PlaybackState', device: { __typename: 'Device', id: string } } | null } | null };

export type AlbumRouteQueryVariables = Exact<{
  albumId: Scalars['ID'];
}>;


export type AlbumRouteQuery = { album: { __typename: 'Album', id: string, albumType: AlbumType, name: string, totalTracks: number, uri: string, artists: Array<{ __typename: 'Artist', id: string, name: string }>, copyrights: Array<{ __typename: 'Copyright', text: string, type: CopyrightType | null }>, images: Array<{ __typename: 'Image', url: string }>, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, tracks: { __typename: 'AlbumTrackConnection', edges: Array<{ __typename: 'AlbumTrackEdge', node: { __typename: 'Track', id: string, durationMs: number, name: string, trackNumber: number | null, explicit: boolean, artists: Array<{ __typename: 'Artist', id: string, name: string }> } }> } | null } | null };

export type AlbumRoutePlaybackStateFragment = { __typename: 'PlaybackState', isPlaying: boolean, context: { __typename: 'PlaybackContext', uri: string } | null };

export type ArtistRouteQueryVariables = Exact<{
  artistId: Scalars['ID'];
}>;


export type ArtistRouteQuery = { artist: { __typename: 'Artist', id: string, name: string, albums: { __typename: 'ArtistAlbumsConnection', edges: Array<{ __typename: 'ArtistAlbumEdge', node: { __typename: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename: 'ReleaseDate', date: string }, images: Array<{ __typename: 'Image', url: string }> } }> } | null, singles: { __typename: 'ArtistAlbumsConnection', edges: Array<{ __typename: 'ArtistAlbumEdge', node: { __typename: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename: 'ReleaseDate', date: string }, images: Array<{ __typename: 'Image', url: string }> } }> } | null, appearsOn: { __typename: 'ArtistAlbumsConnection', edges: Array<{ __typename: 'ArtistAlbumEdge', node: { __typename: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename: 'ReleaseDate', date: string }, images: Array<{ __typename: 'Image', url: string }> } }> } | null, followers: { __typename: 'Followers', total: number }, images: Array<{ __typename: 'Image', url: string }>, relatedArtists: Array<{ __typename: 'Artist', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }>, topTracks: Array<{ __typename: 'Track', id: string, durationMs: number, explicit: boolean, name: string, album: { __typename: 'Album', id: string, images: Array<{ __typename: 'Image', url: string }> } }> } | null };

export type ArtistRouteQuery_albums = { __typename: 'ArtistAlbumsConnection', edges: Array<{ __typename: 'ArtistAlbumEdge', node: { __typename: 'Album', id: string, name: string, albumType: AlbumType, totalTracks: number, releaseDate: { __typename: 'ReleaseDate', date: string }, images: Array<{ __typename: 'Image', url: string }> } }> };

export type CollectionTracksRouteQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionTracksRouteQuery = { me: { __typename: 'CurrentUser', user: { __typename: 'User', id: string, displayName: string | null }, tracks: { __typename: 'SavedTracksConnection', pageInfo: { __typename: 'PageInfo', total: number }, edges: Array<{ __typename: 'SavedTrackEdge', addedAt: string, node: { __typename: 'Track', id: string, name: string, durationMs: number, uri: string, trackNumber: number | null, album: { __typename: 'Album', id: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } }> } | null } | null };

export type CollectionTracksRoutePlaylistStateFragment = { __typename: 'PlaybackState', isPlaying: boolean, context: { __typename: 'PlaybackContext', uri: string } | null };

export type EpisodeRouteQueryVariables = Exact<{
  episodeId: Scalars['ID'];
}>;


export type EpisodeRouteQuery = { episode: { __typename: 'Episode', id: string, name: string, durationMs: number, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, show: { __typename: 'Show', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, resumePoint: { __typename: 'ResumePoint', fullyPlayed: boolean, resumePositionMs: number } } | null };

export type IndexRouteQueryVariables = Exact<{
  timestamp?: InputMaybe<Scalars['DateTime']>;
}>;


export type IndexRouteQuery = { featuredPlaylists: { __typename: 'FeaturedPlaylistConnection', message: string, edges: Array<{ __typename: 'FeaturedPlaylistEdge', node: { __typename: 'Playlist', id: string, name: string, description: string | null, images: Array<{ __typename: 'Image', url: string }> } }> } | null };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { playlist: { __typename: 'Playlist', id: string, name: string, uri: string, images: Array<{ __typename: 'Image', url: string }>, owner: { __typename: 'User', id: string, displayName: string | null }, tracks: { __typename: 'PlaylistTrackConnection', pageInfo: { __typename: 'PageInfo', total: number }, edges: Array<{ __typename: 'PlaylistTrackEdge', addedAt: string | null, node: { __typename: 'Episode', id: string, name: string, durationMs: number, uri: string, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, show: { __typename: 'Show', id: string, name: string, publisher: string, images: Array<{ __typename: 'Image', url: string }> } } | { __typename: 'Track', id: string, name: string, durationMs: number, uri: string, trackNumber: number | null, album: { __typename: 'Album', id: string, name: string, images: Array<{ __typename: 'Image', url: string }> }, artists: Array<{ __typename: 'Artist', id: string, name: string }> } }> } } | null };

export type PlaylistRoutePlaybackStateFragment = { __typename: 'PlaybackState', isPlaying: boolean, context: { __typename: 'PlaybackContext', uri: string } | null };

export type RootQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type RootQuery = { me: { __typename: 'CurrentUser', playlists: { __typename: 'PlaylistConnection', edges: Array<{ __typename: 'PlaylistEdge', node: { __typename: 'Playlist', id: string, name: string, uri: string } }> } | null } | null };

export type Root_playbackState = { __typename: 'PlaybackState', context: { __typename: 'PlaybackContext', uri: string } | null };

export type ShowRouteQueryVariables = Exact<{
  showId: Scalars['ID'];
}>;


export type ShowRouteQuery = { show: { __typename: 'Show', id: string, description: string, name: string, publisher: string, episodes: { __typename: 'ShowEpisodesConnection', edges: Array<{ __typename: 'ShowEpisodeEdge', node: { __typename: 'Episode', id: string, name: string, durationMs: number, uri: string, releaseDate: { __typename: 'ReleaseDate', date: string, precision: ReleaseDatePrecision }, resumePoint: { __typename: 'ResumePoint', fullyPlayed: boolean, resumePositionMs: number } } }> } | null, images: Array<{ __typename: 'Image', url: string }> } | null };

export type ShowRoute_playbackState = { __typename: 'PlaybackState', isPlaying: boolean, item: { __typename: 'Episode', id: string, uri: string } | { __typename: 'Track', id: string, uri: string } | null };

export type TrackRouteQueryVariables = Exact<{
  trackId: Scalars['ID'];
}>;


export type TrackRouteQuery = { track: { __typename: 'Track', id: string, durationMs: number, name: string, album: { __typename: 'Album', id: string, albumType: AlbumType, name: string, images: Array<{ __typename: 'Image', url: string }>, tracks: { __typename: 'AlbumTrackConnection', edges: Array<{ __typename: 'AlbumTrackEdge', node: { __typename: 'Track', id: string, durationMs: number, trackNumber: number | null, name: string, explicit: boolean, artists: Array<{ __typename: 'Artist', id: string, name: string }> } }> } | null }, artists: Array<{ __typename: 'Artist', id: string, name: string, topTracks: Array<{ __typename: 'Track', id: string, durationMs: number, explicit: boolean, name: string, album: { __typename: 'Album', id: string, images: Array<{ __typename: 'Image', url: string }> } }>, images: Array<{ __typename: 'Image', url: string }> }> } | null };
