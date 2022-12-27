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

  getAlbum(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id']
  ) {
    return this.get<Spotify.Response.Path['/albums/:id']>(`/albums/${id}`, {
      params: this.normalizeParams(params),
    });
  }

  getAlbumTracks(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id/tracks']
  ) {
    return this.get<Spotify.Response.Path['/albums/:id/tracks']>(
      `/albums/${id}/tracks`,
      { params: this.normalizeParams(params) }
    );
  }

  getArtist(id: string) {
    return this.get<Spotify.Response.Path['/artists/:id']>(`/artists/${id}`);
  }

  getArtists(ids: string[]) {
    return this.get<Spotify.Response.Path['/artists']>('/artists', {
      params: { ids: ids.join(',') },
    });
  }

  getArtistAlbums(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/artists/:id/albums']
  ) {
    return this.get<Spotify.Response.Path['/artists/:id/albums']>(
      `/artists/${id}/albums`,
      { params: this.normalizeParams(params) }
    );
  }

  getArtistRelatedArtists(artistId: string) {
    return this.get<Spotify.Response.Path['/artists/:id/related-artists']>(
      `/artists/${artistId}/related-artists`
    );
  }

  getArtistTopTracks(
    artistId: string,
    params: Spotify.Request.QueryParams.GET['/artists/:id/top-tracks']
  ) {
    return this.get<Spotify.Response.Path['/artists/:id/top-tracks']>(
      `/artists/${artistId}/top-tracks`,
      { params: this.normalizeParams(params) }
    );
  }

  getGenres() {
    return this.get<
      Spotify.Response.Path['/recommendations/available-genre-seeds']
    >('/recommendations/available-genre-seeds');
  }

  getEpisode(id: string) {
    return this.get<Spotify.Response.Path['/episodes/:id']>(`/episodes/${id}`);
  }

  getEpisodes(ids: string[]) {
    if (ids.length === 0) {
      return { episodes: [] };
    }

    return this.get<Spotify.Response.Path['/episodes']>('/episodes', {
      params: { ids: ids.join(',') },
    });
  }

  getRecommendations(
    params: Spotify.Request.QueryParams.GET['/recommendations']
  ) {
    return this.get<Spotify.Response.Path['/recommendations']>(
      'recommendations',
      { params: this.normalizeParams(params) }
    );
  }

  getCurrentUser() {
    return this.get<Spotify.Response.Path['/me']>('me');
  }

  getCurrentUserPlaylists(
    params: Spotify.Request.QueryParams.GET['/me/playlists']
  ) {
    return this.get<Spotify.Response.Path['/me/playlists']>('/me/playlists', {
      params: this.normalizeParams(params),
    });
  }

  getCurrentUserTracks(params?: Spotify.Request.QueryParams.GET['/me/tracks']) {
    return this.get<Spotify.Response.Path['/me/tracks']>('/me/tracks', {
      params: this.normalizeParams(params),
    });
  }

  getFeaturedPlaylists(
    params: Spotify.Request.QueryParams.GET['/browse/featured-playlists']
  ) {
    return this.get<Spotify.Response.Path['/browse/featured-playlists']>(
      '/browse/featured-playlists',
      { params: this.normalizeParams(params) }
    );
  }

  getPlaylist(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/playlists/:id']
  ) {
    return this.get<Spotify.Response.Path['/playlists/:id']>(
      `/playlists/${id}`,
      { params: this.normalizeParams(params) }
    );
  }

  getPlaylistTracks(
    id: string,
    params: Spotify.Request.QueryParams.GET['/playlists/:id/tracks']
  ) {
    return this.get<Spotify.Response.Path['/playlists/:id/tracks']>(
      `/playlists/${id}/tracks`,
      { params: this.normalizeParams(params) }
    );
  }

  getTrack(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/tracks/:id']
  ) {
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
