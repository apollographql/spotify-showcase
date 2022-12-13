declare namespace Spotify {
  namespace Object {
    interface Artist {
      external_urls: ExternalUrl[];
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }

    interface ExternalUrl {
      spotify: string;
    }

    interface RecommendationSeed {
      afterFilteringSize: number;
      afterRelinkingSize: number;
      href: string;
      id: string;
      initialPoolSize: number;
      type: 'artist' | 'track' | 'genre';
    }

    interface TrackSimplified {
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

      '/recommendations': {
        seeds: Spotify.Object.RecommendationSeed[];
        tracks: Spotify.Object.TrackSimplified[];
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
