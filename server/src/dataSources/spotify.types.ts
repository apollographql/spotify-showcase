import { OAUTH_SCOPES } from '../constants';
import { NullifyOptionalProperties } from '../utils';

type RestrictScope<
  T,
  TScope extends string
> = TScope extends typeof OAUTH_SCOPES[number] ? T : never;

type InputParams<T> = NullifyOptionalProperties<T>;

export namespace Spotify {
  export namespace Object {
    interface Artist {
      external_urls: ExternalUrl[];
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
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
      external_urls: ExternalUrl;
      followers: {
        href: string | null;
        total: number;
      };
      href: string;
      id: string;
      images: Image[];
      product: RestrictScope<string, 'user-read-private'>;
      type: 'user';
      uri: string;
    }

    export interface ExternalUrl {
      spotify: string;
    }

    export interface Image {
      url: string;
      height: number | null;
      weight: number | null;
    }

    export interface Recommendations {
      seeds: Spotify.Object.RecommendationSeed[];
      tracks: Spotify.Object.TrackSimplified[];
    }

    export interface RecommendationSeed {
      afterFilteringSize: number;
      afterRelinkingSize: number;
      href: string;
      id: string;
      initialPoolSize: number;
      type: 'ARTIST' | 'TRACK' | 'GENRE';
    }

    export interface TrackSimplified {
      artists: Artist[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrl[];
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

    export interface PagedPlaylists {
      items: Playlist[];
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    }

    export interface Playlist {
      id: string;
      collaborative: boolean;
      description: string | null;
      external_urls: ExternalUrl;
      href: string;
      images: Image[];
      name: string;
      owner: User;
      public: boolean | null;
      snapshot_id: string;
      tracks: ({ href: string; total: number } | null)[];
      type: 'playlist';
      uri: string;
    }

    export interface User {
      display_name: string | null;
      external_urls: ExternalUrl;
      followers: {
        href: string | null;
        total: number;
      };
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
      '/me/playlists': Spotify.Object.PagedPlaylists;
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
