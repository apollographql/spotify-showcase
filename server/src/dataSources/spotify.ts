import { KeyValueCache } from '@apollo/utils.keyvaluecache';
import {
  RESTDataSource,
  WillSendRequestOptions,
} from '@apollo/datasource-rest';
import { Spotify } from './spotify.types';

type GetRequest = NonNullable<Parameters<RESTDataSource['get']>[1]>;
type RawQueryParams = Record<
  string,
  string | string[] | number | null | undefined
>;

interface GetRequestOptions extends Omit<GetRequest, 'params'> {
  params?: RawQueryParams;
}

export default class SpotifyAPI extends RESTDataSource {
  override baseURL = 'https://api.spotify.com/v1';
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  getAlbum(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id']
  ) {
    return this._get<Spotify.Response.GET['/albums/:id']>(`/albums/${id}`, {
      params,
    });
  }

  getAlbumTracks(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id/tracks']
  ) {
    return this._get<Spotify.Response.GET['/albums/:id/tracks']>(
      `/albums/${id}/tracks`,
      { params }
    );
  }

  getArtist(id: string) {
    return this.get<Spotify.Response.GET['/artists/:id']>(`/artists/${id}`);
  }

  getArtists(params: Spotify.Request.QueryParams.GET['/artists']) {
    return this._get<Spotify.Response.GET['/artists']>('/artists', { params });
  }

  getArtistAlbums(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/artists/:id/albums']
  ) {
    return this._get<Spotify.Response.GET['/artists/:id/albums']>(
      `/artists/${id}/albums`,
      { params }
    );
  }

  getArtistRelatedArtists(artistId: string) {
    return this._get<Spotify.Response.GET['/artists/:id/related-artists']>(
      `/artists/${artistId}/related-artists`
    );
  }

  getArtistTopTracks(
    artistId: string,
    params: Spotify.Request.QueryParams.GET['/artists/:id/top-tracks']
  ) {
    return this._get<Spotify.Response.GET['/artists/:id/top-tracks']>(
      `/artists/${artistId}/top-tracks`,
      { params }
    );
  }

  async getCurrentlyPlaying(
    params?: Spotify.Request.QueryParams.GET['/me/player/currently-playing']
  ) {
    const data = await this._get<
      Spotify.Response.GET['/me/player/currently-playing'] | ''
    >('/me/player/currently-playing', { params });

    if (data === '') {
      return null;
    }

    return data;
  }

  getDevices() {
    return this._get<Spotify.Response.GET['/me/player/devices']>(
      '/me/player/devices'
    );
  }

  getGenres() {
    return this._get<
      Spotify.Response.GET['/recommendations/available-genre-seeds']
    >('/recommendations/available-genre-seeds');
  }

  getEpisode(id: string) {
    return this._get<Spotify.Response.GET['/episodes/:id']>(`/episodes/${id}`);
  }

  getEpisodes(ids: string[]) {
    if (ids.length === 0) {
      return { episodes: [] };
    }

    return this._get<Spotify.Response.GET['/episodes']>('/episodes', {
      params: { ids: ids.join(',') },
    });
  }

  getRecommendations(
    params: Spotify.Request.QueryParams.GET['/recommendations']
  ) {
    return this._get<Spotify.Response.GET['/recommendations']>(
      'recommendations',
      { params }
    );
  }

  getCurrentUser() {
    return this._get<Spotify.Response.GET['/me']>('me');
  }

  getCurrentUserPlaylists(
    params: Spotify.Request.QueryParams.GET['/me/playlists']
  ) {
    return this._get<Spotify.Response.GET['/me/playlists']>('/me/playlists', {
      params,
    });
  }

  getCurrentUserTracks(params?: Spotify.Request.QueryParams.GET['/me/tracks']) {
    return this._get<Spotify.Response.GET['/me/tracks']>('/me/tracks', {
      params,
    });
  }

  getFeaturedPlaylists(
    params: Spotify.Request.QueryParams.GET['/browse/featured-playlists']
  ) {
    return this._get<Spotify.Response.GET['/browse/featured-playlists']>(
      '/browse/featured-playlists',
      { params }
    );
  }

  async getPlaybackState(
    params?: Spotify.Request.QueryParams.GET['/me/player']
  ) {
    const playbackState = await this._get<
      Spotify.Response.GET['/me/player'] | ''
    >('/me/player', { params });

    if (playbackState === '') {
      return null;
    }

    return playbackState;
  }

  getPlaybackQueue() {
    return this._get<Spotify.Response.GET['/me/player/queue']>(
      '/me/player/queue'
    );
  }

  getPlaylist(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/playlists/:id']
  ) {
    return this._get<Spotify.Response.GET['/playlists/:id']>(
      `/playlists/${id}`,
      { params }
    );
  }

  getPlaylistTracks(
    id: string,
    params: Spotify.Request.QueryParams.GET['/playlists/:id/tracks']
  ) {
    return this._get<Spotify.Response.GET['/playlists/:id/tracks']>(
      `/playlists/${id}/tracks`,
      { params }
    );
  }

  getRecentlyPlayed(
    params?: Spotify.Request.QueryParams.GET['/me/player/recently-played']
  ) {
    return this._get<Spotify.Response.GET['/me/player/recently-played']>(
      '/me/player/recently-played',
      { params }
    );
  }

  getShow(id: string) {
    return this._get<Spotify.Response.GET['/shows/:id']>(`/shows/${id}`);
  }

  getShowEpisodes(
    showId: string,
    params: Spotify.Request.QueryParams.GET['/shows/:id/episodes']
  ) {
    return this._get<Spotify.Response.GET['/shows/:id/episodes']>(
      `/shows/${showId}/episodes`,
      { params }
    );
  }

  getTrack(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/tracks/:id']
  ) {
    return this._get<Spotify.Response.GET['/tracks/:id']>(`/tracks/${id}`, {
      params,
    });
  }

  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['Accept'] = 'application/json';
    request.headers['Authorization'] = `Bearer ${this.token}`;
    request.headers['Content-Type'] = 'application/json';
  }

  override cacheKeyFor(url: URL) {
    if (url.pathname === '/v1/me/player') {
      return this.generateRandomKey(10);
    }

    return url.toString();
  }

  private generateRandomKey(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVYWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  private _get<TReturn>(path: string, options?: GetRequestOptions) {
    return this.get<TReturn>(path, {
      ...options,
      params: this.normalizeParams(options?.params),
    });
  }

  private normalizeParams(params: RawQueryParams | undefined) {
    if (!params) {
      return;
    }

    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        urlParams.set(key, String(value));
      }
    }

    return urlParams;
  }
}
