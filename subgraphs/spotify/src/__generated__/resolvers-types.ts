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
  CountryCode: { input: string; output: string };
  DateTime: { input: Date; output: Date };
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
  __typename?: 'AddItemToPlaybackQueuePayload';
  playbackQueue?: Maybe<PlaybackQueue>;
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
  label?: Maybe<Scalars['String']['output']>;
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
  tracks?: Maybe<AlbumTrackConnection>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the album.
   */
  uri: Scalars['String']['output'];
};

/** Spotify catalog information for an album. */
export type AlbumTracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AlbumGroup = 'album' | 'appears_on' | 'compilation' | 'single';

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

export type AlbumType = 'album' | 'compilation' | 'single';

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
   * @deprecated This endpoint no longer exists in the Spotify API
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
export type ArtistAlbumsArgs = {
  includeGroups?: InputMaybe<Array<AlbumGroup>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtistAlbumEdge = {
  __typename?: 'ArtistAlbumEdge';
  /** Spotify catalog information for the album. */
  node: Album;
};

export type ArtistAlbumsConnection = {
  __typename?: 'ArtistAlbumsConnection';
  /** A list of albums that belong to the artist. */
  edges?: Maybe<Array<ArtistAlbumEdge>>;
  /** "Pagination information for the set of albums" */
  pageInfo: PageInfo;
};

export type Contains = {
  __typename?: 'Contains';
  /**
   * List of booleans in order of albums requested. `true` means the album is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  albums?: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * List of booleans in order of episodes requested. `true` means the episode is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  episodes?: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * List of booleans in order of shows requested. `true` means the show is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  shows?: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * List of booleans in order of tracks requested. `true` means the track is in
   * the Spotify user's library. This field is `null` if omitted in the request.
   */
  tracks?: Maybe<Array<Scalars['Boolean']['output']>>;
};

export type Copyright = {
  __typename?: 'Copyright';
  /** The copyright text for this content. */
  text: Scalars['String']['output'];
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
  albumsContains?: Maybe<Array<Scalars['Boolean']['output']>>;
  episodes?: Maybe<SavedEpisodesConnection>;
  /**
   * Check if one or more episodes is already saved in the current Spotify user's
   * 'Your Episodes' library.
   */
  episodesContains?: Maybe<Array<Scalars['Boolean']['output']>>;
  /** Get the current user's followed artists. */
  followedArtists?: Maybe<FollowedArtistsConnection>;
  /** Information about the user's current playback state */
  player: Player;
  /** Playlists owned or followed by the current Spotify user. */
  playlists?: Maybe<PlaylistConnection>;
  /** Get detailed profile information about the current user (including the current user's username). */
  profile: CurrentUserProfile;
  /** Get a list of the albums saved in the current Spotify user's 'Your Music' library. */
  shows?: Maybe<SavedShowsConnection>;
  /**
   * Check if one or more shows is already saved in the current Spotify user's
   * library.
   */
  showsContains?: Maybe<Array<Scalars['Boolean']['output']>>;
  /** Get the current user's top artists based on calculated affinity. */
  topArtists?: Maybe<TopArtistsConnection>;
  /** Get the current user's top tracks based on calculated affinity. */
  topTracks?: Maybe<TopTracksConnection>;
  tracks?: Maybe<SavedTracksConnection>;
  /**
   * Check if one or more tracks is already saved in the current Spotify user's
   * 'Your Music' library.
   */
  tracksContains?: Maybe<Array<Scalars['Boolean']['output']>>;
  /**
   * Detailed profile information about the current user.
   * @deprecated Use the profile field instead which provides richer current user information.
   */
  user: User;
};

export type CurrentUserAlbumsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserAlbumsContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserEpisodesContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserFollowedArtistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserShowsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserShowsContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserTopArtistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timeRange?: InputMaybe<TimeRange>;
};

export type CurrentUserTopTracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timeRange?: InputMaybe<TimeRange>;
};

export type CurrentUserTracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrentUserTracksContainsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type CurrentUserProfile = UserProfile & {
  __typename?: 'CurrentUserProfile';
  /**
   * The country of the user, as set in the user's account profile. An ISO 3166-1
   * alpha-2 country code.
   */
  country?: Maybe<Scalars['CountryCode']['output']>;
  /** The name displayed on the user's profile. `null` if not available. */
  displayName?: Maybe<Scalars['String']['output']>;
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
  images?: Maybe<Array<Image>>;
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
  __typename?: 'CurrentlyPlaying';
  /**
   * Allows to update the user interface based on which playback actions are
   * available within the current context.
   */
  actions: Actions;
  /** A context object. */
  context?: Maybe<PlaybackContext>;
  /** If something is currently playing, return `true`. */
  isPlaying: Scalars['Boolean']['output'];
  /** The currently playing track or episode */
  item?: Maybe<PlaybackItem>;
  /** Progress into the currently playing track or episode. Can be `null` */
  progressMs?: Maybe<Scalars['Int']['output']>;
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: Scalars['Timestamp']['output'];
};

