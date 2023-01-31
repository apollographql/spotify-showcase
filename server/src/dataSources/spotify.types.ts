import { OAUTH_SCOPES } from '../constants';

type RestrictScope<
  T,
  TScope extends string
> = TScope extends typeof OAUTH_SCOPES[number] ? T : never;

type Prop<T, Key extends string> = Key extends keyof T ? T[Key] : never;

type WithinKey<Key extends string, T> = { [K in Key]: T };

export namespace Spotify {
  export type HTTPMethod = 'DELETE' | 'GET' | 'POST' | 'PUT';

  export namespace Error {
    export interface AuthenticationError {
      error: string;
      error_description: string;
    }

    export interface RegularError {
      error: {
        status: number;
        message: string;
        reason?: string;
      };
    }
  }

  export namespace Object {
    export interface Actions {
      disallows: Disallows;
    }

    export interface Album {
      album_type: AlbumType;
      artists: ArtistSimplified[];
      available_markets: CountryCode[];
      copyrights: Copyright[];
      external_ids: ExternalId;
      external_urls: ExternalUrl;
      genres: string[];
      href: string;
      id: string;
      images: Image[];
      label: string;
      name: string;
      release_date: string;
      release_date_precision: ReleaseDatePrecision;
      total_tracks: number;
      tracks: Paginated<TrackSimplified>;
      type: 'album';
      uri: string;
    }

    export interface AlbumSimplified {
      album_type: AlbumType;
      album_group: AlbumGroup;
      artists: ArtistSimplified;
      available_markets: CountryCode[];
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: ReleaseDatePrecision;
      restrictions?: Restrictions;
      total_tracks: number;
      type: 'album';
      uri: string;
    }

    export type AlbumGroup = 'album' | 'appears_on' | 'compilation' | 'single';
    export type AlbumType = 'album' | 'compilation' | 'single';

    export interface Artist {
      external_urls: ExternalUrl;
      followers: Followers;
      genres: string[];
      href: string;
      id: string;
      images: Image[];
      name: string;
      popularity: number;
      type: 'artist';
      uri: string;
    }

    export interface ArtistTopTracks {
      tracks: Track[];
    }

    export interface ArtistSimplified {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }

    export interface AuthorizationCodeCredentials {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
      token_type: 'Bearer';
    }

    export interface Context {
      type: 'artist' | 'playlist' | 'album' | 'show';
      href: string;
      external_urls: ExternalUrl;
      uri: string;
    }

    export interface Copyright {
      text: string;
      type: CopyrightType;
    }

    export type CopyrightType = 'C' | 'P';

    export type CountryCode = string;

    export interface CurrentlyPlaying {
      context: Context;
      timestamp: number;
      progress_ms: number;
      is_playing: boolean;
      item: Track | Episode | null;
      currently_playing_type: CurrentlyPlayingType;
      actions: Actions;
    }

    export type CurrentlyPlayingType = 'track' | 'episode' | 'ad' | 'unknown';

    export interface CurrentUser {
      country: RestrictScope<string, 'user-read-private'>;
      display_name: string | null;
      email: RestrictScope<string, 'user-read-email'>;
      explicit_content: RestrictScope<
        {
          filter_enabled: boolean;
          filter_locked: boolean;
        },
        'user-read-private'
      >;
      external_urls: ExternalUrl;
      followers: Followers;
      href: string;
      id: string;
      images: Image[];
      product: RestrictScope<string, 'user-read-private'>;
      type: 'user';
      uri: string;
    }

    export interface Cursors {
      after?: string;
      before?: string;
    }

    export interface Device {
      id: string;
      is_active: boolean;
      is_private_session: boolean;
      is_restricted: boolean;
      name: string;
      type: string;
      volume_percent: number;
    }

    export interface Disallows {
      interrupting_playback?: boolean;
      pausing?: boolean;
      resuming?: boolean;
      seeking?: boolean;
      skipping_next?: boolean;
      skipping_prev?: boolean;
      toggling_repeat_context?: boolean;
      toggling_shuffle?: boolean;
      toggling_repeat_track?: boolean;
      transferring_playback?: boolean;
    }

