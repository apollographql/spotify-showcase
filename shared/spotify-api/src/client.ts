import { ApolloServerErrorCode } from '@apollo/server/errors';
import { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { FetcherResponse } from '@apollo/utils.fetcher';
import {
  RESTDataSource,
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
  AugmentedRequest,
  RequestOptions,
} from '@apollo/datasource-rest';
import { Spotify, SpotifyDataSource } from 'spotify-api';
import path from 'path';
import { GraphQLError } from 'graphql';
import { ConditionalKeys } from 'type-fest';
import DataLoader from 'dataloader';

export type OmitNever<T> = Omit<T, ConditionalKeys<T, never>>;

type RawQueryParams = Record<
  string,
  string | string[] | number | boolean | null | undefined
>;

interface DeleteRequestOptions extends Omit<DeleteRequest, 'params'> {
  params?: RawQueryParams;
}

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

export class SpotifyClient extends RESTDataSource implements SpotifyDataSource {
  override baseURL = 'https://api.spotify.com';
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  addItemsToPlaylist(
    playlistId: string,
    { params, body }: RequestParams<'POST', '/playlists/:id/tracks'>
  ) {
    return this._post<Spotify.Response.POST['/playlists/:id/tracks']>(
      `/playlists/${playlistId}/tracks`,
      { body, params }
    );
  }

  async addItemToPlaybackQueue({
    params,
  }: RequestParams<'POST', '/me/player/queue'>) {
    await this._post('/me/player/queue', { params });

    return true;
  }

  async follow({ body, params }: RequestParams<'PUT', '/me/following'>) {
    await this._put('/me/following', { body, params });

    return true;
  }

  async followPlaylist(
    playlistId: string,
    { body }: RequestParams<'PUT', '/playlists/:id/followers'>
  ) {
    await this._put(`/playlists/${playlistId}/followers`, { body });

    return true;
  }

  getAlbum(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id']
  ) {
    return this._get<Spotify.Response.GET['/albums/:id']>(`/albums/${id}`, {
      params,
    });
  }

  getAlbums(params: Spotify.Request.QueryParams.GET['/albums']) {
    return this._get<Spotify.Response.GET['/albums']>('/albums', { params });
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

  checkContainsAlbums(ids: string) {
    return this._get<Spotify.Response.GET['/me/albums/contains']>(
      '/me/albums/contains',
      { params: { ids } }
    );
  }

  checkContainsEpisodes(ids: string) {
    return this._get<Spotify.Response.GET['/me/episodes/contains']>(
      '/me/episodes/contains',
      { params: { ids } }
    );
  }

  checkContainsShows(ids: string) {
    return this._get<Spotify.Response.GET['/me/shows/contains']>(
      '/me/shows/contains',
      { params: { ids } }
    );
  }

  checkContainsTracks(ids: string) {
    return this._get<Spotify.Response.GET['/me/tracks/contains']>(
      '/me/tracks/contains',
      { params: { ids } }
    );
  }

  checkFollowing(
    params: Spotify.Request.QueryParams.GET['/me/following/contains']
  ) {
    return this._get<Spotify.Response.GET['/me/following/contains']>(
      '/me/following/contains',
      { params }
    );
  }

  checkUsersFollowingPlaylist(
    playlistId: string,
    params: Spotify.Request.QueryParams.GET['/playlists/:id/followers/contains']
  ) {
    return this._get<Spotify.Response.GET['/playlists/:id/followers/contains']>(
      `/playlists/${playlistId}/followers/contains`,
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

  getEpisodes(params: Spotify.Request.QueryParams.GET['/episodes']) {
    return this._get<Spotify.Response.GET['/episodes']>('/episodes', {
      params,
    });
  }

  getFollowed(params: Spotify.Request.QueryParams.GET['/me/following']) {
    return this._get<Spotify.Response.GET['/me/following']>('/me/following', {
      params,
    });
  }

  getShows(params: Spotify.Request.QueryParams.GET['/shows']) {
    return this._get<Spotify.Response.GET['/shows']>('/shows', {
      params,
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

  async getCurrentUser() {
    return await this._get<Spotify.Response.GET['/me']>('me');
  }

  getCurrentUserAlbums(params: Spotify.Request.QueryParams.GET['/me/albums']) {
    return this._get<Spotify.Response.GET['/me/albums']>('/me/albums', {
      params,
    });
  }

  getCurrentUserEpisodes(
    params: Spotify.Request.QueryParams.GET['/me/episodes']
  ) {
    return this._get<Spotify.Response.GET['/me/episodes']>('/me/episodes', {
      params,
    });
  }

  getCurrentUserPlaylists(
    params: Spotify.Request.QueryParams.GET['/me/playlists']
  ) {
    return this._get<Spotify.Response.GET['/me/playlists']>('/me/playlists', {
      params,
    });
  }

  getCurrentUserTopArtists(
    params: Spotify.Request.QueryParams.GET['/me/top/artists']
  ) {
    return this._get<Spotify.Response.GET['/me/top/artists']>(
      '/me/top/artists',
      { params }
    );
  }

  getCurrentUserTopTracks(
    params: Spotify.Request.QueryParams.GET['/me/top/tracks']
  ) {
    return this._get<Spotify.Response.GET['/me/top/tracks']>('/me/top/tracks', {
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

  getNewReleases(
    params: Spotify.Request.QueryParams.GET['/browse/new-releases']
  ) {
    return this._get<Spotify.Response.GET['/browse/new-releases']>(
      '/browse/new-releases',
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

  getSavedShows(params?: Spotify.Request.QueryParams.GET['/me/shows']) {
    return this._get<Spotify.Response.GET['/me/shows']>('/me/shows', {
      params,
    });
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

  private trackLoader = new DataLoader(async (ids) => {
    const trackList = await this.getTracks({ ids: ids.join(',') });
    return ids.map((id) => trackList.tracks.find((track) => track.id === id));
  });

  async getTrack(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/tracks/:id']
  ) {
    return this.trackLoader.load(id);
  }

  getTrackAudioFeatures(trackId: string) {
    return this._get<Spotify.Response.GET['/audio-features/:id']>(
      `/audio-features/${trackId}`
    );
  }

  getTracks(params: Spotify.Request.QueryParams.GET['/tracks']) {
    return this._get<Spotify.Response.GET['/tracks']>('/tracks', { params });
  }

  getTracksAudioFeatures(
    params: Spotify.Request.QueryParams.GET['/audio-features']
  ) {
    return this._get<Spotify.Response.GET['/audio-features']>(
      '/audio-features',
      { params }
    );
  }

  getUser(userId: string) {
    return this._get<Spotify.Response.GET['/users/:id']>(`/useres/${userId}`);
  }

  removeItemFromPlaylist(
    playlistId: string,
    { body }: RequestParams<'DELETE', '/playlists/:id/tracks'>
  ) {
    return this._delete<Spotify.Response.DELETE['/playlists/:id/tracks']>(
      `/playlists/${playlistId}/tracks`,
      { body }
    );
  }

  async removeSavedAlbums({
    body,
    params,
  }: RequestParams<'DELETE', '/me/albums'>) {
    await this._delete('/me/albums', { body, params });

    return true;
  }

  async removeSavedEpisodes({
    body,
    params,
  }: RequestParams<'DELETE', '/me/episodes'>) {
    await this._delete('/me/episodes', { body, params });

    return true;
  }

  async removeSavedShows({ params }: RequestParams<'DELETE', '/me/shows'>) {
    await this._delete('/me/shows', { params });

    return true;
  }

  async removeSavedTracks({
    body,
    params,
  }: RequestParams<'DELETE', '/me/tracks'>) {
    await this._delete('/me/tracks', { body, params });

    return true;
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

  async saveAlbumsToLibrary({
    body,
    params,
  }: RequestParams<'PUT', '/me/albums'>) {
    await this._put('/me/albums', { body, params });

    return true;
  }

  async saveEpisodesToLibrary({
    body,
    params,
  }: RequestParams<'PUT', '/me/episodes'>) {
    await this._put('/me/episode', { body, params });

    return true;
  }

  async saveShowsToLibrary({ params }: RequestParams<'PUT', '/me/shows'>) {
    await this._put('/me/shows', { params });

    return true;
  }

  async saveTracksToLibrary({ params }: RequestParams<'PUT', '/me/tracks'>) {
    await this._put('/me/tracks', { params });

    return true;
  }

  search(params: Spotify.Request.QueryParams.GET['/search']) {
    return this._get<Spotify.Response.GET['/search']>('/search', { params });
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

  async unfollow({ body, params }: RequestParams<'DELETE', '/me/following'>) {
    await this._delete('/me/following', { body, params });
  }

  async unfollowPlaylist(playlistId: string) {
    await this._delete(`/playlists/${playlistId}/followers`);

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

  // eslint-disable-next-line @typescript-eslint/require-await
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

  private _delete<TReturn>(path: string, options?: DeleteRequestOptions) {
    return this.delete<TReturn>(path, {
      ...options,
      params: this.normalizeParams(options?.params),
    });
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
