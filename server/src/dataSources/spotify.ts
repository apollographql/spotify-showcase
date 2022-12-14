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

  async getGenres() {
    return this.get<
      Spotify.Response.Path['/recommendations/available-genre-seeds']
    >('/recommendations/available-genre-seeds');
  }

  getRecommendations(params: Spotify.Request.Params['/recommendations']) {
    return this.get<Spotify.Response.Path['/recommendations']>(
      'recommendations',
      { params: this.normalizeParams(params) }
    );
  }

  me() {
    return this.get<Spotify.Response.Path['/me']>('me');
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