    export interface Episode {
      audio_preview_url: string | null;
      description: string;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrl;
      href: string;
      html_description: string;
      id: string;
      images: Image[];
      is_externally_hosted: boolean;
      is_playable: boolean;
      languages: string[];
      name: string;
      release_date: string;
      release_date_precision: ReleaseDatePrecision;
      resume_point: RestrictScope<ResumePoint, 'user-read-playback-position'>;
      show: ShowSimplified;
      type: 'episode';
      uri: string;
    }

    export interface EpisodeSimplified {
      audio_preview_url: string | null;
      description: string;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrl;
      href: string;
      html_description: string;
      id: string;
      images: Image[];
      is_externally_hosted: boolean;
      is_playable: boolean;
      languages: string[];
      name: string;
      release_date: string;
      release_date_precision: ReleaseDatePrecision;
      resume_point: RestrictScope<ResumePoint, 'user-read-playback-position'>;
      type: 'episode';
      uri: string;
    }

    export type ExternalId = Record<string, string>;

    export interface ExternalUrl {
      spotify: string;
    }

    export interface FeaturedPlaylists {
      message: string;
      playlists: Paginated<PlaylistSimplified>;
    }

    export interface Followers {
      href: string | null;
      total: number;
    }

    export type List<Key extends string, TObject> = WithinKey<Key, TObject[]>;

    export interface Image {
      url: string;
      height: number | null;
      weight: number | null;
    }

    export interface NewReleases {
      albums: Paginated<AlbumSimplified>;
    }

    export interface Paginated<T> {
      items: T[];
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    }

    export interface PaginatedCursorBased<T> {
      href: string;
      items: T[];
      limit: number;
      next: string | null;
      cursors: Cursors;
      total: number;
    }

    export interface PlaybackState {
      device: Device;
      repeat_state: RepeatMode;
      shuffle_state: boolean;
      context: Context | null;
      timestamp: number;
      progress_ms: number | null;
      is_playing: boolean;
      item: Track | Episode | null;
      currently_playing_type: CurrentlyPlayingType;
      actions: Actions;
    }

    export interface PlaybackQueue {
      currently_playing: Track | Episode | null;
      queue: (Track | Episode)[];
    }

    export interface PlayHistory {
      track: TrackSimplified;
      played_at: string;
      context: Context;
    }

    export interface Playlist {
      collaborative: boolean;
      description: string | null;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      name: string;
      owner: User;
      primary_color: string | null;
      public: boolean | null;
      snapshot_id: string;
      tracks: Paginated<PlaylistTrack>;
      type: 'playlist';
      uri: string;
    }

    export interface PlaylistSimplified {
      collaborative: boolean;
      description: string | null;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      name: string;
      owner: User;
      primary_color: string | null;
      public: boolean | null;
      snapshot_id: string;
      tracks: PlaylistTracksInformation;
      type: 'playlist';
      uri: string;
    }

    export interface PlaylistTracksInformation {
      href: string;
      total: number;
    }

    export type PlaylistItem = Track | PlaylistEpisode;

    export interface PlaylistEpisode {
      album: PlaylistEpisodeShow;
      artist: PlaylistEpisodeArtist[];
      available_markets: CountryCode[];
      disc_number: number;
      duration_ms: number;
      episode: boolean;
      explicit: boolean;
      external_ids: ExternalId;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      is_local: boolean;
      is_playable: boolean;
      name: string;
      popularity: number;
      preview_url: string;
      track: boolean;
      track_number: number;
      type: 'episode';
      uri: string;
    }

    export interface PlaylistEpisodeShow {
      album_type: AlbumType;
      artists: PlaylistEpisodeArtist[];
      available_markets: CountryCode[];
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      is_playable: boolean;
      name: string;
      release_date: string | null;
      release_date_precision: ReleaseDatePrecision | null;
      restrictions: Restrictions;
      total_tracks: number;
      type: 'show';
      uri: string;
    }

    export interface PlaylistEpisodeArtist {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      name: string;
      type: 'show';
      uri: string;
    }

    export interface PlaylistTrack {
      added_at: string;
      added_by: UserSimplified;
      is_local: boolean;
      primary_color: string | null;
      track: PlaylistItem;
      video_thumbnail: {
        url: string | null;
      };
    }

    export type RepeatMode = 'context' | 'off' | 'track';

    export interface Recommendations {
      seeds: RecommendationSeed[];
      tracks: Track[];
    }

    export interface RecommendationSeed {
      afterFilteringSize: number;
      afterRelinkingSize: number;
      href: string;
      id: string;
      initialPoolSize: number;
      type: 'ARTIST' | 'TRACK' | 'GENRE';
    }

