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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  CountryCode: { input: any; output: any };
  DateTime: { input: any; output: any };
  ErrorRate: { input: any; output: any };
  Timestamp: { input: any; output: any };
};

export enum Action {
  INTERRUPTING_PLAYBACK = 'INTERRUPTING_PLAYBACK',
  PAUSING = 'PAUSING',
  RESUMING = 'RESUMING',
  SEEKING = 'SEEKING',
  SKIPPING_NEXT = 'SKIPPING_NEXT',
  SKIPPING_PREV = 'SKIPPING_PREV',
  TOGGLING_REPEAT_CONTEXT = 'TOGGLING_REPEAT_CONTEXT',
  TOGGLING_REPEAT_TRACK = 'TOGGLING_REPEAT_TRACK',
  TOGGLING_SHUFFLE = 'TOGGLING_SHUFFLE',
  TRANSFERRING_PLAYBACK = 'TRANSFERRING_PLAYBACK',
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
  deviceId?: InputMaybe<Scalars['ID']['input']>;
  /** The uri of the item to add to the queue. Must be a track or an episode uri. */
  uri: Scalars['String']['input'];
};

export type AddItemToPlaybackQueuePayload = {
  __typename: 'AddItemToPlaybackQueuePayload';
  playbackQueue: Maybe<PlaybackQueue>;
};

export type AddItemsToPlaylistInput = {
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the playlist.
   */
  playlistId: Scalars['ID']['input'];
  /**
   * The position to insert the items, a zero-based index. For example, to insert
   * the items in the first position: **position=0**; to insert the items in the
   * third position: **position=2**. If omitted, the items will be appended to the
   * playlist. Items are added in the order they are listed in the query string or
   * request body.
   */
  position?: InputMaybe<Scalars['Int']['input']>;
  /**
   * A comma-separated list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * to add, can be track or episode URIs. A maximum of 100 items can be added in
   * one request.
   */
  uris: Array<Scalars['String']['input']>;
};

