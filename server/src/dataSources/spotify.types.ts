import { OAUTH_SCOPES } from '../constants';

type Scope = typeof OAUTH_SCOPES[number];

type RestrictScope<T, TScope extends string> = TScope extends Scope ? T : never;

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

    export interface ExternalUrl {
      spotify: string;
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

    export interface User {
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
      images: {
        url: string;
        height: number | null;
        weight: number | null;
      }[];
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

      '/me': Spotify.Object.User | null;

      '/recommendations': {
        seeds: Spotify.Object.RecommendationSeed[];
        tracks: Spotify.Object.TrackSimplified[];
      };

      '/recommendations/available-genre-seeds': {
        genres: string[];
      };
    }
  }

  export namespace Request {
    export interface Params {
      '/recommendations': {
        seed_genres?: string[];
      };
    }
  }
}