    export type ReleaseDatePrecision = 'day' | 'month' | 'year';

    export interface Restrictions {
      reason: 'market' | 'product' | 'explicit';
    }

    export interface ResumePoint {
      fully_played: boolean;
      resume_position_ms: number;
    }

    export interface SavedAlbum {
      added_at: string;
      album: Album;
    }

    export interface SavedTrack {
      added_at: string;
      track: Track;
    }

    export interface SearchResults {
      albums?: Paginated<AlbumSimplified>;
      artists?: Paginated<Artist>;
      episodes?: Paginated<EpisodeSimplified>;
      playlists?: Paginated<PlaylistSimplified>;
      tracks?: Paginated<Track>;
      shows?: Paginated<ShowSimplified>;
    }

    export interface Show {
      available_markets: CountryCode[];
      copyrights: Copyright[];
      description: string;
      episodes: Paginated<EpisodeSimplified>;
      explicit: boolean;
      external_urls: ExternalUrl;
      href: string;
      html_description: string;
      id: string;
      images: Image[];
      is_externally_hosted: boolean | null;
      languages: string[];
      media_type: string;
      name: string;
      publisher: string;
      type: 'show';
      uri: string;
    }

    export interface ShowSimplified {
      available_markets: CountryCode[];
      copyrights: Copyright[];
      description: string;
      explicit: boolean;
      external_urls: ExternalUrl;
      href: string;
      html_description: string;
      id: string;
      images: Image[];
      is_externally_hosted: boolean | null;
      languages: string[];
      media_type: string;
      name: string;
      publisher: string;
      type: 'show';
      uri: string;
    }

    export interface Track {
      album: AlbumSimplified;
      artists: ArtistSimplified[];
      available_markets: CountryCode[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: ExternalId;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      is_local: boolean;
      is_playable?: boolean;
      linked_from?: Track;
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      restrictions?: Restrictions;
      type: 'track';
      uri: string;
    }

    export interface TrackSimplified {
      artists: ArtistSimplified[];
      available_markets: CountryCode[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      is_local: boolean;
      is_playable?: boolean;
      linked_from?: TrackSimplifiedLinkedFrom;
      restrictions?: Restrictions;
      name: string;
      preview_url: string;
      track_number: number;
      type: 'track';
      uri: string;
    }

    export interface TrackAudioFeatures {
      acousticness: number;
      analysis_url: string;
      danceability: number;
      duration_ms: number;
      energy: number;
      id: string;
      instrumentalness: number;
      key: number;
      liveness: number;
      loudness: number;
      mode: number;
      speechiness: number;
      tempo: number;
      time_signature: number;
      track_href: string;
      uri: string;
      valence: number;
    }

    export interface TrackSimplifiedLinkedFrom {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      type: 'track';
      uri: string;
    }

    export interface User {
      display_name: string | null;
      external_urls: ExternalUrl;
      followers: Followers;
      href: string;
      id: string;
      images: Image[] | null;
      type: 'user';
      uri: string;
    }

    export interface UserSimplified {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      type: 'user';
      uri: string;
    }
  }

  export namespace Response {
    export interface DELETE {
      '/playlists/:id/tracks': {
        snapshot_id: string;
      };
    }

    export interface POST {
      '/playlists/:id/tracks': {
        snapshot_id: string;
      };
    }