export type AddItemsToPlaylistPayload = {
  __typename: 'AddItemsToPlaylistPayload';
  /** The playlist that contains the newly added items */
  playlist: Maybe<Playlist>;
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
  genres: Array<Scalars['String']['output']>;
  /** A link to the Web API endpoint providing full details of the album. */
  href: Scalars['String']['output'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  id: Scalars['ID']['output'];
  /** The cover art for the album in various sizes, widest first. */
  images: Array<Image>;
  /** The label the album was released under. */
  label: Maybe<Scalars['String']['output']>;
  /**
   * The name of the album. In case of an album takedown, the value may be an empty
   * string.
   */
  name: Scalars['String']['output'];
  /** The date the album was first released. */
  releaseDate: ReleaseDate;
  /** The number of tracks in the album. */
  totalTracks: Scalars['Int']['output'];
  /** The tracks of the album. */
  tracks: Maybe<AlbumTrackConnection>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: Scalars['String']['output'];
};

/** Spotify catalog information for an album. */
export type AlbumtracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum AlbumGroup {
  ALBUM = 'ALBUM',
  APPEARS_ON = 'APPEARS_ON',
  COMPILATION = 'COMPILATION',
  SINGLE = 'SINGLE',
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
  ALBUM = 'ALBUM',
  COMPILATION = 'COMPILATION',
  SINGLE = 'SINGLE',
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
  genres: Array<Scalars['String']['output']>;
  /** A link to the Web API endpoint providing full details of the artist. */
  href: Scalars['String']['output'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the artist.
   */
  id: Scalars['ID']['output'];
  /** Images of the artist in various sizes, widest first. */
  images: Array<Image>;
  /** The name of the artist. */
  name: Scalars['String']['output'];
  /**
   * The popularity of the artist. The value will be between 0 and 100, with 100
   * being the most popular. The artist's popularity is calculated from the
   * popularity of all the artist's tracks.
   */
  popularity: Scalars['Int']['output'];
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
  uri: Scalars['String']['output'];
};

/** Spotify catalog information for an artist. */
export type ArtistalbumsArgs = {
  includeGroups?: InputMaybe<Array<AlbumGroup>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtistAlbumEdge = {
  __typename: 'ArtistAlbumEdge';
  /** Spotify catalog information for the album. */
  node: Album;
};

export type ArtistAlbumsConnection = {
  __typename: 'ArtistAlbumsConnection';
  /** A list of albums that belong to the artist. */
  edges: Maybe<Array<ArtistAlbumEdge>>;
  /** "Pagination information for the set of albums" */
  pageInfo: PageInfo;
};

export enum ColorFormat {
  RGB = 'RGB',
}

export type Contains = {
  __typename: 'Contains';
  /**
   * List of booleans in order of albums requested. `true` means the album is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  albums: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * List of booleans in order of episodes requested. `true` means the episode is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  episodes: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * List of booleans in order of shows requested. `true` means the show is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  shows: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * List of booleans in order of tracks requested. `true` means the track is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  tracks: Maybe<Array<Scalars['Boolean']['output']>>;
};

export type Copyright = {
  __typename: 'Copyright';
  /** The copyright text for this content. */
  text: Scalars['String']['output'];
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
  P = 'P',
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
  albumsContains: Maybe<Array<Scalars['Boolean']['output']>>;
  episodes: Maybe<SavedEpisodesConnection>;
  /**
   * Check if one or more episodes is already saved in the current Spotify user's
   * 'Your Episodes' library.
   */
  episodesContains: Maybe<Array<Scalars['Boolean']['output']>>;
  /** Get the current user's followed artists. */
  followedArtists: Maybe<FollowedArtistsConnection>;
  /** Information about the user's current playback state */
  player: Player;
  /** Playlists owned or followed by the current Spotify user. */
  playlists: Maybe<PlaylistConnection>;
  /** Get detailed profile information about the current user (including the current user's username). */
  profile: CurrentUserProfile;
  /** Get a list of the albums saved in the current Spotify user's 'Your Music' library. */
  shows: Maybe<SavedShowsConnection>;
  /**
   * Check if one or more shows is already saved in the current Spotify user's
   * library.
   */
  showsContains: Maybe<Array<Scalars['Boolean']['output']>>;
  /** Get the current user's top artists based on calculated affinity. */
  topArtists: Maybe<TopArtistsConnection>;
  /** Get the current user's top tracks based on calculated affinity. */
  topTracks: Maybe<TopTracksConnection>;
  tracks: Maybe<SavedTracksConnection>;
  /**
   * Check if one or more tracks is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  tracksContains: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * Detailed profile information about the current user.
   * @deprecated Use the profile field instead which provides richer current user information.
   */
  user: User;
};

export type CurrentUseralbumsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUseralbumsContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserepisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserepisodesContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserfollowedArtistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserplaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUsershowsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUsershowsContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUsertopArtistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timeRange?: InputMaybe<TimeRange>;
};

export type CurrentUsertopTracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timeRange?: InputMaybe<TimeRange>;
};

export type CurrentUsertracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUsertracksContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserProfile = UserProfile & {
  __typename: 'CurrentUserProfile';
  /**
   * The country of the user, as set in the user's account profile. An ISO 3166-1
   * alpha-2 country code.
   */
  country: Maybe<Scalars['CountryCode']['output']>;
  /** The name displayed on the user's profile. `null` if not available. */
  displayName: Maybe<Scalars['String']['output']>;
  /**
   * The user's email address, as entered by the user when creating their account.
   * _**Important!** This email address is unverified; there is no proof that it
   * actually belongs to the user._
   */
  email: Scalars['String']['output'];
  /** The user's explicit content settings. */
  explicitContent: ExplicitContentSettings;
  /** Information about the followers of the user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String']['output'];
  /**
   * The [Spotify user ID](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  id: Scalars['ID']['output'];
  /** The user's profile image. */
  images: Maybe<Array<Image>>;
  /**
   * The user's Spotify subscription level: "premium", "free", etc. (The
   * subscription level "open" can be considered the same as "free".)
   */
  product: Scalars['String']['output'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids)
   * for the user.
   */
  uri: Scalars['String']['output'];
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
  isPlaying: Scalars['Boolean']['output'];
  /** The currently playing track or episode */
  item: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs: Maybe<Scalars['Int']['output']>;
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp']['output'];
};

export type Cursors = {
  __typename: 'Cursors';
  /** The cursor to use as key to find the next page of items. */
  after: Maybe<Scalars['String']['output']>;
  /** The ursor to use as key to find the previous page of items. */
  before: Maybe<Scalars['String']['output']>;
};

export type Developer = {
  __typename: 'Developer';
  /**
   * A list of configured GraphQL fields. Only fields that have non-zero timeouts
   * and error rates will be listed.
   */
  fieldConfigs: Array<FieldConfig>;
};

export type Device = {
  __typename: 'Device';
  /** The device ID */
  id: Maybe<Scalars['ID']['output']>;
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

/** Spotify catalog information for an episode. */
export type Episode = PlaybackItem &
  PlaylistTrack & {
    __typename: 'Episode';
    /** A URL to a 30 second preview (MP3 format) of the episode. `null` if not available. */
    audioPreviewUrl: Maybe<Scalars['String']['output']>;
    /** A description of the episode */
    description: Scalars['String']['output'];
    /** The episode length in milliseconds. */
    durationMs: Scalars['Int']['output'];
    /**
     * Whether or not the episode has explicit content (`true` = yes it does;
     * `false` = no it does not OR unknown).
     */
    explicit: Scalars['Boolean']['output'];
    /** External URLs for this episode. */
    externalUrls: ExternalUrl;
    /** A link to the Web API endpoint providing full details of the episode. */
    href: Scalars['String']['output'];
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode. */
    id: Scalars['ID']['output'];
    /** The cover art for the episode in various sizes, widest first. */
    images: Array<Image>;
    /** `true` if the episode is hosted outside of Spotify's CDN. */
    isExternallyHosted: Scalars['Boolean']['output'];
    /** `true` if the episode is playable in the given market. Otherwise `false`. */
    isPlayable: Scalars['Boolean']['output'];
    /**
     * A list of the languages used in the episode, identified by their
     * [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
     */
    languages: Array<Scalars['String']['output']>;
    /** The name of the episode. */
    name: Scalars['String']['output'];
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
    uri: Scalars['String']['output'];
  };

/** Spotify catalog information for an episode. */
export type EpisodedescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

export type ExplicitContentSettings = {
  __typename: 'ExplicitContentSettings';
  /** When `true`, indicates that explicit content should not be played. */
  filterEnabled: Scalars['Boolean']['output'];
  /**
   * When `true`, indicates that the explicit content setting is locked and can't
   * be changed by the user.
   */
  filterLocked: Scalars['Boolean']['output'];
};

export type ExternalUrl = {
  __typename: 'ExternalUrl';
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the object.
   */
  spotify: Maybe<Scalars['String']['output']>;
};

export type FeaturedPlaylistConnection = {
  __typename: 'FeaturedPlaylistConnection';
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify player's
   * 'Browse' tab).
   */
  edges: Array<FeaturedPlaylistEdge>;
  message: Scalars['String']['output'];
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
  errorRate: Scalars['ErrorRate']['output'];
  /** The schema field that includes this config */
  schemaField: SchemaField;
  /** The synthetic timeout configured for the field. */
  timeout: Scalars['Int']['output'];
};

export type FieldConfigInput = {
  /**
   * The synthetic error rate configured for a field. This should be a value
   * between `0` and `1` where `0` means no synthetic errors should be thrown and
   * `1` means errors should be thrown 100% of the time. Set to `null` to reset the
   * value back to its default. Omit this field to maintain its value. Defaults to
   * `0`.
   */
  errorRate?: InputMaybe<Scalars['ErrorRate']['input']>;
  /**
   * The synthetic timeout configured for a field. Set to `null` to reset the value
   * back to its default. Omit this field to maintain its value. Defaults to `0`.
   */
  timeout?: InputMaybe<Scalars['Int']['input']>;
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

export type FollowedArtistEdge = {
  __typename: 'FollowedArtistEdge';
  /** The followed artist */
  node: Artist;
};

export type FollowedArtistsConnection = {
  __typename: 'FollowedArtistsConnection';
  /** The list of followed artists. */
  edges: Array<FollowedArtistEdge>;
  /** Pagination information for the set of followed artists. */
  pageInfo: PageInfoCursorBased;
};

export type Followers = {
  __typename: 'Followers';
  /** The total number of followers. */
  total: Scalars['Int']['output'];
};

export type Image = {
  __typename: 'Image';
  /** The image height in pixels. */
  height: Maybe<Scalars['Int']['output']>;
  /** The source URL of the image. */
  url: Scalars['String']['output'];
  vibrantColor: Maybe<Scalars['String']['output']>;
  /** The image width in pixels. */
  width: Maybe<Scalars['Int']['output']>;
};

export type ImagevibrantColorArgs = {
  alpha?: InputMaybe<Scalars['Float']['input']>;
  format: ColorFormat;
};

export type Mutation = {
  __typename: 'Mutation';
  /** Add an item to the end of the user's current playback queue. */
  addItemToPlaybackQueue: Maybe<AddItemToPlaybackQueuePayload>;
  /** Add one or more items to a user's playlist. */
  addItemsToPlaylist: Maybe<AddItemsToPlaylistPayload>;
  /** Pause playback on the user's account. */
  pausePlayback: Maybe<PausePlaybackResponse>;
  /** Remove one or more items from a user's playlist. */
  removeItemFromPlaylist: Maybe<RemoveItemFromPlaylistPayload>;
  /** Remove one or more albums from the current user's 'Your Music' library. */
  removeSavedAlbums: Maybe<RemoveSavedAlbumsPayload>;
  /** Remove one or more episodes from the current user's library. */
  removeSavedEpisodes: Maybe<RemoveSavedEpisodesPayload>;
  /** Delete one or more shows from current Spotify user's library. */
  removeSavedShows: Maybe<RemoveSavedShowsPayload>;
  /** Remove one or more tracks from the current user's 'Your Music' library. */
  removeSavedTracks: Maybe<RemoveSavedTracksPayload>;
  /** Reset a field's config back to its default values. */
  resetFieldConfig: Maybe<ResetFieldConfigPayload>;
  /** Start a new context or resume current playback on the user's active device. */
  resumePlayback: Maybe<ResumePlaybackPayload>;
  /** Save one or more albums to the current user's 'Your Music' library. */
  saveAlbums: Maybe<SaveAlbumsPayload>;
  /** Save one or more episodes to the current user's library. */
  saveEpisodes: Maybe<SaveEpisodesPayload>;
  /** Save one or more shows to current Spotify user's library. */
  saveShows: Maybe<SaveShowsPayload>;
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
  updateFieldConfig: Maybe<UpdateFieldConfigPayload>;
};

export type MutationaddItemToPlaybackQueueArgs = {
  input: AddItemToPlaybackQueueInput;
};

export type MutationaddItemsToPlaylistArgs = {
  input: AddItemsToPlaylistInput;
};

export type MutationpausePlaybackArgs = {
  context?: InputMaybe<PausePlaybackContextInput>;
};

export type MutationremoveItemFromPlaylistArgs = {
  input: RemoveItemFromPlaylistInput;
};

export type MutationremoveSavedAlbumsArgs = {
  input: RemoveSavedAlbumsInput;
};

export type MutationremoveSavedEpisodesArgs = {
  input: RemoveSavedEpisodesInput;
};

export type MutationremoveSavedShowsArgs = {
  input: RemoveSavedShowsInput;
};

export type MutationremoveSavedTracksArgs = {
  input: RemoveSavedTracksInput;
};

export type MutationresetFieldConfigArgs = {
  input: ResetFieldConfigInput;
};

export type MutationresumePlaybackArgs = {
  input?: InputMaybe<ResumePlaybackInput>;
};

export type MutationsaveAlbumsArgs = {
  input: SaveAlbumsInput;
};

export type MutationsaveEpisodesArgs = {
  input: SaveEpisodesInput;
};

export type MutationsaveShowsArgs = {
  input: SaveShowsInput;
};

export type MutationsaveTracksArgs = {
  input: SaveTracksInput;
};

export type MutationseekToPositionArgs = {
  context?: InputMaybe<SeekToPositionContextInput>;
  positionMs: Scalars['Int']['input'];
};

export type MutationsetRepeatModeArgs = {
  context?: InputMaybe<SetRepeatModeContextInput>;
  state: RepeatMode;
};

export type MutationsetVolumeArgs = {
  context?: InputMaybe<SetVolumeContextInput>;
  volumePercent: Scalars['Int']['input'];
};

export type MutationshufflePlaybackArgs = {
  context?: InputMaybe<ShufflePlaybackContextInput>;
  state: Scalars['Boolean']['input'];
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
  input: UpdateFieldConfigInput;
};

export type NewReleaseEdge = {
  __typename: 'NewReleaseEdge';
  /** The newly released album */
  node: Album;
};

export type NewReleasesConnection = {
  __typename: 'NewReleasesConnection';
  /** The list of new releases */
  edges: Array<NewReleaseEdge>;
  /** Pagination information for the new releases */
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename: 'PageInfo';
  /** Whether there is a next page of items. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there is a previous page of items. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The maximum number of items in the response (as set in the query or default) */
  limit: Scalars['Int']['output'];
  /** The offset of the items returned (as set in the query or default) */
  offset: Scalars['Int']['output'];
  /** The total number of items returned for the page. */
  total: Scalars['Int']['output'];
};

export type PageInfoCursorBased = {
  __typename: 'PageInfoCursorBased';
  /** The cursors used to find the next set of items. */
  cursors: Maybe<Cursors>;
  /** A link to the Web API endpoint returning the full result of the request. */
  href: Scalars['String']['output'];
  /** The maximum number of items in the response (as set in the query or default) */
  limit: Scalars['Int']['output'];
  /** URL to the next page of items. (`null` if none) */
  next: Maybe<Scalars['String']['output']>;
  /** The total number of items available to return. */
  total: Scalars['Int']['output'];
};

export type PausePlaybackContextInput = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's
   * currently active device is the target.
   */
  deviceId?: InputMaybe<Scalars['String']['input']>;
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
  href: Scalars['String']['output'];
  /** The object type, e.g. "artist", "playlist", "album", "show". */
  type: PlaybackContextType;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the context.
   */
  uri: Scalars['String']['output'];
};

export enum PlaybackContextType {
  ALBUM = 'ALBUM',
  ARTIST = 'ARTIST',
  AUDIO_FEATURES = 'AUDIO_FEATURES',
  COLLECTION = 'COLLECTION',
  COLLECTION_YOUR_EPISODES = 'COLLECTION_YOUR_EPISODES',
  EPISODE = 'EPISODE',
  GENRE = 'GENRE',
  PLAYLIST = 'PLAYLIST',
  SHOW = 'SHOW',
  TRACK = 'TRACK',
  USER = 'USER',
}

export type PlaybackItem = {
  /** The duration for the playback item in milliseconds. */
  durationMs: Scalars['Int']['output'];
  /** Known external URLs for this playback item. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the playlist item. */
  href: Scalars['String']['output'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playback item.
   */
  id: Scalars['ID']['output'];
  /** The name of the playlist item. */
  name: Scalars['String']['output'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the episode.
   */
  uri: Scalars['String']['output'];
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
  isPlaying: Scalars['Boolean']['output'];
  /** The currently playing track or episode */
  item: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs: Maybe<Scalars['Int']['output']>;
  /** off, track, context */
  repeatState: RepeatMode;
  /** If shuffle is on or off. */
  shuffleState: Scalars['Boolean']['output'];
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp']['output'];
};

export type Player = {
  __typename: 'Player';
  /** Information about the object currently being played on the user's Spotify account. */
  currentlyPlaying: Maybe<CurrentlyPlaying>;
  /** Information about a user's available devices. */
  devices: Maybe<Array<Device>>;
  /** Get the list of objects that make up the user's queue. */
  playbackQueue: Maybe<PlaybackQueue>;
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
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/** Information about a playlist owned by a Spotify user */
export type Playlist = {
  __typename: 'Playlist';
  /** `true` if the owner allows other users to modify the playlist. */
  collaborative: Scalars['Boolean']['output'];
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  description: Maybe<Scalars['String']['output']>;
  /** Known external URLs for this playlist. */
  externalUrls: ExternalUrl;
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist.
   */
  id: Scalars['ID']['output'];
  /**
   * Images for the playlist. The array may be empty or contain up to three images.
   * The images are returned by size in descending order.
   * See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
   * **Note**: If returned, the source URL for the image (`url`) is temporary and
   * will expire in less than a day.
   */
  images: Maybe<Array<Image>>;
  /** The name of the playlist. */
  name: Scalars['String']['output'];
  /** The user who owns the playlist. */
  owner: User;
  /**
   * The playlist's public/private status: `true` the playlist is public, `false`
   * the playlist is private, `null` the playlist status is not relevant. For more
   * about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/)
   */
  public: Maybe<Scalars['Boolean']['output']>;
  /** The tracks of the playlist. */
  tracks: PlaylistTrackConnection;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  uri: Scalars['String']['output'];
};

/** Information about a playlist owned by a Spotify user */
export type PlaylisttracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  durationMs: Scalars['Int']['output'];
  /** External URLs for this episode. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the episode. */
  href: Scalars['String']['output'];
  /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist track. */
  id: Scalars['ID']['output'];
  /** The name of the episode. */
  name: Scalars['String']['output'];
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the playlist track.
   */
  uri: Scalars['String']['output'];
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
  addedAt: Maybe<Scalars['DateTime']['output']>;
  /** The user that added the track to the playlist */
  addedBy: User;
  /** The playlist track */
  node: PlaylistTrack;
};

export type Query = {
  __typename: 'Query';
  /** Spotify catalog information for an album. */
  album: Maybe<Album>;
  /** Get Spotify catalog information for multiple albums identified by their Spotify IDs. */
  albums: Maybe<Array<Album>>;
  /** Spotify catalog information for an artist. */
  artist: Maybe<Artist>;
  /** Get Spotify catalog information for several artists based on their Spotify IDs. */
  artists: Maybe<Array<Artist>>;
  /** Get a list of developer-specific settings, such as GraphQL field configuration. */
  developer: Developer;
  /**
   * Get Spotify catalog information for a single episode identified by its unique
   * Spotify ID.
   */
  episode: Maybe<Episode>;
  /** Get Spotify catalog information for several episodes based on their Spotify IDs. */
  episodes: Maybe<Array<Episode>>;
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify
   * player's 'Browse' tab).
   */
  featuredPlaylists: Maybe<FeaturedPlaylistConnection>;
  /**
   * A list of available genres seed parameter values for
   * [recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations).
   */
  genres: Array<Scalars['String']['output']>;
  /** Information about the current logged-in user. */
  me: Maybe<CurrentUser>;
  /** Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab). */
  newReleases: Maybe<NewReleasesConnection>;
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
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string.
   *
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  search: Maybe<SearchResults>;
  /**
   * Get Spotify catalog information for a single show identified by its unique
   * Spotify ID.
   */
  show: Maybe<Show>;
  /** Get Spotify catalog information for several shows based on their Spotify IDs. */
  shows: Maybe<Array<Show>>;
  /**
   * Get Spotify catalog information for a single track identified by its unique
   * Spotify ID.
   */
  track: Maybe<Track>;
  /** Get Spotify catalog information for multiple tracks based on their Spotify IDs. */
  tracks: Maybe<Array<Track>>;
  /** Get audio features for multiple tracks based on their Spotify IDs. */
  tracksAudioFeatures: Array<TrackAudioFeatures>;
};

export type QueryalbumArgs = {
  id: Scalars['ID']['input'];
};

export type QueryalbumsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryartistArgs = {
  id: Scalars['ID']['input'];
};

export type QueryartistsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryepisodeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryepisodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryfeaturedPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QuerynewReleasesArgs = {
  country?: InputMaybe<Scalars['CountryCode']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryplaylistArgs = {
  id: Scalars['ID']['input'];
};

export type QueryrecommendationsArgs = {
  acousticness?: InputMaybe<RecommendationAcousticnessInput>;
  danceability?: InputMaybe<RecommendationDanceabilityInput>;
  durationMs?: InputMaybe<RecommendationDurationMsInput>;
  energy?: InputMaybe<RecommendationEnergyInput>;
  instrumentalness?: InputMaybe<RecommendationInstrumentalnessInput>;
  key?: InputMaybe<RecommendationKeyInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  liveness?: InputMaybe<RecommendationLivenessInput>;
  loudness?: InputMaybe<RecommendationLoudnessInput>;
  mode?: InputMaybe<RecommendationModeInput>;
  popularity?: InputMaybe<RecommendationPopularityInput>;
  seeds: RecommendationSeedInput;
  speechiness?: InputMaybe<RecommendationSpeechinessInput>;
  tempo?: InputMaybe<RecommendationTempoInput>;
  timeSignature?: InputMaybe<RecommendationTimeSignatureInput>;
  valence?: InputMaybe<RecommendationValenceInput>;
};

export type QuerysearchArgs = {
  includeExternal?: InputMaybe<SearchExternalValue>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q: Scalars['String']['input'];
  type: Array<SearchType>;
};

export type QueryshowArgs = {
  id: Scalars['ID']['input'];
};

export type QueryshowsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QuerytrackArgs = {
  id: Scalars['ID']['input'];
};

export type QuerytracksArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QuerytracksAudioFeaturesArgs = {
  ids: Array<Scalars['ID']['input']>;
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
  playedAt: Scalars['DateTime']['output'];
};

export type RecommendationAcousticnessInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationDanceabilityInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationDurationMsInput = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  target?: InputMaybe<Scalars['Int']['input']>;
};

export type RecommendationEnergyInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationInstrumentalnessInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationKeyInput = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  target?: InputMaybe<Scalars['Int']['input']>;
};

export type RecommendationLivenessInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationLoudnessInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationModeInput = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  target?: InputMaybe<Scalars['Int']['input']>;
};

export type RecommendationPopularityInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

/** Information about a recommendation [seed object](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
export type RecommendationSeed = {
  __typename: 'RecommendationSeed';
  /**
   * The number of tracks available after min_* and max_* filters have been
   * applied.
   */
  afterFilteringSize: Scalars['Int']['output'];
  /** The number of tracks available after relinking for regional availability. */
  afterRelinkingSize: Scalars['Int']['output'];
  /**
   * A link to the full track or artist data for this seed. For tracks this will
   * be a link to a [Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackobject).
   * For artists a link to an [Artist Object](https://developer.spotify.com/documentation/web-api/reference/#object-artistobject).
   * For genre seeds, this value will be `null`.
   */
  href: Maybe<Scalars['String']['output']>;
  /**
   * The id used to select this seed. This will be the same as the string used in
   * the `seedArtists`, `seedTracks` or `seedGenres` parameter.
   */
  id: Scalars['ID']['output'];
  /** The number of recommended tracks available for this seed. */
  initialPoolSize: Scalars['Int']['output'];
  /** The entity type of this seed. */
  type: RecommendationSeedType;
};

