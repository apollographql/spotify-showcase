import { OAUTH_SCOPES } from '../constants';
import { NullifyOptionalProperties } from '../utils';

type RestrictScope<
  T,
  TScope extends string
> = TScope extends typeof OAUTH_SCOPES[number] ? T : never;

type InputParams<T extends object> = NullifyOptionalProperties<T>;

export namespace Spotify {
  export namespace Object {
    interface ArtistSimplfied {
      external_urls: ExternalUrls;
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }

    export interface AlbumSimplified {
      album_type: 'album' | 'single' | 'compilation';
      artists: ArtistSimplfied[];
    }

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
      external_urls: ExternalUrls;
      followers: Followers;
      href: string;
      id: string;
      images: Image[];
      product: RestrictScope<string, 'user-read-private'>;
      type: 'user';
      uri: string;
    }

    export interface Episode {
      id: string;
      type: 'episode';
    }

    export interface ExternalUrls {
      spotify: string;
    }

    export interface Followers {
      href: string | null;
      total: number;
    }

    export interface Image {
      url: string;
      height: number | null;
      weight: number | null;
    }

    export interface Paginated<T = any> {
      items: T[];
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    }

    export type PaginatedPlaylists = Paginated<Playlist>;
    export type PaginatedPlaylistTracks = Paginated<PlaylistTrackEdge>;

    export interface Playlist {
      id: string;
      collaborative: boolean;
      description: string | null;
      external_urls: ExternalUrls;
      href: string;
      images: Image[];
      name: string;
      owner: User;
      public: boolean | null;
      snapshot_id: string;
      tracks: PaginatedPlaylistTracks;
      type: 'playlist';
      uri: string;
    }

    export type PlaylistTrack = TrackSimplified | Episode;

    export interface PlaylistTrackEdge {
      added_at: string;
      added_by: User;
      is_local: boolean;
      primary_color: string | null;
      track: PlaylistTrack;
      video_thumbnail: {
        url: string | null;
      };
    }

    export interface Recommendations {
      seeds: RecommendationSeed[];
      tracks: TrackSimplified[];
    }

    export interface RecommendationSeed {
      afterFilteringSize: number;
      afterRelinkingSize: number;
      href: string;
      id: string;
      initialPoolSize: number;
      type: 'ARTIST' | 'TRACK' | 'GENRE';
    }

    export interface Track {
      id: string;
      album: AlbumSimplified;
      artists: ArtistSimplfied[];
      type: 'track';
    }

    export interface TrackSimplified {
      album: AlbumSimplified | null;
      artists: ArtistSimplfied[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrls;
      href: string;
      id: string;
      is_playable: boolean;
      restrictions: {
        reason: 'market' | 'product' | 'explicit';
      };
      name: string;
      preview_url: string;
      track_number: string;
      type: 'track';
      uri: string;
      is_local: boolean;
    }

    export interface User {
      display_name: string | null;
      external_urls: ExternalUrls;
      followers: Followers;
      href: string;
      id: string;
      images: Image[] | null;
      type: 'user';
      uri: string;
    }
  }

  export namespace Response {
    export interface Path {
      '/authorize':
        | { code: string; state?: string }
        | { error: string; state?: string };

      '/api/token': {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
        token_type: 'Bearer';
      };

      '/me': Spotify.Object.CurrentUser;
      '/me/playlists': Spotify.Object.PaginatedPlaylists;

      '/playlists/:id': Spotify.Object.Playlist;

      '/recommendations': Spotify.Object.Recommendations;

      '/recommendations/available-genre-seeds': {
        genres: string[];
      };
    }
  }

  export namespace Request {
    export interface Params {
      '/recommendations': InputParams<{
        seed_artists?: string;
        seed_genres?: string;
        seed_tracks?: string;
        limit?: number;
      }>;
      '/me/playlists': InputParams<{
        limit?: number;
        offset?: number;
      }>;
    }
  }
}