    export interface GET {
      '/albums': Object.List<'albums', Object.Album>;
      '/albums/:id': Object.Album;
      '/albums/:id/tracks': Object.Paginated<Object.TrackSimplified>;
      '/artists': Object.List<'artists', Object.Artist>;
      '/artists/:id': Object.Artist;
      '/artists/:id/albums': Object.Paginated<Object.AlbumSimplified>;
      '/artists/:id/related-artists': Object.List<'artists', Object.Artist>;
      '/artists/:id/top-tracks': Object.ArtistTopTracks;
      '/audio-features': Object.List<
        'audio_features',
        Object.TrackAudioFeatures
      >;
      '/audio-features/:id': Object.TrackAudioFeatures;
      '/authorize':
        | { code: string; state?: string }
        | { error: string; state?: string };
      '/api/token': Object.AuthorizationCodeCredentials;
      '/browse/featured-playlists': Object.FeaturedPlaylists;
      '/browse/new-releases': Object.NewReleases;
      '/episodes': Object.List<'episodes', Object.Episode>;
      '/episodes/:id': Object.Episode;
      '/me': Object.CurrentUser;
      '/me/albums': Object.Paginated<Object.SavedAlbum>;
      '/me/albums/contains': boolean[];
      '/me/episodes/contains': boolean[];
      '/me/following': WithinKey<
        'artists',
        Object.PaginatedCursorBased<Object.Artist>
      >;
      '/me/player': Object.PlaybackState;
      '/me/player/currently-playing': Object.CurrentlyPlaying;
      '/me/player/devices': Object.List<'devices', Object.Device>;
      '/me/player/queue': Object.PlaybackQueue;
      '/me/player/recently-played': Object.PaginatedCursorBased<Object.PlayHistory>;
      '/me/playlists': Object.Paginated<Object.Playlist>;
      '/me/shows/contains': boolean[];
      '/me/top/artists': Object.Paginated<Object.Artist>;
      '/me/top/tracks': Object.Paginated<Object.Track>;
      '/me/tracks': Object.Paginated<Object.SavedTrack>;
      '/me/tracks/contains': boolean[];
      '/playlists/:id': Object.Playlist;
      '/playlists/:id/tracks': Object.Paginated<Object.PlaylistTrack>;
      '/recommendations': Object.Recommendations;
      '/recommendations/available-genre-seeds': Object.List<'genres', string>;
      '/search': Object.SearchResults;
      '/shows': Object.List<'shows', Object.Show>;
      '/shows/:id': Object.Show;
      '/shows/:id/episodes': Object.Paginated<Object.EpisodeSimplified>;
      '/tracks': Object.List<'tracks', Object.Track>;
      '/tracks/:id': Object.Track;
    }
  }

  export namespace Request {
    export type Paths = BodyParams.Paths | QueryParams.Paths;

    export namespace BodyParams {
      export type Lookup<
        THttpMethod extends HTTPMethod,
        Path extends Request.Paths
      > = THttpMethod extends 'PUT'
        ? Prop<PUT, Path>
        : THttpMethod extends 'POST'
        ? Prop<POST, Path>
        : THttpMethod extends 'DELETE'
        ? Prop<DELETE, Path>
        : never;

      export type Paths = keyof POST | keyof PUT | keyof DELETE;

      export interface DELETE {
        '/me/albums': {
          ids?: string[];
        };
        '/me/episodes': {
          ids?: string[];
        };
        '/me/tracks': {
          ids?: string[];
        };
        '/playlists/:id/tracks': {
          snapshot_id?: string;
          tracks: {
            uri: string;
          }[];
        };
      }

      export interface POST {
        '/playlists/:id/tracks': {
          uris?: string[];
          position?: number;
        };
      }

      export interface PUT {
        '/me/albums': {
          ids?: string[];
        };
        '/me/episodes': {
          ids?: string[];
        };
        '/me/player': {
          device_ids: string[];
          play?: boolean;
        };
        '/me/player/play': {
          context_uri?: string;
          uris?: string[];
          offset?: {
            position?: number;
            uri?: string;
          };
          position_ms?: number;
        };
      }
    }
    export namespace QueryParams {
      export type Lookup<
        THttpMethod extends HTTPMethod,
        Path extends Request.Paths
      > = THttpMethod extends 'DELETE'
        ? Prop<DELETE, Path>
        : THttpMethod extends 'GET'
        ? Prop<GET, Path>
        : THttpMethod extends 'POST'
        ? Prop<POST, Path>
        : THttpMethod extends 'PUT'
        ? Prop<PUT, Path>
        : never;

      export type Paths = keyof DELETE | keyof GET | keyof PUT | keyof POST;

      export interface DELETE {
        '/me/albums': {
          ids: string;
        };
        '/me/episodes': {
          ids: string;
        };
        '/me/shows': {
          ids: string;
          market?: string;
        };
        '/me/tracks': {
          ids: string;
        };
      }

