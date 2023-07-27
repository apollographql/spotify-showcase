import { ApolloServerErrorCode } from '@apollo/server/errors';
import { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { FetcherResponse } from '@apollo/utils.fetcher';
import {
  RESTDataSource,
  GetRequest,
  PostRequest,
  PutRequest,
  AugmentedRequest,
  RequestOptions,
} from '@apollo/datasource-rest';
import { OmitNever } from '../types/OmitNever';
import { Spotify, SpotifyDataSource } from 'spotify-api';
import path from 'path';
import { GraphQLError } from 'graphql';

type RawQueryParams = Record<
  string,
  string | string[] | number | boolean | null | undefined
>;

interface GetRequestOptions extends Omit<GetRequest, 'params'> {
  params?: RawQueryParams;
}

interface PutRequestOptions extends Omit<PutRequest, 'params'> {
  params?: RawQueryParams;
}

interface PostRequestOptions extends Omit<PostRequest, 'params'> {
  params?: RawQueryParams;
}

type RequestParams<
  HTTPMethod extends Spotify.HTTPMethod,
  Path extends Spotify.Request.Paths,
> = OmitNever<{
  body: Spotify.Request.BodyParams.Lookup<HTTPMethod, Path>;
  params: Spotify.Request.QueryParams.Lookup<HTTPMethod, Path>;
}>;

export default class SpotifyAPI
  extends RESTDataSource
  implements SpotifyDataSource
{
  override baseURL = 'https://api.spotify.com';
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  getDevices() {
    return this._get<Spotify.Response.GET['/me/player/devices']>(
      '/me/player/devices'
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

  async resumePlayback({
    body,
    params,
  }: RequestParams<'PUT', '/me/player/play'>) {
    await this._put('/me/player/play', { body, params });

    return true;
  }

  async pausePlayback({ params }: RequestParams<'PUT', '/me/player/pause'>) {
    await this._put('/me/player/pause', { params });

    return true;
  }

  async seekToPosition({ params }: RequestParams<'PUT', '/me/player/seek'>) {
    await this._put('/me/player/seek', { params });

    return true;
  }

  async setRepeatMode({ params }: RequestParams<'PUT', '/me/player/repeat'>) {
    await this._put('/me/player/repeat', { params });

    return true;
  }

  async setVolume({ params }: RequestParams<'PUT', '/me/player/volume'>) {
    await this._put('/me/player/volume', { params });

    return true;
  }

  async shufflePlayback({
    params,
  }: RequestParams<'PUT', '/me/player/shuffle'>) {
    await this._put('/me/player/shuffle', { params });

    return true;
  }

  async skipToNext({ params }: RequestParams<'POST', '/me/player/next'>) {
    await this._post('/me/player/next', { params });

    return true;
  }

  async skipToPrevious({
    params,
  }: RequestParams<'POST', '/me/player/previous'>) {
    await this._post('/me/player/previous', { params });

    return true;
  }

  async transferPlayback({ body }: RequestParams<'PUT', '/me/player'>) {
    await this._put('/me/player', { body });

    return true;
  }

  override resolveURL(urlPath: string) {
    return new URL(path.join('/v1/', urlPath), this.baseURL);
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
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

  override async errorFromResponse({
    response,
    parsedBody,
  }: {
    url: URL;
    request: RequestOptions;
    response: FetcherResponse;
    parsedBody: Spotify.Error.RegularError;
  }) {
    const error =
      typeof parsedBody === 'string' ? parsedBody : parsedBody.error;

    return new GraphQLError(typeof error === 'string' ? error : error.message, {
      extensions: {
        code: this.getCodeFromStatus(response),
        reason: error.reason,
      },
    });
  }

  private getCodeFromStatus(response: FetcherResponse) {
    switch (response.status) {
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 400:
        return ApolloServerErrorCode.BAD_USER_INPUT;
      default:
        return ApolloServerErrorCode.INTERNAL_SERVER_ERROR;
    }
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

  private _put<TReturn>(path: string, options?: PutRequestOptions) {
    return this.put<TReturn>(path, {
      ...options,
      params: this.normalizeParams(options?.params),
    });
  }

  private _post<TReturn>(path: string, options?: PostRequestOptions) {
    return this.post<TReturn>(path, {
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
