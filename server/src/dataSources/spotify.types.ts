import { OAUTH_SCOPES } from '../constants';
import { NullifyOptionalProperties } from '../utils';

type RestrictScope<
  T,
  TScope extends string
> = TScope extends typeof OAUTH_SCOPES[number] ? T : never;

type InputParams<T extends object> = NullifyOptionalProperties<T>;

export namespace Spotify {
  export namespace Object {
    export interface Album {
      album_type: 'album' | 'single' | 'compilation';
      artists: Artist[];
      available_markets: string[];
      external_urls: ExternalUrls;
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: 'year' | 'month' | 'day';
      restrictions: Restrictions;
      total_tracks: number;
      type: 'album';
      tracks: Paginated<AlbumTrack>;
      uri: string;
    }

    export interface AlbumTrack {
      id: string;
      // TODO: Determine what other fields are present since this is not in the
      // documentation
    }

    export interface Artist {
      external_urls: ExternalUrls;
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

    export interface ArtistSimplified {
      external_urls: ExternalUrls;
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

    export type PlaylistItem = PlaylistTrack | PlaylistEpisode;

    export interface PlaylistEpisode {
      album: PlaylistEpisodeAlbum;
      artist: PlaylistEpisodeArtist[];
      available_markets: string;
      disc_number: number;
      duration_ms: number;
      episode: boolean;
      explicit: boolean;
      external_ids: {
        spotify: string;
      };
      external_urls: ExternalUrls;
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

    export interface PlaylistEpisodeAlbum {
      album_type: 'album' | 'single' | 'compilation';
      artists: PlaylistEpisodeArtist[];
      available_markets: string[];
      external_urls: ExternalUrls;
      href: string;
      id: string;
      images: Image[];
      is_playable: boolean;
      name: string;
      release_date: string | null;
      release_date_precision: 'year' | 'month' | 'day' | null;
      restrictions: Restrictions;
      total_tracks: number;
      type: 'show';
      uri: string;
    }

    export interface PlaylistEpisodeArtist {
      external_urls: ExternalUrls;
      href: string;
      id: string;
      name: string;
      type: 'show';
      uri: string;
    }

    export interface PlaylistTrack {
      album: PlaylistTrackAlbum;
      artists: ArtistSimplified[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      episode: boolean;
      explicit: boolean;
      external_ids: {
        isrc: string | null;
        ean: string | null;
        upc: string | null;
      };
      external_urls: ExternalUrls;
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      popularity: number;
      preview_url: string;
      track: boolean;
      track_number: boolean;
      type: 'track';
      uri: string;
    }

    export interface PlaylistTrackAlbum {
      album_type: 'album' | 'single' | 'compilation';
      artists: ArtistSimplified[];
      available_markets: string[];
      external_urls: ExternalUrls;
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: 'year' | 'month' | 'day';
      total_tracks: number;
      type: 'album';
      uri: string;
    }

    export interface PlaylistTrackEdge {
      added_at: string;
      added_by: User;
      is_local: boolean;
      primary_color: string | null;
      track: PlaylistItem;
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

    export interface Restrictions {
      reason: 'market' | 'product' | 'explicit';
    }

    export interface Track {
      album: TrackAlbum;
      artists: ArtistSimplified[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: {
        isrc: string | null;
        ean: string | null;
        upc: string | null;
      };
      external_urls: ExternalUrls;
      href: string;
      id: string;
      is_local: boolean;
      is_playable: boolean;
      linked_from: Track | null;
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      restrictions: Restrictions;
      type: 'track';
      uri: string;
    }

    export interface TrackAlbum {
      id: string;
      album_type: 'album' | 'single' | 'compilation';
      album_group: 'album' | 'single' | 'compilation' | 'appears_on';
      artists: ArtistSimplified[];
      available_markets: string[];
      external_urls: ExternalUrls;
      href: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: 'year' | 'month' | 'day';
      restrictions: Restrictions;
      total_tracks: number;
      type: 'album';
      uri: string;
    }

    export interface TrackSimplified {
      artists: ArtistSimplified[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrls;
      href: string;
      id: string;
      is_local: boolean;
      is_playable: boolean;
      linked_from: TrackSimplifiedLinkedFrom;
      restrictions: Restrictions;
      name: string;
      preview_url: string;
      track_number: string;
      type: string;
      uri: string;
    }

    export interface TrackSimplifiedLinkedFrom {
      external_urls: ExternalUrls;
      href: string;
      id: string;
      type: 'track';
      uri: string;
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