      export interface GET {
        '/albums': {
          ids: string;
          market?: string;
        };
        '/albums/:id': {
          market?: string;
        };
        '/albums/:id/tracks': {
          limit?: number;
          offset?: number;
          market?: string;
        };
        '/artists': {
          ids: string;
        };
        '/artists/:id/albums': {
          limit?: number;
          offset?: number;
          include_groups?: string;
        };
        '/artists/:id/top-tracks': {
          market: string;
        };
        '/audio-features': {
          ids: string;
        };
        '/browse/featured-playlists': {
          limit?: number;
          offset?: number;
          timestamp?: string;
        };
        '/browse/new-releases': {
          country?: string;
          limit?: number;
          offset?: number;
        };
        '/episodes': {
          ids: string;
          market?: string;
        };
        '/recommendations': {
          seed_artists?: string;
          seed_genres?: string;
          seed_tracks?: string;
          limit?: number;
          max_acousticness?: number;
          max_danceability?: number;
          max_duration_ms?: number;
          max_energy?: number;
          max_instrumentalness?: number;
          max_key?: number;
          max_liveness?: number;
          max_loudness?: number;
          max_mode?: number;
          max_popularity?: number;
          max_speechiness?: number;
          max_tempo?: number;
          max_time_signature?: number;
          max_valence?: number;
          min_acousticness?: number;
          min_danceability?: number;
          min_duration_ms?: number;
          min_energy?: number;
          min_instrumentalness?: number;
          min_key?: number;
          min_liveness?: number;
          min_loudness?: number;
          min_mode?: number;
          min_popularity?: number;
          min_speechiness?: number;
          min_tempo?: number;
          min_time_signature?: number;
          min_valence?: number;
          target_acousticness?: number;
          target_danceability?: number;
          target_duration_ms?: number;
          target_energy?: number;
          target_instrumentalness?: number;
          target_key?: number;
          target_liveness?: number;
          target_loudness?: number;
          target_mode?: number;
          target_popularity?: number;
          target_speechiness?: number;
          target_tempo?: number;
          target_time_signature?: number;
          target_valence?: number;
        };
        '/me/albums': {
          limit?: number;
          offset?: number;
        };
        '/me/albums/contains': {
          ids: string;
        };
        '/me/episodes/contains': {
          ids: string;
        };
        '/me/following': {
          type: 'artist';
          after?: string;
          limit?: number;
        };
        '/me/shows/contains': {
          ids: string;
        };
        '/me/top/artists': {
          limit?: number;
          offset?: number;
          time_range?: 'long_term' | 'medium_term' | 'short_term';
        };
        '/me/top/tracks': {
          limit?: number;
          offset?: number;
          time_range?: 'long_term' | 'medium_term' | 'short_term';
        };
        '/me/tracks/contains': {
          ids: string;
        };
        '/me/player': {
          additional_types?: string;
        };
        '/me/player/currently-playing': {
          additional_types?: string;
        };
        '/me/player/recently-played': {
          after?: number;
          before?: number;
          limit?: number;
        };
        '/me/playlists': {
          limit?: number;
          offset?: number;
        };
        '/me/tracks': {
          limit?: number;
          offset?: number;
        };
        '/playlists/:id/tracks': {
          limit?: number;
          offset?: number;
        };
        '/playlists/:id': {
          additional_types?: string;
          fields?: string;
          market?: string;
        };
        '/search': {
          q: string;
          type: string;
          include_external?: 'audio';
          limit?: number;
          market?: string;
          offset?: number;
        };
        '/shows': {
          ids: string;
          market?: string;
        };
        '/shows/:id/episodes': {
          limit?: number;
          offset?: number;
        };
        '/tracks': {
          ids: string;
          market?: string;
        };
        '/tracks/:id': { market?: string };
      }

      export interface POST {
        '/me/player/next': {
          device_id?: string;
        };
        '/me/player/previous': {
          device_id?: string;
        };
        '/me/player/queue': {
          uri: string;
          device_id?: string;
        };
        '/playlists/:id/tracks': {
          position?: number;
          uris?: string[];
        };
      }

      export interface PUT {
        '/me/albums': {
          ids: string;
        };
        '/me/episodes': {
          ids: string;
        };
        '/me/player/pause': {
          device_id?: string;
        };
        '/me/player/play': {
          device_id?: string;
        };
        '/me/player/repeat': {
          state: Object.RepeatMode;
          device_id?: string;
        };
        '/me/player/seek': {
          position_ms: number;
          device_id?: string;
        };
        '/me/player/shuffle': {
          state: boolean;
          device_id?: string;
        };
        '/me/player/volume': {
          volume_percent: number;
          device_id?: string;
        };
        '/me/shows': {
          ids: string;
        };
        '/me/tracks': {
          ids: string;
        };
      }
    }
  }
}