export type RecommendationSeedInput = {
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for seed artists. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["4NHQUGzhtTLFvgF5SZesLK"]
   */
  seedArtists?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**
   * A list of any genres in the set of available genre seeds. Up to 5 seed values may be provided in any combination of `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["classical", "country"]
   */
  seedGenres?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * A list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for a seed track. Up to 5 seed values may be provided in any combination of
   * `seedArtists`, `seedTracks` and `seedGenres`.
   *
   * Example value: ["0c6xIDDpzE81m2q797ordA"]
   */
  seedTracks?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Available entity types for recommendation seeds. */
export enum RecommendationSeedType {
  ARTIST = 'ARTIST',
  GENRE = 'GENRE',
  TRACK = 'TRACK',
}

export type RecommendationSpeechinessInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationTempoInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

export type RecommendationTimeSignatureInput = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  target?: InputMaybe<Scalars['Int']['input']>;
};

export type RecommendationValenceInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  target?: InputMaybe<Scalars['Float']['input']>;
};

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
  date: Scalars['String']['output'];
  /** The precision with which the `date` value is known. */
  precision: ReleaseDatePrecision;
};

export enum ReleaseDatePrecision {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export type RemoveItemFromPlaylistInput = {
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the playlist.
   */
  playlistId: Scalars['ID']['input'];
  /**
   * The playlist's snapshot ID against which you want to make the changes. The API
   * will validate that the specified items exist and in the specified positions
   * and make the changes, even if more recent changes have been made to the
   * playlist.
   */
  snapshotId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * An array of objects containing [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * of the tracks or episodes to remove.
   */
  tracks: Array<RemoveItemFromPlaylistTrackInput>;
};

export type RemoveItemFromPlaylistPayload = {
  __typename: 'RemoveItemFromPlaylistPayload';
  /** The playlist after the item was removed */
  playlist: Maybe<Playlist>;
  /** A snapshot ID for the playlist */
  snapshotId: Maybe<Scalars['ID']['output']>;
};

export type RemoveItemFromPlaylistTrackInput = {
  uri: Scalars['String']['input'];
};

export type RemoveSavedAlbumsInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 20 IDs.
   */
  ids: Array<Scalars['ID']['input']>;
};

export type RemoveSavedAlbumsPayload = {
  __typename: 'RemoveSavedAlbumsPayload';
  /** The albums that were removed from the Spotify user's library. */
  removedAlbums: Maybe<Array<Album>>;
};

export type RemoveSavedEpisodesInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']['input']>;
};

export type RemoveSavedEpisodesPayload = {
  __typename: 'RemoveSavedEpisodesPayload';
  /** The episodes that were removed from the Spotify user's library. */
  removedEpisodes: Maybe<Array<Episode>>;
};

export type RemoveSavedShowsInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * for the shows. Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']['input']>;
};

export type RemoveSavedShowsPayload = {
  __typename: 'RemoveSavedShowsPayload';
  /** The shows that were removed from the Spotify user's library. */
  removedShows: Maybe<Array<Show>>;
};

export type RemoveSavedTracksInput = {
  /**
   * A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']['input']>;
};

export type RemoveSavedTracksPayload = {
  __typename: 'RemoveSavedTracksPayload';
  /** The tracks that were removed from the Spotify user's library. */
  removedTracks: Maybe<Array<Track>>;
};

export enum RepeatMode {
  CONTEXT = 'CONTEXT',
  OFF = 'OFF',
  TRACK = 'TRACK',
}

export type ResetFieldConfigInput = {
  /** The field that will be reset to its default values */
  field: FieldInput;
};

export type ResetFieldConfigPayload = {
  __typename: 'ResetFieldConfigPayload';
  /** The updated field config */
  fieldConfig: Maybe<FieldConfig>;
};

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
  __typename: 'ResumePlaybackPayload';
  playbackState: Maybe<PlaybackState>;
};

export type ResumePoint = {
  __typename: 'ResumePoint';
  /** Whether or not the episode has been fully played by the user. */
  fullyPlayed: Scalars['Boolean']['output'];
  /** The user's most recent position in the episode in milliseconds. */
  resumePositionMs: Scalars['Int']['output'];
};

export type SaveAlbumsInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the albums. Maximum: 20 IDs
   */
  ids: Array<Scalars['ID']['input']>;
};

export type SaveAlbumsPayload = {
  __typename: 'SaveAlbumsPayload';
  /** The albums that were saved to the Spotify user's library */
  savedAlbums: Maybe<Array<Album>>;
};

export type SaveEpisodesInput = {
  /**
   * An list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']['input']>;
};

export type SaveEpisodesPayload = {
  __typename: 'SaveEpisodesPayload';
  /** The episodes that were saved to the Spotify user's library */
  savedEpisodes: Maybe<Array<Episode>>;
};

export type SaveShowsInput = {
  /**
   * An list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * for the shows. Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']['input']>;
};

export type SaveShowsPayload = {
  __typename: 'SaveShowsPayload';
  /** The shows that were saved to the Spotify user's library */
  savedShows: Maybe<Array<Show>>;
};

export type SaveTracksInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']['input']>;
};

export type SaveTracksPayload = {
  __typename: 'SaveTracksPayload';
  /** The tracks that were saved to the Spotify user's library */
  savedTracks: Maybe<Array<Track>>;
};

export type SavedAlbumEdge = {
  __typename: 'SavedAlbumEdge';
  /** The date the album was saved. */
  addedAt: Scalars['DateTime']['output'];
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

export type SavedEpisodeEdge = {
  __typename: 'SavedEpisodeEdge';
  /** The date the episode was saved. */
  addedAt: Scalars['DateTime']['output'];
  /** The saved episode. */
  node: Episode;
};

export type SavedEpisodesConnection = {
  __typename: 'SavedEpisodesConnection';
  /** The list of saved episodes. */
  edges: Array<SavedEpisodeEdge>;
  /** Pagination information for the set of episodes */
  pageInfo: PageInfo;
};

export type SavedShowEdge = {
  __typename: 'SavedShowEdge';
  /** The date the show was saved. */
  addedAt: Scalars['DateTime']['output'];
  /** The show */
  node: Show;
};

export type SavedShowsConnection = {
  __typename: 'SavedShowsConnection';
  /** A list of saved shows. */
  edges: Array<SavedShowEdge>;
  /** "Pagination information for the set of saved shows" */
  pageInfo: PageInfo;
};

export type SavedTrackEdge = {
  __typename: 'SavedTrackEdge';
  /** The date the track was saved. */
  addedAt: Scalars['DateTime']['output'];
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
  fieldName: Scalars['String']['output'];
  /** The parent type name in the schema (ex: `User`) */
  typename: Scalars['String']['output'];
};

export type SchemaFieldInput = {
  /** The name of the field in the type (ex: `firstName`) */
  fieldName: Scalars['String']['input'];
  /** The parent type name in the schema (ex: `User`) */
  typename: Scalars['String']['input'];
};

export type SearchAlbumEdge = {
  __typename: 'SearchAlbumEdge';
  /** The album returned from the search */
  node: Album;
};

export type SearchAlbumsConnection = {
  __typename: 'SearchAlbumsConnection';
  /** The list of albums returned from the search */
  edges: Array<SearchAlbumEdge>;
  /** Pagination information for albums in a search */
  pageInfo: PageInfo;
};

export type SearchArtistEdge = {
  __typename: 'SearchArtistEdge';
  /** The artist returned from the search */
  node: Artist;
};

export type SearchArtistsConnection = {
  __typename: 'SearchArtistsConnection';
  /** The list of artists returned from the search */
  edges: Array<SearchArtistEdge>;
  /** Pagination information for artists in a search */
  pageInfo: PageInfo;
};

export type SearchEpisodeEdge = {
  __typename: 'SearchEpisodeEdge';
  /** The episode returned from the search */
  node: Episode;
};

export type SearchEpisodesConnection = {
  __typename: 'SearchEpisodesConnection';
  /** The list of episodes returned from the search */
  edges: Array<SearchEpisodeEdge>;
  /** Pagination information for episodes in a search */
  pageInfo: PageInfo;
};

export enum SearchExternalValue {
  AUDIO = 'AUDIO',
}

export type SearchPlaylistEdge = {
  __typename: 'SearchPlaylistEdge';
  /** The playlist returned from the search */
  node: Playlist;
};

export type SearchPlaylistsConnection = {
  __typename: 'SearchPlaylistsConnection';
  /** The list of playlists returned from the search */
  edges: Array<SearchPlaylistEdge>;
  /** Pagination information for playlists in a search */
  pageInfo: PageInfo;
};

export type SearchResults = {
  __typename: 'SearchResults';
  /** The set of albums returned from the search query. Only available if the search `type` includes `ALBUM`. */
  albums: Maybe<SearchAlbumsConnection>;
  /** The set of artists returned from the search query. Only available if the search `type` includes `ARTIST`. */
  artists: Maybe<SearchArtistsConnection>;
  /** The set of episodes returned from the search query. Only available if the search `type` includes `EPISODE`. */
  episodes: Maybe<SearchEpisodesConnection>;
  /** The set of playlists returned from the search query. Only available if the search `type` includes `PLAYLIST`. */
  playlists: Maybe<SearchPlaylistsConnection>;
  /** The set of shows returned from the search query. Only available if the search `type` includes `SHOW`. */
  shows: Maybe<SearchShowsConnection>;
  /** The set of tracks returned from the search query. Only available if the search `type` includes `TRACK`. */
  tracks: Maybe<SearchTracksConnection>;
};

export type SearchShowEdge = {
  __typename: 'SearchShowEdge';
  /** The show returned from the search */
  node: Show;
};

export type SearchShowsConnection = {
  __typename: 'SearchShowsConnection';
  /** The list of shows returned from the search */
  edges: Array<SearchShowEdge>;
  /** Pagination information for shows in a search */
  pageInfo: PageInfo;
};

export type SearchTrackEdge = {
  __typename: 'SearchTrackEdge';
  /** The track returned in the search */
  node: Track;
};

export type SearchTracksConnection = {
  __typename: 'SearchTracksConnection';
  /** The list of tracks returned from the search */
  edges: Array<SearchTrackEdge>;
  /** Pagination information for tracks in a search */
  pageInfo: PageInfo;
};

export enum SearchType {
  ALBUM = 'ALBUM',
  ARTIST = 'ARTIST',
  EPISODE = 'EPISODE',
  PLAYLIST = 'PLAYLIST',
  SHOW = 'SHOW',
  TRACK = 'TRACK',
}

export type SeekToPositionContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SeekToPositionResponse = {
  __typename: 'SeekToPositionResponse';
  /** The updated state of playback after seeking to a position. */
  playbackState: Maybe<PlaybackState>;
};

export type SetRepeatModeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SetRepeatModeResponse = {
  __typename: 'SetRepeatModeResponse';
  /** The updated state of playback after setting a repeat mode. */
  playbackState: Maybe<PlaybackState>;
};

export type SetVolumeContextInput = {
  /** The id of the device this command is targeting. If not supplied, the user's currently active device is the target. */
  deviceId?: InputMaybe<Scalars['ID']['input']>;
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
  description: Scalars['String']['output'];
  /** Spotify catalog information about an show’s episodes. */
  episodes: Maybe<ShowEpisodesConnection>;
  /**
   * Whether or not the show has explicit content (`true` = yes it does; `false`
   * = no it does not OR unknown).
   */
  explicit: Scalars['Boolean']['output'];
  /** External URLs for this show. */
  externalUrls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the show. */
  href: Scalars['String']['output'];
  /**
   * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the show.
   */
  id: Scalars['ID']['output'];
  /** The cover art for the show in various sizes, widest first. */
  images: Array<Image>;
  /**
   * `true` if all of the shows episodes are hosted outside of Spotify's CDN. This
   * field might be `null` in some cases.
   */
  isExternallyHosted: Maybe<Scalars['Boolean']['output']>;
  /** A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
  languages: Array<Scalars['String']['output']>;
  /** The media type of the show. */
  mediaType: Scalars['String']['output'];
  /** The name of the episode. */
  name: Scalars['String']['output'];
  /** The publisher of the show. */
  publisher: Scalars['String']['output'];
  /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the show. */
  uri: Scalars['String']['output'];
};

/** Spotify catalog information for a show. */
export type ShowdescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

/** Spotify catalog information for a show. */
export type ShowepisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  deviceId?: InputMaybe<Scalars['ID']['input']>;
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
  deviceId?: InputMaybe<Scalars['ID']['input']>;
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
  deviceId?: InputMaybe<Scalars['ID']['input']>;
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
  HTML = 'HTML',
  PLAIN = 'PLAIN',
}

export enum TimeRange {
  LONG_TERM = 'LONG_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  SHORT_TERM = 'SHORT_TERM',
}

export type TopArtistEdge = {
  __typename: 'TopArtistEdge';
  /** The artist. */
  node: Artist;
};

export type TopArtistsConnection = {
  __typename: 'TopArtistsConnection';
  /** The list of top tracks. */
  edges: Array<TopArtistEdge>;
  /** Pagination information for the set of top tracks. */
  pageInfo: PageInfo;
};

export type TopTrackEdge = {
  __typename: 'TopTrackEdge';
  /** The track. */
  node: Track;
};

export type TopTracksConnection = {
  __typename: 'TopTracksConnection';
  /** The list of top tracks. */
  edges: Array<TopTrackEdge>;
  /** Pagination information for the set of top tracks. */
  pageInfo: PageInfo;
};

/** Spotify catalog information for a track. */
export type Track = PlaybackItem &
  PlaylistTrack & {
    __typename: 'Track';
    /** The album on which the track appears. */
    album: Album;
    /** The artists who performed the track. */
    artists: Array<Artist>;
    /** The track's audio feature information */
    audioFeatures: Maybe<TrackAudioFeatures>;
    /** The disc number (usually `1` unless the album consists of more than one disc). */
    discNumber: Scalars['Int']['output'];
    /** The track length in milliseconds */
    durationMs: Scalars['Int']['output'];
    /**
     * Whether or not the track has explicit lyrics (`true` = yes it does;
     * `false` = no it does not OR unknown)
     */
    explicit: Scalars['Boolean']['output'];
    /** Known external IDs for the track. */
    externalIds: Maybe<TrackExternalIds>;
    /** Known external URLs for this track. */
    externalUrls: ExternalUrl;
    /** A link to the Web API endpoint providing full details of the track. */
    href: Scalars['String']['output'];
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track. */
    id: Scalars['ID']['output'];
    /** Whether or not the track is from a local file. */
    isLocal: Scalars['Boolean']['output'];
    /**
     * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/)
     * is applied. If `true`, the track is playable in the given market.
     * Otherwise `false`.
     */
    isPlayable: Scalars['Boolean']['output'];
    /** The name of the track */
    name: Scalars['String']['output'];
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
    popularity: Scalars['Int']['output'];
    /** A link to a 30 second preview (MP3 format) of the track. Can be `null` */
    previewUrl: Maybe<Scalars['String']['output']>;
    /**
     * The number of the track. If an album has several discs, the track number is
     * the number on the specified disc.
     */
    trackNumber: Maybe<Scalars['Int']['output']>;
    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
     * for the track.
     */
    uri: Scalars['String']['output'];
  };

export type TrackAudioFeatures = {
  __typename: 'TrackAudioFeatures';
  /** A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. */
  acousticness: Scalars['Float']['output'];
  /** A URL to access the full audio analysis of this track. An access token is required to access this data. */
  analysisUrl: Scalars['String']['output'];
  /** Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. */
  danceability: Scalars['Float']['output'];
  /** The duration of the track in milliseconds. */
  durationMs: Scalars['Int']['output'];
  /** Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy. */
  energy: Scalars['Float']['output'];
  /** The Spotify ID for the track. */
  id: Scalars['ID']['output'];
  /** Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0. */
  instrumentalness: Scalars['Float']['output'];
  /** The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1. */
  key: Scalars['Int']['output'];
  /** Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live. */
  liveness: Scalars['Float']['output'];
  /** The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db. */
  loudness: Scalars['Float']['output'];
  /** Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0. */
  mode: Scalars['Int']['output'];
  /** Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. */
  speechiness: Scalars['Float']['output'];
  /** The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. */
  tempo: Scalars['Float']['output'];
  /** An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4". */
  timeSignature: Scalars['Int']['output'];
  /** A link to the Web API endpoint providing full details of the track. */
  trackHref: Scalars['String']['output'];
  /** The Spotify URI for the track. */
  uri: Scalars['String']['output'];
  /** A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry). */
  valence: Scalars['Float']['output'];
};

export type TrackExternalIds = {
  __typename: 'TrackExternalIds';
  /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
  ean: Maybe<Scalars['String']['output']>;
  /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
  isrc: Maybe<Scalars['String']['output']>;
  /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
  upc: Maybe<Scalars['String']['output']>;
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
  __typename: 'TransferPlaybackPayload';
  /** The state of playback after transferring devices. */
  playbackState: Maybe<PlaybackState>;
};

export type UpdateFieldConfigInput = {
  config: FieldConfigInput;
  field: FieldInput;
};

export type UpdateFieldConfigPayload = {
  __typename: 'UpdateFieldConfigPayload';
  /** The updated field config */
  fieldConfig: Maybe<FieldConfig>;
};

/** Public profile information about a Spotify user. */
export type User = UserProfile & {
  __typename: 'User';
  /** The name displayed on the user's profile. `null` if not available. */
  displayName: Maybe<Scalars['String']['output']>;
  /** Known public external URLs for this user. */
  externalUrls: ExternalUrl;
  /** Information about the followers of this user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String']['output'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  id: Scalars['ID']['output'];
  /** The user's profile image. */
  images: Maybe<Array<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  uri: Scalars['String']['output'];
};

export type UserProfile = {
  /** The name displayed on the user's profile. `null` if not available. */
  displayName: Maybe<Scalars['String']['output']>;
  /** Information about the followers of this user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String']['output'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  id: Scalars['ID']['output'];
  /** The user's profile image. */
  images: Maybe<Array<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  uri: Scalars['String']['output'];
};