export type Cursors = {
  __typename?: 'Cursors';
  /** The cursor to use as key to find the next page of items. */
  after?: Maybe<Scalars['String']['output']>;
  /** The ursor to use as key to find the previous page of items. */
  before?: Maybe<Scalars['String']['output']>;
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

/** Spotify catalog information for an episode. */
export type Episode = PlaybackItem &
  PlaylistTrack & {
    __typename?: 'Episode';
    /** A URL to a 30 second preview (MP3 format) of the episode. `null` if not available. */
    audioPreviewUrl?: Maybe<Scalars['String']['output']>;
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
export type EpisodeDescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

export type ExplicitContentSettings = {
  __typename?: 'ExplicitContentSettings';
  /** When `true`, indicates that explicit content should not be played. */
  filterEnabled: Scalars['Boolean']['output'];
  /**
   * When `true`, indicates that the explicit content setting is locked and can't
   * be changed by the user.
   */
  filterLocked: Scalars['Boolean']['output'];
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  /**
   * The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for the object.
   */
  spotify?: Maybe<Scalars['String']['output']>;
};

export type FeaturedPlaylistConnection = {
  __typename?: 'FeaturedPlaylistConnection';
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
  __typename?: 'FeaturedPlaylistEdge';
  node: Playlist;
};

export type FieldConfig = {
  __typename?: 'FieldConfig';
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
  __typename?: 'FollowedArtistEdge';
  /** The followed artist */
  node: Artist;
};

export type FollowedArtistsConnection = {
  __typename?: 'FollowedArtistsConnection';
  /** The list of followed artists. */
  edges: Array<FollowedArtistEdge>;
  /** Pagination information for the set of followed artists. */
  pageInfo: PageInfoCursorBased;
};

export type Followers = {
  __typename?: 'Followers';
  /** The total number of followers. */
  total: Scalars['Int']['output'];
};

export type Image = {
  __typename?: 'Image';
  /** The image height in pixels. */
  height?: Maybe<Scalars['Int']['output']>;
  /** The source URL of the image. */
  url: Scalars['String']['output'];
  /** The image width in pixels. */
  width?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add an item to the end of the user's current playback queue. */
  addItemToPlaybackQueue?: Maybe<AddItemToPlaybackQueuePayload>;
  /** Add one or more items to a user's playlist. */
  addItemsToPlaylist?: Maybe<AddItemsToPlaylistPayload>;
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
  /** Save one or more albums to the current user's 'Your Music' library. */
  saveAlbums?: Maybe<SaveAlbumsPayload>;
  /** Save one or more episodes to the current user's library. */
  saveEpisodes?: Maybe<SaveEpisodesPayload>;
  /** Save one or more shows to current Spotify user's library. */
  saveShows?: Maybe<SaveShowsPayload>;
  /** Save one or more tracks to the current user's 'Your Music' library. */
  saveTracks?: Maybe<SaveTracksPayload>;
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
  /** Pagination information for the new releases */
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
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
  __typename?: 'PageInfoCursorBased';
  /** The cursors used to find the next set of items. */
  cursors?: Maybe<Cursors>;
  /** A link to the Web API endpoint returning the full result of the request. */
  href: Scalars['String']['output'];
  /** The maximum number of items in the response (as set in the query or default) */
  limit: Scalars['Int']['output'];
  /** URL to the next page of items. (`null` if none) */
  next?: Maybe<Scalars['String']['output']>;
  /** The total number of items available to return. */
  total: Scalars['Int']['output'];
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

export type Player = {
  __typename?: 'Player';
  /** Information about the object currently being played on the user's Spotify account. */
  currentlyPlaying?: Maybe<CurrentlyPlaying>;
  /** Information about a user's available devices. */
  devices?: Maybe<Array<Device>>;
  /** Get the list of objects that make up the user's queue. */
  playbackQueue?: Maybe<PlaybackQueue>;
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
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/** Information about a playlist owned by a Spotify user */
export type Playlist = {
  __typename?: 'Playlist';
  /** `true` if the owner allows other users to modify the playlist. */
  collaborative: Scalars['Boolean']['output'];
  /**
   * The playlist description. _Only returned for modified, verified playlists,
   * otherwise `null`_.
   */
  description?: Maybe<Scalars['String']['output']>;
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
  images?: Maybe<Array<Image>>;
  /** The name of the playlist. */
  name: Scalars['String']['output'];
  /** The user who owns the playlist. */
  owner: User;
  /**
   * The playlist's public/private status: `true` the playlist is public, `false`
   * the playlist is private, `null` the playlist status is not relevant. For more
   * about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/)
   */
  public?: Maybe<Scalars['Boolean']['output']>;
  /** The tracks of the playlist. */
  tracks: PlaylistTrackConnection;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) *\/
   * for the playlist.
   */
  uri: Scalars['String']['output'];
};

/** Information about a playlist owned by a Spotify user */
export type PlaylistTracksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  __typename?: 'PlaylistTrackConnection';
  /** Pagination information for the tracks belonging to a playlist */
  edges: Array<PlaylistTrackEdge>;
  /** Pagination information for the tracks belonging to a playlist */
  pageInfo: PageInfo;
};

export type PlaylistTrackEdge = {
  __typename?: 'PlaylistTrackEdge';
  /** The date and time the track was added to the playlist */
  addedAt?: Maybe<Scalars['DateTime']['output']>;
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
  /** Get Spotify catalog information for several episodes based on their Spotify IDs. */
  episodes?: Maybe<Array<Episode>>;
  /**
   * A list of Spotify featured playlists (shown, for example, on a Spotify
   * player's 'Browse' tab).
   * @deprecated This endpoint no longer exists in the Spotify API
   */
  featuredPlaylists?: Maybe<FeaturedPlaylistConnection>;
  /**
   * A list of available genres seed parameter values for
   * [recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations).
   * @deprecated This endpoint no longer exists in the Spotify API
   */
  genres: Array<Scalars['String']['output']>;
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
   * @deprecated This endpoint no longer exists in the Spotify API
   */
  recommendations?: Maybe<Recommendations>;
  /**
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string.
   *
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  search?: Maybe<SearchResults>;
  /**
   * Get Spotify catalog information for a single show identified by its unique
   * Spotify ID.
   */
  show?: Maybe<Show>;
  /** Get Spotify catalog information for several shows based on their Spotify IDs. */
  shows?: Maybe<Array<Show>>;
  /**
   * Get Spotify catalog information for a single track identified by its unique
   * Spotify ID.
   */
  track?: Maybe<Track>;
  /** Get Spotify catalog information for multiple tracks based on their Spotify IDs. */
  tracks?: Maybe<Array<Track>>;
  /**
   * Get audio features for multiple tracks based on their Spotify IDs.
   * @deprecated This endpoint no longer exists in the Spotify API
   */
  tracksAudioFeatures: Array<TrackAudioFeatures>;
  user?: Maybe<User>;
};

export type QueryAlbumArgs = {
  id: Scalars['ID']['input'];
};

export type QueryAlbumsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryArtistArgs = {
  id: Scalars['ID']['input'];
};

export type QueryArtistsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEpisodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryFeaturedPlaylistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QueryNewReleasesArgs = {
  country?: InputMaybe<Scalars['CountryCode']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPlaylistArgs = {
  id: Scalars['ID']['input'];
};

export type QueryRecommendationsArgs = {
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

export type QuerySearchArgs = {
  includeExternal?: InputMaybe<SearchExternalValue>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q: Scalars['String']['input'];
  type: Array<SearchType>;
};

export type QueryShowArgs = {
  id: Scalars['ID']['input'];
};

export type QueryShowsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryTrackArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTracksArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryTracksAudioFeaturesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
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
  __typename?: 'RecommendationSeed';
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
  href?: Maybe<Scalars['String']['output']>;
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
export type RecommendationSeedType = 'ARTIST' | 'GENRE' | 'TRACK';

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
  date: Scalars['String']['output'];
  /** The precision with which the `date` value is known. */
  precision: ReleaseDatePrecision;
};

export type ReleaseDatePrecision = 'day' | 'month' | 'year';

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
  __typename?: 'RemoveItemFromPlaylistPayload';
  /** The playlist after the item was removed */
  playlist?: Maybe<Playlist>;
  /** A snapshot ID for the playlist */
  snapshotId?: Maybe<Scalars['ID']['output']>;
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
  __typename?: 'RemoveSavedAlbumsPayload';
  /** The albums that were removed from the Spotify user's library. */
  removedAlbums?: Maybe<Array<Album>>;
};

export type RemoveSavedEpisodesInput = {
  /**
   * A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum 50 IDs.
   */
  ids: Array<Scalars['ID']['input']>;
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
  ids: Array<Scalars['ID']['input']>;
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
  ids: Array<Scalars['ID']['input']>;
};

export type RemoveSavedTracksPayload = {
  __typename?: 'RemoveSavedTracksPayload';
  /** The tracks that were removed from the Spotify user's library. */
  removedTracks?: Maybe<Array<Track>>;
};

export type RepeatMode = 'context' | 'off' | 'track';

export type ResetFieldConfigInput = {
  /** The field that will be reset to its default values */
  field: FieldInput;
};

export type ResetFieldConfigPayload = {
  __typename?: 'ResetFieldConfigPayload';
  /** The updated field config */
  fieldConfig?: Maybe<FieldConfig>;
};

export type ResumePoint = {
  __typename?: 'ResumePoint';
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
  __typename?: 'SaveAlbumsPayload';
  /** The albums that were saved to the Spotify user's library */
  savedAlbums?: Maybe<Array<Album>>;
};

export type SaveEpisodesInput = {
  /**
   * An list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
   * Maximum: 50 IDs
   */
  ids: Array<Scalars['ID']['input']>;
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
  ids: Array<Scalars['ID']['input']>;
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
  ids: Array<Scalars['ID']['input']>;
};

export type SaveTracksPayload = {
  __typename?: 'SaveTracksPayload';
  /** The tracks that were saved to the Spotify user's library */
  savedTracks?: Maybe<Array<Track>>;
};

export type SavedAlbumEdge = {
  __typename?: 'SavedAlbumEdge';
  /** The date the album was saved. */
  addedAt: Scalars['DateTime']['output'];
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

export type SavedEpisodeEdge = {
  __typename?: 'SavedEpisodeEdge';
  /** The date the episode was saved. */
  addedAt: Scalars['DateTime']['output'];
  /** The saved episode. */
  node: Episode;
};

export type SavedEpisodesConnection = {
  __typename?: 'SavedEpisodesConnection';
  /** The list of saved episodes. */
  edges: Array<SavedEpisodeEdge>;
  /** Pagination information for the set of episodes */
  pageInfo: PageInfo;
};

export type SavedShowEdge = {
  __typename?: 'SavedShowEdge';
  /** The date the show was saved. */
  addedAt: Scalars['DateTime']['output'];
  /** The show */
  node: Show;
};

export type SavedShowsConnection = {
  __typename?: 'SavedShowsConnection';
  /** A list of saved shows. */
  edges: Array<SavedShowEdge>;
  /** "Pagination information for the set of saved shows" */
  pageInfo: PageInfo;
};

export type SavedTrackEdge = {
  __typename?: 'SavedTrackEdge';
  /** The date the track was saved. */
  addedAt: Scalars['DateTime']['output'];
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
  __typename?: 'SearchAlbumEdge';
  /** The album returned from the search */
  node: Album;
};

export type SearchAlbumsConnection = {
  __typename?: 'SearchAlbumsConnection';
  /** The list of albums returned from the search */
  edges: Array<SearchAlbumEdge>;
  /** Pagination information for albums in a search */
  pageInfo: PageInfo;
};

export type SearchArtistEdge = {
  __typename?: 'SearchArtistEdge';
  /** The artist returned from the search */
  node: Artist;
};

export type SearchArtistsConnection = {
  __typename?: 'SearchArtistsConnection';
  /** The list of artists returned from the search */
  edges: Array<SearchArtistEdge>;
  /** Pagination information for artists in a search */
  pageInfo: PageInfo;
};

export type SearchEpisodeEdge = {
  __typename?: 'SearchEpisodeEdge';
  /** The episode returned from the search */
  node: Episode;
};

export type SearchEpisodesConnection = {
  __typename?: 'SearchEpisodesConnection';
  /** The list of episodes returned from the search */
  edges: Array<SearchEpisodeEdge>;
  /** Pagination information for episodes in a search */
  pageInfo: PageInfo;
};

export type SearchExternalValue = 'audio';

export type SearchPlaylistEdge = {
  __typename?: 'SearchPlaylistEdge';
  /** The playlist returned from the search */
  node: Playlist;
};

export type SearchPlaylistsConnection = {
  __typename?: 'SearchPlaylistsConnection';
  /** The list of playlists returned from the search */
  edges: Array<SearchPlaylistEdge>;
  /** Pagination information for playlists in a search */
  pageInfo: PageInfo;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  /** The set of albums returned from the search query. Only available if the search `type` includes `ALBUM`. */
  albums?: Maybe<SearchAlbumsConnection>;
  /** The set of artists returned from the search query. Only available if the search `type` includes `ARTIST`. */
  artists?: Maybe<SearchArtistsConnection>;
  /** The set of episodes returned from the search query. Only available if the search `type` includes `EPISODE`. */
  episodes?: Maybe<SearchEpisodesConnection>;
  /** The set of playlists returned from the search query. Only available if the search `type` includes `PLAYLIST`. */
  playlists?: Maybe<SearchPlaylistsConnection>;
  /** The set of shows returned from the search query. Only available if the search `type` includes `SHOW`. */
  shows?: Maybe<SearchShowsConnection>;
  /** The set of tracks returned from the search query. Only available if the search `type` includes `TRACK`. */
  tracks?: Maybe<SearchTracksConnection>;
};

export type SearchShowEdge = {
  __typename?: 'SearchShowEdge';
  /** The show returned from the search */
  node: Show;
};

export type SearchShowsConnection = {
  __typename?: 'SearchShowsConnection';
  /** The list of shows returned from the search */
  edges: Array<SearchShowEdge>;
  /** Pagination information for shows in a search */
  pageInfo: PageInfo;
};

export type SearchTrackEdge = {
  __typename?: 'SearchTrackEdge';
  /** The track returned in the search */
  node: Track;
};

export type SearchTracksConnection = {
  __typename?: 'SearchTracksConnection';
  /** The list of tracks returned from the search */
  edges: Array<SearchTrackEdge>;
  /** Pagination information for tracks in a search */
  pageInfo: PageInfo;
};

export type SearchType =
  | 'album'
  | 'artist'
  | 'episode'
  | 'playlist'
  | 'show'
  | 'track';

/** Spotify catalog information for a show. */
export type Show = {
  __typename?: 'Show';
  /** A description of the show. */
  description: Scalars['String']['output'];
  /** Spotify catalog information about an show’s episodes. */
  episodes?: Maybe<ShowEpisodesConnection>;
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
  isExternallyHosted?: Maybe<Scalars['Boolean']['output']>;
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
export type ShowDescriptionArgs = {
  format?: InputMaybe<TextFormat>;
};

/** Spotify catalog information for a show. */
export type ShowEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type TextFormat = 'HTML' | 'PLAIN';

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export type TopArtistEdge = {
  __typename?: 'TopArtistEdge';
  /** The artist. */
  node: Artist;
};

export type TopArtistsConnection = {
  __typename?: 'TopArtistsConnection';
  /** The list of top tracks. */
  edges: Array<TopArtistEdge>;
  /** Pagination information for the set of top tracks. */
  pageInfo: PageInfo;
};

export type TopTrackEdge = {
  __typename?: 'TopTrackEdge';
  /** The track. */
  node: Track;
};

export type TopTracksConnection = {
  __typename?: 'TopTracksConnection';
  /** The list of top tracks. */
  edges: Array<TopTrackEdge>;
  /** Pagination information for the set of top tracks. */
  pageInfo: PageInfo;
};

/** Spotify catalog information for a track. */
export type Track = PlaybackItem &
  PlaylistTrack & {
    __typename?: 'Track';
    /** The album on which the track appears. */
    album: Album;
    /** The artists who performed the track. */
    artists: Array<Artist>;
    /**
     * The track's audio feature information
     * @deprecated This endpoint no longer exists in the Spotify API
     */
    audioFeatures?: Maybe<TrackAudioFeatures>;
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
    externalIds?: Maybe<TrackExternalIds>;
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
    previewUrl?: Maybe<Scalars['String']['output']>;
    /**
     * The number of the track. If an album has several discs, the track number is
     * the number on the specified disc.
     */
    trackNumber?: Maybe<Scalars['Int']['output']>;
    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
     * for the track.
     */
    uri: Scalars['String']['output'];
  };

export type TrackAudioFeatures = {
  __typename?: 'TrackAudioFeatures';
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
  __typename?: 'TrackExternalIds';
  /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
  ean?: Maybe<Scalars['String']['output']>;
  /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
  isrc?: Maybe<Scalars['String']['output']>;
  /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
  upc?: Maybe<Scalars['String']['output']>;
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
export type User = UserProfile & {
  __typename?: 'User';
  /** The name displayed on the user's profile. `null` if not available. */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Known public external URLs for this user. */
  externalUrls: ExternalUrl;
  /** Information about the followers of this user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String']['output'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  id: Scalars['ID']['output'];
  /** The user's profile image. */
  images?: Maybe<Array<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  uri: Scalars['String']['output'];
};

export type UserProfile = {
  /** The name displayed on the user's profile. `null` if not available. */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Information about the followers of this user. */
  followers: Followers;
  /** A link to the Web API endpoint for this user. */
  href: Scalars['String']['output'];
  /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
  id: Scalars['ID']['output'];
  /** The user's profile image. */
  images?: Maybe<Array<Image>>;
  /**
   * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
   * for this user.
   */
  uri: Scalars['String']['output'];
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

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  ResolversObject<{
    PlaybackItem:
      | (Spotify.Object.Episode | Spotify.Object.EpisodeSimplified)
      | (Spotify.Object.Track | Spotify.Object.TrackSimplified);
    PlaylistTrack:
      | (Spotify.Object.Episode | Spotify.Object.EpisodeSimplified)
      | (Spotify.Object.Track | Spotify.Object.TrackSimplified);
    UserProfile: Spotify.Object.CurrentUser | Spotify.Object.User;
  }>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Action: Action;
  Actions: ResolverTypeWrapper<Spotify.Object.Actions>;
  AddItemToPlaybackQueueInput: AddItemToPlaybackQueueInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AddItemToPlaybackQueuePayload: ResolverTypeWrapper<
    Omit<AddItemToPlaybackQueuePayload, 'playbackQueue'> & {
      playbackQueue?: Maybe<ResolversTypes['PlaybackQueue']>;
    }
  >;
  AddItemsToPlaylistInput: AddItemsToPlaylistInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  AddItemsToPlaylistPayload: ResolverTypeWrapper<
    Omit<AddItemsToPlaylistPayload, 'playlist'> & {
      playlist?: Maybe<ResolversTypes['Playlist']>;
    }
  >;
  Album: ResolverTypeWrapper<
    Spotify.Object.Album | Spotify.Object.AlbumSimplified
  >;
  AlbumGroup: AlbumGroup;
  AlbumTrackConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.TrackSimplified>
  >;
  AlbumTrackEdge: ResolverTypeWrapper<Spotify.Object.TrackSimplified>;
  AlbumType: AlbumType;
  Artist: ResolverTypeWrapper<Spotify.Object.Artist>;
  ArtistAlbumEdge: ResolverTypeWrapper<Spotify.Object.AlbumSimplified>;
  ArtistAlbumsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>
  >;
  Contains: ResolverTypeWrapper<Contains>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Copyright: ResolverTypeWrapper<Copyright>;
  CopyrightType: CopyrightType;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']['output']>;
  CurrentUser: ResolverTypeWrapper<Spotify.Object.CurrentUser>;
  CurrentUserProfile: ResolverTypeWrapper<Spotify.Object.CurrentUser>;
  CurrentlyPlaying: ResolverTypeWrapper<Spotify.Object.CurrentlyPlaying>;
  Cursors: ResolverTypeWrapper<Cursors>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Developer: ResolverTypeWrapper<{}>;
  Device: ResolverTypeWrapper<Spotify.Object.Device>;
  Episode: ResolverTypeWrapper<
    Spotify.Object.Episode | Spotify.Object.EpisodeSimplified
  >;
  ErrorRate: ResolverTypeWrapper<Scalars['ErrorRate']['output']>;
  ExplicitContentSettings: ResolverTypeWrapper<Spotify.Object.ExplicitContentSettings>;
  ExternalUrl: ResolverTypeWrapper<ExternalUrl>;
  FeaturedPlaylistConnection: ResolverTypeWrapper<Spotify.Object.FeaturedPlaylists>;
  FeaturedPlaylistEdge: ResolverTypeWrapper<Spotify.Object.PlaylistSimplified>;
  FieldConfig: ResolverTypeWrapper<FieldConfigType>;
  FieldConfigInput: FieldConfigInput;
  FieldInput: FieldInput;
  FollowedArtistEdge: ResolverTypeWrapper<Spotify.Object.Artist>;
  FollowedArtistsConnection: ResolverTypeWrapper<
    Spotify.Object.PaginatedCursorBased<Spotify.Object.Artist>
  >;
  Followers: ResolverTypeWrapper<Followers>;
  Image: ResolverTypeWrapper<Image>;
  Mutation: ResolverTypeWrapper<{}>;
  NewReleaseEdge: ResolverTypeWrapper<Spotify.Object.AlbumSimplified>;
  NewReleasesConnection: ResolverTypeWrapper<Spotify.Object.NewReleases>;
  PageInfo: ResolverTypeWrapper<Spotify.Object.Paginated<unknown>>;
  PageInfoCursorBased: ResolverTypeWrapper<
    Spotify.Object.PaginatedCursorBased<unknown>
  >;
  PlaybackContext: ResolverTypeWrapper<Spotify.Object.Context>;
  PlaybackContextType: PlaybackContextType;
  PlaybackItem: ResolverTypeWrapper<
    Spotify.Object.Episode | Spotify.Object.Track
  >;
  PlaybackQueue: ResolverTypeWrapper<Spotify.Object.PlaybackQueue>;
  PlaybackState: ResolverTypeWrapper<Spotify.Object.PlaybackState>;
  Player: ResolverTypeWrapper<{}>;
  Playlist: ResolverTypeWrapper<
    Spotify.Object.Playlist | Spotify.Object.PlaylistSimplified
  >;
  PlaylistConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.Playlist>
  >;
  PlaylistEdge: ResolverTypeWrapper<Spotify.Object.Playlist>;
  PlaylistTrack: ResolverTypeWrapper<
    Spotify.Object.Track | Spotify.Object.Episode
  >;
  PlaylistTrackConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.PlaylistTrack>
  >;
  PlaylistTrackEdge: ResolverTypeWrapper<Spotify.Object.PlaylistTrack>;
  Query: ResolverTypeWrapper<{}>;
  RecentlyPlayedConnection: ResolverTypeWrapper<
    Spotify.Object.PaginatedCursorBased<Spotify.Object.PlayHistory>
  >;
  RecentlyPlayedEdge: ResolverTypeWrapper<Spotify.Object.PlayHistory>;
  RecommendationAcousticnessInput: RecommendationAcousticnessInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  RecommendationDanceabilityInput: RecommendationDanceabilityInput;
  RecommendationDurationMsInput: RecommendationDurationMsInput;
  RecommendationEnergyInput: RecommendationEnergyInput;
  RecommendationInstrumentalnessInput: RecommendationInstrumentalnessInput;
  RecommendationKeyInput: RecommendationKeyInput;
  RecommendationLivenessInput: RecommendationLivenessInput;
  RecommendationLoudnessInput: RecommendationLoudnessInput;
  RecommendationModeInput: RecommendationModeInput;
  RecommendationPopularityInput: RecommendationPopularityInput;
  RecommendationSeed: ResolverTypeWrapper<RecommendationSeed>;
  RecommendationSeedInput: RecommendationSeedInput;
  RecommendationSeedType: RecommendationSeedType;
  RecommendationSpeechinessInput: RecommendationSpeechinessInput;
  RecommendationTempoInput: RecommendationTempoInput;
  RecommendationTimeSignatureInput: RecommendationTimeSignatureInput;
  RecommendationValenceInput: RecommendationValenceInput;
  Recommendations: ResolverTypeWrapper<Spotify.Object.Recommendations>;
  ReleaseDate: ResolverTypeWrapper<Releasable>;
  ReleaseDatePrecision: ReleaseDatePrecision;
  RemoveItemFromPlaylistInput: RemoveItemFromPlaylistInput;
  RemoveItemFromPlaylistPayload: ResolverTypeWrapper<
    Omit<RemoveItemFromPlaylistPayload, 'playlist'> & {
      playlist?: Maybe<ResolversTypes['Playlist']>;
    }
  >;
  RemoveItemFromPlaylistTrackInput: RemoveItemFromPlaylistTrackInput;
  RemoveSavedAlbumsInput: RemoveSavedAlbumsInput;
  RemoveSavedAlbumsPayload: ResolverTypeWrapper<
    Omit<RemoveSavedAlbumsPayload, 'removedAlbums'> & {
      removedAlbums?: Maybe<Array<ResolversTypes['Album']>>;
    }
  >;
  RemoveSavedEpisodesInput: RemoveSavedEpisodesInput;
  RemoveSavedEpisodesPayload: ResolverTypeWrapper<
    Omit<RemoveSavedEpisodesPayload, 'removedEpisodes'> & {
      removedEpisodes?: Maybe<Array<ResolversTypes['Episode']>>;
    }
  >;
  RemoveSavedShowsInput: RemoveSavedShowsInput;
  RemoveSavedShowsPayload: ResolverTypeWrapper<
    Omit<RemoveSavedShowsPayload, 'removedShows'> & {
      removedShows?: Maybe<Array<ResolversTypes['Show']>>;
    }
  >;
  RemoveSavedTracksInput: RemoveSavedTracksInput;
  RemoveSavedTracksPayload: ResolverTypeWrapper<
    Omit<RemoveSavedTracksPayload, 'removedTracks'> & {
      removedTracks?: Maybe<Array<ResolversTypes['Track']>>;
    }
  >;
  RepeatMode: RepeatMode;
  ResetFieldConfigInput: ResetFieldConfigInput;
  ResetFieldConfigPayload: ResolverTypeWrapper<
    Omit<ResetFieldConfigPayload, 'fieldConfig'> & {
      fieldConfig?: Maybe<ResolversTypes['FieldConfig']>;
    }
  >;
  ResumePoint: ResolverTypeWrapper<Spotify.Object.ResumePoint>;
  SaveAlbumsInput: SaveAlbumsInput;
  SaveAlbumsPayload: ResolverTypeWrapper<
    Omit<SaveAlbumsPayload, 'savedAlbums'> & {
      savedAlbums?: Maybe<Array<ResolversTypes['Album']>>;
    }
  >;
  SaveEpisodesInput: SaveEpisodesInput;
  SaveEpisodesPayload: ResolverTypeWrapper<
    Omit<SaveEpisodesPayload, 'savedEpisodes'> & {
      savedEpisodes?: Maybe<Array<ResolversTypes['Episode']>>;
    }
  >;
  SaveShowsInput: SaveShowsInput;
  SaveShowsPayload: ResolverTypeWrapper<
    Omit<SaveShowsPayload, 'savedShows'> & {
      savedShows?: Maybe<Array<ResolversTypes['Show']>>;
    }
  >;
  SaveTracksInput: SaveTracksInput;
  SaveTracksPayload: ResolverTypeWrapper<
    Omit<SaveTracksPayload, 'savedTracks'> & {
      savedTracks?: Maybe<Array<ResolversTypes['Track']>>;
    }
  >;
  SavedAlbumEdge: ResolverTypeWrapper<Spotify.Object.SavedAlbum>;
  SavedAlbumsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.SavedAlbum>
  >;
  SavedEpisodeEdge: ResolverTypeWrapper<Spotify.Object.SavedEpisode>;
  SavedEpisodesConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.SavedEpisode>
  >;
  SavedShowEdge: ResolverTypeWrapper<Spotify.Object.SavedShow>;
  SavedShowsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.SavedShow>
  >;
  SavedTrackEdge: ResolverTypeWrapper<Spotify.Object.SavedTrack>;
  SavedTracksConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.SavedTrack>
  >;
  SchemaField: ResolverTypeWrapper<SchemaField>;
  SchemaFieldInput: SchemaFieldInput;
  SearchAlbumEdge: ResolverTypeWrapper<Spotify.Object.AlbumSimplified>;
  SearchAlbumsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>
  >;
  SearchArtistEdge: ResolverTypeWrapper<Spotify.Object.Artist>;
  SearchArtistsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.Artist>
  >;
  SearchEpisodeEdge: ResolverTypeWrapper<Spotify.Object.EpisodeSimplified>;
  SearchEpisodesConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>
  >;
  SearchExternalValue: SearchExternalValue;
  SearchPlaylistEdge: ResolverTypeWrapper<Spotify.Object.PlaylistSimplified>;
  SearchPlaylistsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.PlaylistSimplified>
  >;
  SearchResults: ResolverTypeWrapper<Spotify.Object.SearchResults>;
  SearchShowEdge: ResolverTypeWrapper<Spotify.Object.ShowSimplified>;
  SearchShowsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.ShowSimplified>
  >;
  SearchTrackEdge: ResolverTypeWrapper<Spotify.Object.Track>;
  SearchTracksConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.Track>
  >;
  SearchType: SearchType;
  Show: ResolverTypeWrapper<
    Spotify.Object.Show | Spotify.Object.ShowSimplified
  >;
  ShowEpisodeEdge: ResolverTypeWrapper<Spotify.Object.EpisodeSimplified>;
  ShowEpisodesConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>
  >;
  TextFormat: TextFormat;
  TimeRange: TimeRange;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TopArtistEdge: ResolverTypeWrapper<Spotify.Object.Artist>;
  TopArtistsConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.Artist>
  >;
  TopTrackEdge: ResolverTypeWrapper<Spotify.Object.Track>;
  TopTracksConnection: ResolverTypeWrapper<
    Spotify.Object.Paginated<Spotify.Object.Track>
  >;
  Track: ResolverTypeWrapper<
    Spotify.Object.Track | Spotify.Object.TrackSimplified
  >;
  TrackAudioFeatures: ResolverTypeWrapper<Spotify.Object.TrackAudioFeatures>;
  TrackExternalIds: ResolverTypeWrapper<TrackExternalIds>;
  UpdateFieldConfigInput: UpdateFieldConfigInput;
  UpdateFieldConfigPayload: ResolverTypeWrapper<
    Omit<UpdateFieldConfigPayload, 'fieldConfig'> & {
      fieldConfig?: Maybe<ResolversTypes['FieldConfig']>;
    }
  >;
  User: ResolverTypeWrapper<Spotify.Object.User>;
  UserProfile: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['UserProfile']
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actions: Spotify.Object.Actions;
  AddItemToPlaybackQueueInput: AddItemToPlaybackQueueInput;
  ID: Scalars['ID']['output'];
  String: Scalars['String']['output'];
  AddItemToPlaybackQueuePayload: Omit<
    AddItemToPlaybackQueuePayload,
    'playbackQueue'
  > & { playbackQueue?: Maybe<ResolversParentTypes['PlaybackQueue']> };
  AddItemsToPlaylistInput: AddItemsToPlaylistInput;
  Int: Scalars['Int']['output'];
  AddItemsToPlaylistPayload: Omit<AddItemsToPlaylistPayload, 'playlist'> & {
    playlist?: Maybe<ResolversParentTypes['Playlist']>;
  };
  Album: Spotify.Object.Album | Spotify.Object.AlbumSimplified;
  AlbumTrackConnection: Spotify.Object.Paginated<Spotify.Object.TrackSimplified>;
  AlbumTrackEdge: Spotify.Object.TrackSimplified;
  Artist: Spotify.Object.Artist;
  ArtistAlbumEdge: Spotify.Object.AlbumSimplified;
  ArtistAlbumsConnection: Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>;
  Contains: Contains;
  Boolean: Scalars['Boolean']['output'];
  Copyright: Copyright;
  CountryCode: Scalars['CountryCode']['output'];
  CurrentUser: Spotify.Object.CurrentUser;
  CurrentUserProfile: Spotify.Object.CurrentUser;
  CurrentlyPlaying: Spotify.Object.CurrentlyPlaying;
  Cursors: Cursors;
  DateTime: Scalars['DateTime']['output'];
  Developer: {};
  Device: Spotify.Object.Device;
  Episode: Spotify.Object.Episode | Spotify.Object.EpisodeSimplified;
  ErrorRate: Scalars['ErrorRate']['output'];
  ExplicitContentSettings: Spotify.Object.ExplicitContentSettings;
  ExternalUrl: ExternalUrl;
  FeaturedPlaylistConnection: Spotify.Object.FeaturedPlaylists;
  FeaturedPlaylistEdge: Spotify.Object.PlaylistSimplified;
  FieldConfig: FieldConfigType;
  FieldConfigInput: FieldConfigInput;
  FieldInput: FieldInput;
  FollowedArtistEdge: Spotify.Object.Artist;
  FollowedArtistsConnection: Spotify.Object.PaginatedCursorBased<Spotify.Object.Artist>;
  Followers: Followers;
  Image: Image;
  Mutation: {};
  NewReleaseEdge: Spotify.Object.AlbumSimplified;
  NewReleasesConnection: Spotify.Object.NewReleases;
  PageInfo: Spotify.Object.Paginated<unknown>;
  PageInfoCursorBased: Spotify.Object.PaginatedCursorBased<unknown>;
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
  RecommendationAcousticnessInput: RecommendationAcousticnessInput;
  Float: Scalars['Float']['output'];
  RecommendationDanceabilityInput: RecommendationDanceabilityInput;
  RecommendationDurationMsInput: RecommendationDurationMsInput;
  RecommendationEnergyInput: RecommendationEnergyInput;
  RecommendationInstrumentalnessInput: RecommendationInstrumentalnessInput;
  RecommendationKeyInput: RecommendationKeyInput;
  RecommendationLivenessInput: RecommendationLivenessInput;
  RecommendationLoudnessInput: RecommendationLoudnessInput;
  RecommendationModeInput: RecommendationModeInput;
  RecommendationPopularityInput: RecommendationPopularityInput;
  RecommendationSeed: RecommendationSeed;
  RecommendationSeedInput: RecommendationSeedInput;
  RecommendationSpeechinessInput: RecommendationSpeechinessInput;
  RecommendationTempoInput: RecommendationTempoInput;
  RecommendationTimeSignatureInput: RecommendationTimeSignatureInput;
  RecommendationValenceInput: RecommendationValenceInput;
  Recommendations: Spotify.Object.Recommendations;
  ReleaseDate: Releasable;
  RemoveItemFromPlaylistInput: RemoveItemFromPlaylistInput;
  RemoveItemFromPlaylistPayload: Omit<
    RemoveItemFromPlaylistPayload,
    'playlist'
  > & { playlist?: Maybe<ResolversParentTypes['Playlist']> };
  RemoveItemFromPlaylistTrackInput: RemoveItemFromPlaylistTrackInput;
  RemoveSavedAlbumsInput: RemoveSavedAlbumsInput;
  RemoveSavedAlbumsPayload: Omit<RemoveSavedAlbumsPayload, 'removedAlbums'> & {
    removedAlbums?: Maybe<Array<ResolversParentTypes['Album']>>;
  };
  RemoveSavedEpisodesInput: RemoveSavedEpisodesInput;
  RemoveSavedEpisodesPayload: Omit<
    RemoveSavedEpisodesPayload,
    'removedEpisodes'
  > & { removedEpisodes?: Maybe<Array<ResolversParentTypes['Episode']>> };
  RemoveSavedShowsInput: RemoveSavedShowsInput;
  RemoveSavedShowsPayload: Omit<RemoveSavedShowsPayload, 'removedShows'> & {
    removedShows?: Maybe<Array<ResolversParentTypes['Show']>>;
  };
  RemoveSavedTracksInput: RemoveSavedTracksInput;
  RemoveSavedTracksPayload: Omit<RemoveSavedTracksPayload, 'removedTracks'> & {
    removedTracks?: Maybe<Array<ResolversParentTypes['Track']>>;
  };
  ResetFieldConfigInput: ResetFieldConfigInput;
  ResetFieldConfigPayload: Omit<ResetFieldConfigPayload, 'fieldConfig'> & {
    fieldConfig?: Maybe<ResolversParentTypes['FieldConfig']>;
  };
  ResumePoint: Spotify.Object.ResumePoint;
  SaveAlbumsInput: SaveAlbumsInput;
  SaveAlbumsPayload: Omit<SaveAlbumsPayload, 'savedAlbums'> & {
    savedAlbums?: Maybe<Array<ResolversParentTypes['Album']>>;
  };
  SaveEpisodesInput: SaveEpisodesInput;
  SaveEpisodesPayload: Omit<SaveEpisodesPayload, 'savedEpisodes'> & {
    savedEpisodes?: Maybe<Array<ResolversParentTypes['Episode']>>;
  };
  SaveShowsInput: SaveShowsInput;
  SaveShowsPayload: Omit<SaveShowsPayload, 'savedShows'> & {
    savedShows?: Maybe<Array<ResolversParentTypes['Show']>>;
  };
  SaveTracksInput: SaveTracksInput;
  SaveTracksPayload: Omit<SaveTracksPayload, 'savedTracks'> & {
    savedTracks?: Maybe<Array<ResolversParentTypes['Track']>>;
  };
  SavedAlbumEdge: Spotify.Object.SavedAlbum;
  SavedAlbumsConnection: Spotify.Object.Paginated<Spotify.Object.SavedAlbum>;
  SavedEpisodeEdge: Spotify.Object.SavedEpisode;
  SavedEpisodesConnection: Spotify.Object.Paginated<Spotify.Object.SavedEpisode>;
  SavedShowEdge: Spotify.Object.SavedShow;
  SavedShowsConnection: Spotify.Object.Paginated<Spotify.Object.SavedShow>;
  SavedTrackEdge: Spotify.Object.SavedTrack;
  SavedTracksConnection: Spotify.Object.Paginated<Spotify.Object.SavedTrack>;
  SchemaField: SchemaField;
  SchemaFieldInput: SchemaFieldInput;
  SearchAlbumEdge: Spotify.Object.AlbumSimplified;
  SearchAlbumsConnection: Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>;
  SearchArtistEdge: Spotify.Object.Artist;
  SearchArtistsConnection: Spotify.Object.Paginated<Spotify.Object.Artist>;
  SearchEpisodeEdge: Spotify.Object.EpisodeSimplified;
  SearchEpisodesConnection: Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>;
  SearchPlaylistEdge: Spotify.Object.PlaylistSimplified;
  SearchPlaylistsConnection: Spotify.Object.Paginated<Spotify.Object.PlaylistSimplified>;
  SearchResults: Spotify.Object.SearchResults;
  SearchShowEdge: Spotify.Object.ShowSimplified;
  SearchShowsConnection: Spotify.Object.Paginated<Spotify.Object.ShowSimplified>;
  SearchTrackEdge: Spotify.Object.Track;
  SearchTracksConnection: Spotify.Object.Paginated<Spotify.Object.Track>;
  Show: Spotify.Object.Show | Spotify.Object.ShowSimplified;
  ShowEpisodeEdge: Spotify.Object.EpisodeSimplified;
  ShowEpisodesConnection: Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>;
  Timestamp: Scalars['Timestamp']['output'];
  TopArtistEdge: Spotify.Object.Artist;
  TopArtistsConnection: Spotify.Object.Paginated<Spotify.Object.Artist>;
  TopTrackEdge: Spotify.Object.Track;
  TopTracksConnection: Spotify.Object.Paginated<Spotify.Object.Track>;
  Track: Spotify.Object.Track | Spotify.Object.TrackSimplified;
  TrackAudioFeatures: Spotify.Object.TrackAudioFeatures;
  TrackExternalIds: TrackExternalIds;
  UpdateFieldConfigInput: UpdateFieldConfigInput;
  UpdateFieldConfigPayload: Omit<UpdateFieldConfigPayload, 'fieldConfig'> & {
    fieldConfig?: Maybe<ResolversParentTypes['FieldConfig']>;
  };
  User: Spotify.Object.User;
  UserProfile: ResolversInterfaceTypes<ResolversParentTypes>['UserProfile'];
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

export type AddItemToPlaybackQueuePayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['AddItemToPlaybackQueuePayload'] = ResolversParentTypes['AddItemToPlaybackQueuePayload'],
> = ResolversObject<{
  playbackQueue?: Resolver<
    Maybe<ResolversTypes['PlaybackQueue']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddItemsToPlaylistPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['AddItemsToPlaylistPayload'] = ResolversParentTypes['AddItemsToPlaylistPayload'],
> = ResolversObject<{
  playlist?: Resolver<
    Maybe<ResolversTypes['Playlist']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Album'] = ResolversParentTypes['Album'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Album']>,
    { __typename: 'Album' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  albumType?: Resolver<ResolversTypes['AlbumType'], ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  copyrights?: Resolver<
    Array<ResolversTypes['Copyright']>,
    ParentType,
    ContextType
  >;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<
    ResolversTypes['ReleaseDate'],
    ParentType,
    ContextType
  >;
  totalTracks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tracks?: Resolver<
    Maybe<ResolversTypes['AlbumTrackConnection']>,
    ParentType,
    ContextType,
    Partial<AlbumTracksArgs>
  >;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumGroupResolvers = {
  ALBUM: 'album';
  APPEARS_ON: 'appears_on';
  COMPILATION: 'compilation';
  SINGLE: 'single';
};

export type AlbumTrackConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['AlbumTrackConnection'] = ResolversParentTypes['AlbumTrackConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['AlbumTrackEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumTrackEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['AlbumTrackEdge'] = ResolversParentTypes['AlbumTrackEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AlbumTypeResolvers = {
  ALBUM: 'album';
  COMPILATION: 'compilation';
  SINGLE: 'single';
};

export type ArtistResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Artist'] = ResolversParentTypes['Artist'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Artist']>,
    { __typename: 'Artist' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  albums?: Resolver<
    Maybe<ResolversTypes['ArtistAlbumsConnection']>,
    ParentType,
    ContextType,
    Partial<ArtistAlbumsArgs>
  >;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relatedArtists?: Resolver<
    Array<ResolversTypes['Artist']>,
    ParentType,
    ContextType
  >;
  topTracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistAlbumEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ArtistAlbumEdge'] = ResolversParentTypes['ArtistAlbumEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistAlbumsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ArtistAlbumsConnection'] = ResolversParentTypes['ArtistAlbumsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Maybe<Array<ResolversTypes['ArtistAlbumEdge']>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContainsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Contains'] = ResolversParentTypes['Contains'],
> = ResolversObject<{
  albums?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType
  >;
  episodes?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType
  >;
  shows?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType
  >;
  tracks?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CopyrightResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Copyright'] = ResolversParentTypes['Copyright'],
> = ResolversObject<{
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<
    Maybe<ResolversTypes['CopyrightType']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface CountryCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export type CurrentUserResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser'],
> = ResolversObject<{
  albums?: Resolver<
    Maybe<ResolversTypes['SavedAlbumsConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserAlbumsArgs>
  >;
  albumsContains?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType,
    RequireFields<CurrentUserAlbumsContainsArgs, 'ids'>
  >;
  episodes?: Resolver<
    Maybe<ResolversTypes['SavedEpisodesConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserEpisodesArgs>
  >;
  episodesContains?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType,
    RequireFields<CurrentUserEpisodesContainsArgs, 'ids'>
  >;
  followedArtists?: Resolver<
    Maybe<ResolversTypes['FollowedArtistsConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserFollowedArtistsArgs>
  >;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  playlists?: Resolver<
    Maybe<ResolversTypes['PlaylistConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserPlaylistsArgs>
  >;
  profile?: Resolver<
    ResolversTypes['CurrentUserProfile'],
    ParentType,
    ContextType
  >;
  shows?: Resolver<
    Maybe<ResolversTypes['SavedShowsConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserShowsArgs>
  >;
  showsContains?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType,
    RequireFields<CurrentUserShowsContainsArgs, 'ids'>
  >;
  topArtists?: Resolver<
    Maybe<ResolversTypes['TopArtistsConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserTopArtistsArgs>
  >;
  topTracks?: Resolver<
    Maybe<ResolversTypes['TopTracksConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserTopTracksArgs>
  >;
  tracks?: Resolver<
    Maybe<ResolversTypes['SavedTracksConnection']>,
    ParentType,
    ContextType,
    Partial<CurrentUserTracksArgs>
  >;
  tracksContains?: Resolver<
    Maybe<Array<ResolversTypes['Boolean']>>,
    ParentType,
    ContextType,
    RequireFields<CurrentUserTracksContainsArgs, 'ids'>
  >;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentUserProfileResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['CurrentUserProfile'] = ResolversParentTypes['CurrentUserProfile'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['CurrentUserProfile']>,
    { __typename: 'CurrentUserProfile' } & GraphQLRecursivePick<
      ParentType,
      { id: true }
    >,
    ContextType
  >;
  country?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explicitContent?: Resolver<
    ResolversTypes['ExplicitContentSettings'],
    ParentType,
    ContextType
  >;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<
    Maybe<Array<ResolversTypes['Image']>>,
    ParentType,
    ContextType
  >;
  product?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentlyPlayingResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['CurrentlyPlaying'] = ResolversParentTypes['CurrentlyPlaying'],
> = ResolversObject<{
  actions?: Resolver<ResolversTypes['Actions'], ParentType, ContextType>;
  context?: Resolver<
    Maybe<ResolversTypes['PlaybackContext']>,
    ParentType,
    ContextType
  >;
  isPlaying?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  item?: Resolver<
    Maybe<ResolversTypes['PlaybackItem']>,
    ParentType,
    ContextType
  >;
  progressMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CursorsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Cursors'] = ResolversParentTypes['Cursors'],
> = ResolversObject<{
  after?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  before?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeveloperResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Developer'] = ResolversParentTypes['Developer'],
> = ResolversObject<{
  fieldConfigs?: Resolver<
    Array<ResolversTypes['FieldConfig']>,
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

export type EpisodeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Episode'] = ResolversParentTypes['Episode'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Episode']>,
    { __typename: 'Episode' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  audioPreviewUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<EpisodeDescriptionArgs, 'format'>
  >;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  explicit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  isExternallyHosted?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  isPlayable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languages?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<
    ResolversTypes['ReleaseDate'],
    ParentType,
    ContextType
  >;
  resumePoint?: Resolver<
    ResolversTypes['ResumePoint'],
    ParentType,
    ContextType
  >;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ErrorRateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ErrorRate'], any> {
  name: 'ErrorRate';
}

export type ExplicitContentSettingsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ExplicitContentSettings'] = ResolversParentTypes['ExplicitContentSettings'],
> = ResolversObject<{
  filterEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  filterLocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExternalUrlResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl'],
> = ResolversObject<{
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeaturedPlaylistConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['FeaturedPlaylistConnection'] = ResolversParentTypes['FeaturedPlaylistConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['FeaturedPlaylistEdge']>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeaturedPlaylistEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['FeaturedPlaylistEdge'] = ResolversParentTypes['FeaturedPlaylistEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FieldConfigResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['FieldConfig'] = ResolversParentTypes['FieldConfig'],
> = ResolversObject<{
  errorRate?: Resolver<ResolversTypes['ErrorRate'], ParentType, ContextType>;
  schemaField?: Resolver<
    ResolversTypes['SchemaField'],
    ParentType,
    ContextType
  >;
  timeout?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowedArtistEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['FollowedArtistEdge'] = ResolversParentTypes['FollowedArtistEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Artist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowedArtistsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['FollowedArtistsConnection'] = ResolversParentTypes['FollowedArtistsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['FollowedArtistEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    ResolversTypes['PageInfoCursorBased'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowersResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Followers'] = ResolversParentTypes['Followers'],
> = ResolversObject<{
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Image'] = ResolversParentTypes['Image'],
> = ResolversObject<{
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  addItemToPlaybackQueue?: Resolver<
    Maybe<ResolversTypes['AddItemToPlaybackQueuePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddItemToPlaybackQueueArgs, 'input'>
  >;
  addItemsToPlaylist?: Resolver<
    Maybe<ResolversTypes['AddItemsToPlaylistPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddItemsToPlaylistArgs, 'input'>
  >;
  removeItemFromPlaylist?: Resolver<
    Maybe<ResolversTypes['RemoveItemFromPlaylistPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveItemFromPlaylistArgs, 'input'>
  >;
  removeSavedAlbums?: Resolver<
    Maybe<ResolversTypes['RemoveSavedAlbumsPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSavedAlbumsArgs, 'input'>
  >;
  removeSavedEpisodes?: Resolver<
    Maybe<ResolversTypes['RemoveSavedEpisodesPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSavedEpisodesArgs, 'input'>
  >;
  removeSavedShows?: Resolver<
    Maybe<ResolversTypes['RemoveSavedShowsPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSavedShowsArgs, 'input'>
  >;
  removeSavedTracks?: Resolver<
    Maybe<ResolversTypes['RemoveSavedTracksPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSavedTracksArgs, 'input'>
  >;
  resetFieldConfig?: Resolver<
    Maybe<ResolversTypes['ResetFieldConfigPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationResetFieldConfigArgs, 'input'>
  >;
  saveAlbums?: Resolver<
    Maybe<ResolversTypes['SaveAlbumsPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSaveAlbumsArgs, 'input'>
  >;
  saveEpisodes?: Resolver<
    Maybe<ResolversTypes['SaveEpisodesPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSaveEpisodesArgs, 'input'>
  >;
  saveShows?: Resolver<
    Maybe<ResolversTypes['SaveShowsPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSaveShowsArgs, 'input'>
  >;
  saveTracks?: Resolver<
    Maybe<ResolversTypes['SaveTracksPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSaveTracksArgs, 'input'>
  >;
  updateFieldConfig?: Resolver<
    Maybe<ResolversTypes['UpdateFieldConfigPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFieldConfigArgs, 'input'>
  >;
}>;

export type NewReleaseEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['NewReleaseEdge'] = ResolversParentTypes['NewReleaseEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewReleasesConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['NewReleasesConnection'] = ResolversParentTypes['NewReleasesConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['NewReleaseEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo'],
> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoCursorBasedResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PageInfoCursorBased'] = ResolversParentTypes['PageInfoCursorBased'],
> = ResolversObject<{
  cursors?: Resolver<Maybe<ResolversTypes['Cursors']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'Episode' | 'Track', ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PlaybackQueueResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaybackQueue'] = ResolversParentTypes['PlaybackQueue'],
> = ResolversObject<{
  currentlyPlaying?: Resolver<
    Maybe<ResolversTypes['PlaybackItem']>,
    ParentType,
    ContextType
  >;
  queue?: Resolver<
    Array<ResolversTypes['PlaybackItem']>,
    ParentType,
    ContextType
  >;
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

export type PlayerResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Player'] = ResolversParentTypes['Player'],
> = ResolversObject<{
  currentlyPlaying?: Resolver<
    Maybe<ResolversTypes['CurrentlyPlaying']>,
    ParentType,
    ContextType
  >;
  devices?: Resolver<
    Maybe<Array<ResolversTypes['Device']>>,
    ParentType,
    ContextType
  >;
  playbackQueue?: Resolver<
    Maybe<ResolversTypes['PlaybackQueue']>,
    ParentType,
    ContextType
  >;
  playbackState?: Resolver<
    Maybe<ResolversTypes['PlaybackState']>,
    ParentType,
    ContextType
  >;
  recentlyPlayed?: Resolver<
    Maybe<ResolversTypes['RecentlyPlayedConnection']>,
    ParentType,
    ContextType,
    Partial<PlayerRecentlyPlayedArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Playlist']>,
    { __typename: 'Playlist' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  collaborative?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<
    Maybe<Array<ResolversTypes['Image']>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  public?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  tracks?: Resolver<
    ResolversTypes['PlaylistTrackConnection'],
    ParentType,
    ContextType,
    Partial<PlaylistTracksArgs>
  >;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaylistConnection'] = ResolversParentTypes['PlaylistConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['PlaylistEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaylistEdge'] = ResolversParentTypes['PlaylistEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistTrackResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaylistTrack'] = ResolversParentTypes['PlaylistTrack'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<'Episode' | 'Track', ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PlaylistTrackConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaylistTrackConnection'] = ResolversParentTypes['PlaylistTrackConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['PlaylistTrackEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlaylistTrackEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['PlaylistTrackEdge'] = ResolversParentTypes['PlaylistTrackEdge'],
> = ResolversObject<{
  addedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  addedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlaylistTrack'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  album?: Resolver<
    Maybe<ResolversTypes['Album']>,
    ParentType,
    ContextType,
    RequireFields<QueryAlbumArgs, 'id'>
  >;
  albums?: Resolver<
    Maybe<Array<ResolversTypes['Album']>>,
    ParentType,
    ContextType,
    RequireFields<QueryAlbumsArgs, 'ids'>
  >;
  artist?: Resolver<
    Maybe<ResolversTypes['Artist']>,
    ParentType,
    ContextType,
    RequireFields<QueryArtistArgs, 'id'>
  >;
  artists?: Resolver<
    Maybe<Array<ResolversTypes['Artist']>>,
    ParentType,
    ContextType,
    RequireFields<QueryArtistsArgs, 'ids'>
  >;
  developer?: Resolver<ResolversTypes['Developer'], ParentType, ContextType>;
  episode?: Resolver<
    Maybe<ResolversTypes['Episode']>,
    ParentType,
    ContextType,
    RequireFields<QueryEpisodeArgs, 'id'>
  >;
  episodes?: Resolver<
    Maybe<Array<ResolversTypes['Episode']>>,
    ParentType,
    ContextType,
    RequireFields<QueryEpisodesArgs, 'ids'>
  >;
  featuredPlaylists?: Resolver<
    Maybe<ResolversTypes['FeaturedPlaylistConnection']>,
    ParentType,
    ContextType,
    Partial<QueryFeaturedPlaylistsArgs>
  >;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['CurrentUser']>, ParentType, ContextType>;
  newReleases?: Resolver<
    Maybe<ResolversTypes['NewReleasesConnection']>,
    ParentType,
    ContextType,
    Partial<QueryNewReleasesArgs>
  >;
  playlist?: Resolver<
    Maybe<ResolversTypes['Playlist']>,
    ParentType,
    ContextType,
    RequireFields<QueryPlaylistArgs, 'id'>
  >;
  recommendations?: Resolver<
    Maybe<ResolversTypes['Recommendations']>,
    ParentType,
    ContextType,
    RequireFields<QueryRecommendationsArgs, 'seeds'>
  >;
  search?: Resolver<
    Maybe<ResolversTypes['SearchResults']>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, 'q' | 'type'>
  >;
  show?: Resolver<
    Maybe<ResolversTypes['Show']>,
    ParentType,
    ContextType,
    RequireFields<QueryShowArgs, 'id'>
  >;
  shows?: Resolver<
    Maybe<Array<ResolversTypes['Show']>>,
    ParentType,
    ContextType,
    RequireFields<QueryShowsArgs, 'ids'>
  >;
  track?: Resolver<
    Maybe<ResolversTypes['Track']>,
    ParentType,
    ContextType,
    RequireFields<QueryTrackArgs, 'id'>
  >;
  tracks?: Resolver<
    Maybe<Array<ResolversTypes['Track']>>,
    ParentType,
    ContextType,
    RequireFields<QueryTracksArgs, 'ids'>
  >;
  tracksAudioFeatures?: Resolver<
    Array<ResolversTypes['TrackAudioFeatures']>,
    ParentType,
    ContextType,
    RequireFields<QueryTracksAudioFeaturesArgs, 'ids'>
  >;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
}>;

export type RecentlyPlayedConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RecentlyPlayedConnection'] = ResolversParentTypes['RecentlyPlayedConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['RecentlyPlayedEdge']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecentlyPlayedEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RecentlyPlayedEdge'] = ResolversParentTypes['RecentlyPlayedEdge'],
> = ResolversObject<{
  context?: Resolver<
    Maybe<ResolversTypes['PlaybackContext']>,
    ParentType,
    ContextType
  >;
  node?: Resolver<ResolversTypes['PlaybackItem'], ParentType, ContextType>;
  playedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecommendationSeedResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RecommendationSeed'] = ResolversParentTypes['RecommendationSeed'],
> = ResolversObject<{
  afterFilteringSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  afterRelinkingSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initialPoolSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['RecommendationSeedType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecommendationsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Recommendations'] = ResolversParentTypes['Recommendations'],
> = ResolversObject<{
  seeds?: Resolver<
    Array<ResolversTypes['RecommendationSeed']>,
    ParentType,
    ContextType
  >;
  tracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReleaseDateResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ReleaseDate'] = ResolversParentTypes['ReleaseDate'],
> = ResolversObject<{
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  precision?: Resolver<
    ResolversTypes['ReleaseDatePrecision'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReleaseDatePrecisionResolvers = {
  DAY: 'day';
  MONTH: 'month';
  YEAR: 'year';
};

export type RemoveItemFromPlaylistPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RemoveItemFromPlaylistPayload'] = ResolversParentTypes['RemoveItemFromPlaylistPayload'],
> = ResolversObject<{
  playlist?: Resolver<
    Maybe<ResolversTypes['Playlist']>,
    ParentType,
    ContextType
  >;
  snapshotId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedAlbumsPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RemoveSavedAlbumsPayload'] = ResolversParentTypes['RemoveSavedAlbumsPayload'],
> = ResolversObject<{
  removedAlbums?: Resolver<
    Maybe<Array<ResolversTypes['Album']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedEpisodesPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RemoveSavedEpisodesPayload'] = ResolversParentTypes['RemoveSavedEpisodesPayload'],
> = ResolversObject<{
  removedEpisodes?: Resolver<
    Maybe<Array<ResolversTypes['Episode']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedShowsPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RemoveSavedShowsPayload'] = ResolversParentTypes['RemoveSavedShowsPayload'],
> = ResolversObject<{
  removedShows?: Resolver<
    Maybe<Array<ResolversTypes['Show']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveSavedTracksPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['RemoveSavedTracksPayload'] = ResolversParentTypes['RemoveSavedTracksPayload'],
> = ResolversObject<{
  removedTracks?: Resolver<
    Maybe<Array<ResolversTypes['Track']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepeatModeResolvers = {
  CONTEXT: 'context';
  OFF: 'off';
  TRACK: 'track';
};

export type ResetFieldConfigPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ResetFieldConfigPayload'] = ResolversParentTypes['ResetFieldConfigPayload'],
> = ResolversObject<{
  fieldConfig?: Resolver<
    Maybe<ResolversTypes['FieldConfig']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResumePointResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ResumePoint'] = ResolversParentTypes['ResumePoint'],
> = ResolversObject<{
  fullyPlayed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resumePositionMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveAlbumsPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SaveAlbumsPayload'] = ResolversParentTypes['SaveAlbumsPayload'],
> = ResolversObject<{
  savedAlbums?: Resolver<
    Maybe<Array<ResolversTypes['Album']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveEpisodesPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SaveEpisodesPayload'] = ResolversParentTypes['SaveEpisodesPayload'],
> = ResolversObject<{
  savedEpisodes?: Resolver<
    Maybe<Array<ResolversTypes['Episode']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveShowsPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SaveShowsPayload'] = ResolversParentTypes['SaveShowsPayload'],
> = ResolversObject<{
  savedShows?: Resolver<
    Maybe<Array<ResolversTypes['Show']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaveTracksPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SaveTracksPayload'] = ResolversParentTypes['SaveTracksPayload'],
> = ResolversObject<{
  savedTracks?: Resolver<
    Maybe<Array<ResolversTypes['Track']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedAlbumEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedAlbumEdge'] = ResolversParentTypes['SavedAlbumEdge'],
> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedAlbumsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedAlbumsConnection'] = ResolversParentTypes['SavedAlbumsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SavedAlbumEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedEpisodeEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedEpisodeEdge'] = ResolversParentTypes['SavedEpisodeEdge'],
> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedEpisodesConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedEpisodesConnection'] = ResolversParentTypes['SavedEpisodesConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SavedEpisodeEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedShowEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedShowEdge'] = ResolversParentTypes['SavedShowEdge'],
> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedShowsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedShowsConnection'] = ResolversParentTypes['SavedShowsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SavedShowEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedTrackEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedTrackEdge'] = ResolversParentTypes['SavedTrackEdge'],
> = ResolversObject<{
  addedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedTracksConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SavedTracksConnection'] = ResolversParentTypes['SavedTracksConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SavedTrackEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SchemaFieldResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SchemaField'] = ResolversParentTypes['SchemaField'],
> = ResolversObject<{
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchAlbumEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchAlbumEdge'] = ResolversParentTypes['SearchAlbumEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchAlbumsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchAlbumsConnection'] = ResolversParentTypes['SearchAlbumsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SearchAlbumEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchArtistEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchArtistEdge'] = ResolversParentTypes['SearchArtistEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Artist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchArtistsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchArtistsConnection'] = ResolversParentTypes['SearchArtistsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SearchArtistEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchEpisodeEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchEpisodeEdge'] = ResolversParentTypes['SearchEpisodeEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchEpisodesConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchEpisodesConnection'] = ResolversParentTypes['SearchEpisodesConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SearchEpisodeEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchExternalValueResolvers = { AUDIO: 'audio' };

export type SearchPlaylistEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchPlaylistEdge'] = ResolversParentTypes['SearchPlaylistEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchPlaylistsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchPlaylistsConnection'] = ResolversParentTypes['SearchPlaylistsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SearchPlaylistEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchResultsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchResults'] = ResolversParentTypes['SearchResults'],
> = ResolversObject<{
  albums?: Resolver<
    Maybe<ResolversTypes['SearchAlbumsConnection']>,
    ParentType,
    ContextType
  >;
  artists?: Resolver<
    Maybe<ResolversTypes['SearchArtistsConnection']>,
    ParentType,
    ContextType
  >;
  episodes?: Resolver<
    Maybe<ResolversTypes['SearchEpisodesConnection']>,
    ParentType,
    ContextType
  >;
  playlists?: Resolver<
    Maybe<ResolversTypes['SearchPlaylistsConnection']>,
    ParentType,
    ContextType
  >;
  shows?: Resolver<
    Maybe<ResolversTypes['SearchShowsConnection']>,
    ParentType,
    ContextType
  >;
  tracks?: Resolver<
    Maybe<ResolversTypes['SearchTracksConnection']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchShowEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchShowEdge'] = ResolversParentTypes['SearchShowEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchShowsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchShowsConnection'] = ResolversParentTypes['SearchShowsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SearchShowEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchTrackEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchTrackEdge'] = ResolversParentTypes['SearchTrackEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchTracksConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['SearchTracksConnection'] = ResolversParentTypes['SearchTracksConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SearchTrackEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchTypeResolvers = {
  ALBUM: 'album';
  ARTIST: 'artist';
  EPISODE: 'episode';
  PLAYLIST: 'playlist';
  SHOW: 'show';
  TRACK: 'track';
};

export type ShowResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Show'] = ResolversParentTypes['Show'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Show']>,
    { __typename: 'Show' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  description?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<ShowDescriptionArgs, 'format'>
  >;
  episodes?: Resolver<
    Maybe<ResolversTypes['ShowEpisodesConnection']>,
    ParentType,
    ContextType,
    Partial<ShowEpisodesArgs>
  >;
  explicit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  isExternallyHosted?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  languages?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  mediaType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShowEpisodeEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ShowEpisodeEdge'] = ResolversParentTypes['ShowEpisodeEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShowEpisodesConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['ShowEpisodesConnection'] = ResolversParentTypes['ShowEpisodesConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['ShowEpisodeEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimeRangeResolvers = {
  LONG_TERM: 'long_term';
  MEDIUM_TERM: 'medium_term';
  SHORT_TERM: 'short_term';
};

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TopArtistEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TopArtistEdge'] = ResolversParentTypes['TopArtistEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Artist'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopArtistsConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TopArtistsConnection'] = ResolversParentTypes['TopArtistsConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['TopArtistEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopTrackEdgeResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TopTrackEdge'] = ResolversParentTypes['TopTrackEdge'],
> = ResolversObject<{
  node?: Resolver<ResolversTypes['Track'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopTracksConnectionResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TopTracksConnection'] = ResolversParentTypes['TopTracksConnection'],
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['TopTrackEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['Track'] = ResolversParentTypes['Track'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Track']>,
    { __typename: 'Track' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  album?: Resolver<ResolversTypes['Album'], ParentType, ContextType>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  audioFeatures?: Resolver<
    Maybe<ResolversTypes['TrackAudioFeatures']>,
    ParentType,
    ContextType
  >;
  discNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  explicit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalIds?: Resolver<
    Maybe<ResolversTypes['TrackExternalIds']>,
    ParentType,
    ContextType
  >;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLocal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPlayable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  previewUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  trackNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackAudioFeaturesResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TrackAudioFeatures'] = ResolversParentTypes['TrackAudioFeatures'],
> = ResolversObject<{
  acousticness?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  analysisUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  danceability?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  energy?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instrumentalness?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  liveness?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  loudness?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  mode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  speechiness?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tempo?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timeSignature?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trackHref?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valence?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackExternalIdsResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['TrackExternalIds'] = ResolversParentTypes['TrackExternalIds'],
> = ResolversObject<{
  ean?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  upc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateFieldConfigPayloadResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['UpdateFieldConfigPayload'] = ResolversParentTypes['UpdateFieldConfigPayload'],
> = ResolversObject<{
  fieldConfig?: Resolver<
    Maybe<ResolversTypes['FieldConfig']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    { __typename: 'User' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >;
  displayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  externalUrls?: Resolver<
    ResolversTypes['ExternalUrl'],
    ParentType,
    ContextType
  >;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<
    Maybe<Array<ResolversTypes['Image']>>,
    ParentType,
    ContextType
  >;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProfileResolvers<
  ContextType = ContextValue,
  ParentType extends
    ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile'],
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'CurrentUserProfile' | 'User',
    ParentType,
    ContextType
  >;
  displayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<
    Maybe<Array<ResolversTypes['Image']>>,
    ParentType,
    ContextType
  >;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  CurrentUserProfile?: CurrentUserProfileResolvers<ContextType>;
  CurrentlyPlaying?: CurrentlyPlayingResolvers<ContextType>;
  Cursors?: CursorsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Developer?: DeveloperResolvers<ContextType>;
  Device?: DeviceResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  ErrorRate?: GraphQLScalarType;
  ExplicitContentSettings?: ExplicitContentSettingsResolvers<ContextType>;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  FeaturedPlaylistConnection?: FeaturedPlaylistConnectionResolvers<ContextType>;
  FeaturedPlaylistEdge?: FeaturedPlaylistEdgeResolvers<ContextType>;
  FieldConfig?: FieldConfigResolvers<ContextType>;
  FollowedArtistEdge?: FollowedArtistEdgeResolvers<ContextType>;
  FollowedArtistsConnection?: FollowedArtistsConnectionResolvers<ContextType>;
  Followers?: FollowersResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NewReleaseEdge?: NewReleaseEdgeResolvers<ContextType>;
  NewReleasesConnection?: NewReleasesConnectionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PageInfoCursorBased?: PageInfoCursorBasedResolvers<ContextType>;
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
  ResumePoint?: ResumePointResolvers<ContextType>;
  SaveAlbumsPayload?: SaveAlbumsPayloadResolvers<ContextType>;
  SaveEpisodesPayload?: SaveEpisodesPayloadResolvers<ContextType>;
  SaveShowsPayload?: SaveShowsPayloadResolvers<ContextType>;
  SaveTracksPayload?: SaveTracksPayloadResolvers<ContextType>;
  SavedAlbumEdge?: SavedAlbumEdgeResolvers<ContextType>;
  SavedAlbumsConnection?: SavedAlbumsConnectionResolvers<ContextType>;
  SavedEpisodeEdge?: SavedEpisodeEdgeResolvers<ContextType>;
  SavedEpisodesConnection?: SavedEpisodesConnectionResolvers<ContextType>;
  SavedShowEdge?: SavedShowEdgeResolvers<ContextType>;
  SavedShowsConnection?: SavedShowsConnectionResolvers<ContextType>;
  SavedTrackEdge?: SavedTrackEdgeResolvers<ContextType>;
  SavedTracksConnection?: SavedTracksConnectionResolvers<ContextType>;
  SchemaField?: SchemaFieldResolvers<ContextType>;
  SearchAlbumEdge?: SearchAlbumEdgeResolvers<ContextType>;
  SearchAlbumsConnection?: SearchAlbumsConnectionResolvers<ContextType>;
  SearchArtistEdge?: SearchArtistEdgeResolvers<ContextType>;
  SearchArtistsConnection?: SearchArtistsConnectionResolvers<ContextType>;
  SearchEpisodeEdge?: SearchEpisodeEdgeResolvers<ContextType>;
  SearchEpisodesConnection?: SearchEpisodesConnectionResolvers<ContextType>;
  SearchExternalValue?: SearchExternalValueResolvers;
  SearchPlaylistEdge?: SearchPlaylistEdgeResolvers<ContextType>;
  SearchPlaylistsConnection?: SearchPlaylistsConnectionResolvers<ContextType>;
  SearchResults?: SearchResultsResolvers<ContextType>;
  SearchShowEdge?: SearchShowEdgeResolvers<ContextType>;
  SearchShowsConnection?: SearchShowsConnectionResolvers<ContextType>;
  SearchTrackEdge?: SearchTrackEdgeResolvers<ContextType>;
  SearchTracksConnection?: SearchTracksConnectionResolvers<ContextType>;
  SearchType?: SearchTypeResolvers;
  Show?: ShowResolvers<ContextType>;
  ShowEpisodeEdge?: ShowEpisodeEdgeResolvers<ContextType>;
  ShowEpisodesConnection?: ShowEpisodesConnectionResolvers<ContextType>;
  TimeRange?: TimeRangeResolvers;
  Timestamp?: GraphQLScalarType;
  TopArtistEdge?: TopArtistEdgeResolvers<ContextType>;
  TopArtistsConnection?: TopArtistsConnectionResolvers<ContextType>;
  TopTrackEdge?: TopTrackEdgeResolvers<ContextType>;
  TopTracksConnection?: TopTracksConnectionResolvers<ContextType>;
  Track?: TrackResolvers<ContextType>;
  TrackAudioFeatures?: TrackAudioFeaturesResolvers<ContextType>;
  TrackExternalIds?: TrackExternalIdsResolvers<ContextType>;
  UpdateFieldConfigPayload?: UpdateFieldConfigPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ContextValue> = ResolversObject<{
  contact?: ContactDirectiveResolver<any, any, ContextType>;
  synthetics?: SyntheticsDirectiveResolver<any, any, ContextType>;
}>;
