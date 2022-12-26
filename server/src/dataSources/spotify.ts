import { KeyValueCache } from '@apollo/utils.keyvaluecache';
import {
  RESTDataSource,
  WillSendRequestOptions,
} from '@apollo/datasource-rest';
import { Spotify } from './spotify.types';

export default class SpotifyAPI extends RESTDataSource {
  override baseURL = 'https://api.spotify.com/v1';
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  album(id: string, params?: Spotify.Request.Params['/albums/:id']) {
    return this.get<Spotify.Response.Path['/albums/:id']>(`/albums/${id}`, {
      params: this.normalizeParams(params),
    });
  }

  albumTracks(
    id: string,
    params?: Spotify.Request.Params['/albums/:id/tracks']
  ) {
    return this.get<Spotify.Response.Path['/albums/:id/tracks']>(
      `/albums/${id}/tracks`,
      { params: this.normalizeParams(params) }
    );
  }

  artist(id: string) {
    return this.get<Spotify.Response.Path['/artists/:id']>(`/artists/${id}`);
  }

  artistAlbums(
    id: string,
    params?: Spotify.Request.Params['/artists/:id/albums']
  ) {
    return this.get<Spotify.Response.Path['/artists/:id/albums']>(
      `/artists/${id}/albums`,
      { params: this.normalizeParams(params) }
    );
  }

  artistRelatedArtists(artistId: string) {
    return this.get<Spotify.Response.Path['/artists/:id/related-artists']>(
      `/artists/${artistId}/related-artists`
    );
  }

  artistTopTracks(
    artistId: string,
    params: Spotify.Request.Params['/artists/:id/top-tracks']
  ) {
    return this.get<Spotify.Response.Path['/artists/:id/top-tracks']>(
      `/artists/${artistId}/top-tracks`,
      { params: this.normalizeParams(params) }
    );
  }

  async genres() {
    return this.get<
      Spotify.Response.Path['/recommendations/available-genre-seeds']
    >('/recommendations/available-genre-seeds');
  }

  async episode(id: string) {
    return this.get<Spotify.Response.Path['/episodes/:id']>(`/episodes/${id}`);
  }

  async episodes(ids: string[]) {
    if (ids.length === 0) {
      return { episodes: [] };
    }

    return this.get<Spotify.Response.Path['/episodes']>('/episodes', {
      params: { ids: ids.join(',') },
    });
  }

  recommendations(params: Spotify.Request.Params['/recommendations']) {
    return this.get<Spotify.Response.Path['/recommendations']>(
      'recommendations',
      { params: this.normalizeParams(params) }
    );
  }

  currentUser() {
    return this.get<Spotify.Response.Path['/me']>('me');
  }

  currentUserPlaylists(params: Spotify.Request.Params['/me/playlists']) {
    return this.get<Spotify.Response.Path['/me/playlists']>('/me/playlists', {
      params: this.normalizeParams(params),
    });
  }

  currentUserTracks(params?: Spotify.Request.Params['/me/tracks']) {
    return this.get<Spotify.Response.Path['/me/tracks']>('/me/tracks', {
      params: this.normalizeParams(params),
    });
  }

  featuredPlaylists(
    params: Spotify.Request.Params['/browse/featured-playlists']
  ) {
    return this.get<Spotify.Response.Path['/browse/featured-playlists']>(
      '/browse/featured-playlists',
      { params: this.normalizeParams(params) }
    );
  }

  playlist(id: string, params?: Spotify.Request.Params['/playlists/:id']) {
    return this.get<Spotify.Response.Path['/playlists/:id']>(
      `/playlists/${id}`,
      { params: this.normalizeParams(params) }
    );
  }

  playlistTracks(
    id: string,
    params: Spotify.Request.Params['/playlists/:id/tracks']
  ) {
    return this.get<Spotify.Response.Path['/playlists/:id/tracks']>(
      `/playlists/${id}/tracks`,
      { params: this.normalizeParams(params) }
    );
  }

  track(id: string, params?: Spotify.Request.Params['/tracks/:id']) {
    return this.get<Spotify.Response.Path['/tracks/:id']>(`/tracks/${id}`, {
      params: this.normalizeParams(params),
    });
  }

  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['Accept'] = 'application/json';
    request.headers['Authorization'] = `Bearer ${this.token}`;
    request.headers['Content-Type'] = 'application/json';
  }

  private normalizeParams(
    params: Record<string, string | number | null | undefined> | undefined
  ) {
    if (!params) {
      return;
    }

    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value != null) {
        urlParams.set(key, String(value));
      }
    }

    return urlParams;
  }
}
