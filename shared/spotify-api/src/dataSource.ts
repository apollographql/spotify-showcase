import { ConditionalKeys } from 'type-fest';
import { Spotify } from './types';

export type OmitNever<T> = Omit<T, ConditionalKeys<T, never>>;

type RequestParams<
  HTTPMethod extends Spotify.HTTPMethod,
  Path extends Spotify.Request.Paths,
> = OmitNever<{
  body: Spotify.Request.BodyParams.Lookup<HTTPMethod, Path>;
  params: Spotify.Request.QueryParams.Lookup<HTTPMethod, Path>;
}>;

export interface SpotifyDataSource {
  addItemsToPlaylist(
    playlistId: string,
    { params, body }: RequestParams<'POST', '/playlists/:id/tracks'>
  ): Promise<Spotify.Response.POST['/playlists/:id/tracks']>;
  addItemToPlaybackQueue({
    params,
  }: RequestParams<'POST', '/me/player/queue'>): Promise<boolean>;
  follow({
    body,
    params,
  }: RequestParams<'PUT', '/me/following'>): Promise<boolean>;
  followPlaylist(
    playlistId: string,
    { body }: RequestParams<'PUT', '/playlists/:id/followers'>
  ): Promise<boolean>;
  getAlbum(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id']
  ): Promise<Spotify.Response.GET['/albums/:id']>;
  getAlbums(
    params: Spotify.Request.QueryParams.GET['/albums']
  ): Promise<Spotify.Response.GET['/albums']>;
  getAlbumTracks(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/albums/:id/tracks']
  ): Promise<Spotify.Response.GET['/albums/:id/tracks']>;
  getArtist(id: string): Promise<Spotify.Response.GET['/artists/:id']>;
  getArtists(
    params: Spotify.Request.QueryParams.GET['/artists']
  ): Promise<Spotify.Response.GET['/artists']>;
  getArtistAlbums(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/artists/:id/albums']
  ): Promise<Spotify.Response.GET['/artists/:id/albums']>;
  /** @deprecated */
  getArtistRelatedArtists(
    artistId: string
  ): Promise<Spotify.Response.GET['/artists/:id/related-artists']>;
  getArtistTopTracks(
    artistId: string,
    params: Spotify.Request.QueryParams.GET['/artists/:id/top-tracks']
  ): Promise<Spotify.Response.GET['/artists/:id/top-tracks']>;
  checkContainsAlbums(
    ids: string
  ): Promise<Spotify.Response.GET['/me/albums/contains']>;
  checkContainsEpisodes(
    ids: string
  ): Promise<Spotify.Response.GET['/me/episodes/contains']>;
  checkContainsShows(
    ids: string
  ): Promise<Spotify.Response.GET['/me/shows/contains']>;
  checkContainsTracks(
    ids: string
  ): Promise<Spotify.Response.GET['/me/tracks/contains']>;
  checkFollowing(
    params: Spotify.Request.QueryParams.GET['/me/following/contains']
  ): Promise<Spotify.Response.GET['/me/following/contains']>;
  checkUsersFollowingPlaylist(
    playlistId: string,
    params: Spotify.Request.QueryParams.GET['/playlists/:id/followers/contains']
  ): Promise<Spotify.Response.GET['/playlists/:id/followers/contains']>;
  getCurrentlyPlaying(
    params?: Spotify.Request.QueryParams.GET['/me/player/currently-playing']
  ): Promise<Spotify.Response.GET['/me/player/currently-playing'] | null>;
  getDevices(): Promise<Spotify.Response.GET['/me/player/devices']>;
  /** @deprecated */
  getGenres(): Promise<
    Spotify.Response.GET['/recommendations/available-genre-seeds']
  >;
  getEpisode(id: string): Promise<Spotify.Response.GET['/episodes/:id']>;
  getEpisodes(
    params: Spotify.Request.QueryParams.GET['/episodes']
  ): Promise<Spotify.Response.GET['/episodes']>;
  getFollowed(
    params: Spotify.Request.QueryParams.GET['/me/following']
  ): Promise<Spotify.Response.GET['/me/following']>;
  getShows(
    params: Spotify.Request.QueryParams.GET['/shows']
  ): Promise<Spotify.Response.GET['/shows']>;
  /** @deprecated */
  getRecommendations(
    params: Spotify.Request.QueryParams.GET['/recommendations']
  ): Promise<Spotify.Response.GET['/recommendations']>;
  getCurrentUser(): Promise<Spotify.Response.GET['/me']>;
  getCurrentUserAlbums(
    params: Spotify.Request.QueryParams.GET['/me/albums']
  ): Promise<Spotify.Response.GET['/me/albums']>;
  getCurrentUserEpisodes(
    params: Spotify.Request.QueryParams.GET['/me/episodes']
  ): Promise<Spotify.Response.GET['/me/episodes']>;
  getCurrentUserPlaylists(
    params: Spotify.Request.QueryParams.GET['/me/playlists']
  ): Promise<Spotify.Response.GET['/me/playlists']>;
  getCurrentUserTopArtists(
    params: Spotify.Request.QueryParams.GET['/me/top/artists']
  ): Promise<Spotify.Response.GET['/me/top/artists']>;
  getCurrentUserTopTracks(
    params: Spotify.Request.QueryParams.GET['/me/top/tracks']
  ): Promise<Spotify.Response.GET['/me/top/tracks']>;
  getCurrentUserTracks(
    params?: Spotify.Request.QueryParams.GET['/me/tracks']
  ): Promise<Spotify.Response.GET['/me/tracks']>;
  /** @deprecated */
  getFeaturedPlaylists(
    params: Spotify.Request.QueryParams.GET['/browse/featured-playlists']
  ): Promise<Spotify.Response.GET['/browse/featured-playlists']>;
  getNewReleases(
    params: Spotify.Request.QueryParams.GET['/browse/new-releases']
  ): Promise<Spotify.Response.GET['/browse/new-releases']>;
  getPlaybackState(
    params?: Spotify.Request.QueryParams.GET['/me/player']
  ): Promise<Spotify.Response.GET['/me/player'] | null>;
  getPlaybackQueue(): Promise<Spotify.Response.GET['/me/player/queue']>;
  getPlaylist(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/playlists/:id']
  ): Promise<Spotify.Response.GET['/playlists/:id']>;
  getPlaylistTracks(
    id: string,
    params: Spotify.Request.QueryParams.GET['/playlists/:id/tracks']
  ): Promise<Spotify.Response.GET['/playlists/:id/tracks']>;
  getRecentlyPlayed(
    params?: Spotify.Request.QueryParams.GET['/me/player/recently-played']
  ): Promise<Spotify.Response.GET['/me/player/recently-played']>;
  getSavedShows(
    params?: Spotify.Request.QueryParams.GET['/me/shows']
  ): Promise<Spotify.Response.GET['/me/shows']>;
  getShow(id: string): Promise<Spotify.Response.GET['/shows/:id']>;
  getShowEpisodes(
    showId: string,
    params: Spotify.Request.QueryParams.GET['/shows/:id/episodes']
  ): Promise<Spotify.Response.GET['/shows/:id/episodes']>;
  getTrack(
    id: string,
    params?: Spotify.Request.QueryParams.GET['/tracks/:id']
  ): Promise<Spotify.Object.Track | undefined>;
  /** @deprecated */
  getTrackAudioFeatures(
    trackId: string
  ): Promise<Spotify.Response.GET['/audio-features/:id']>;
  getTracks(
    params: Spotify.Request.QueryParams.GET['/tracks']
  ): Promise<Spotify.Response.GET['/tracks']>;
  /** @deprecated */
  getTracksAudioFeatures(
    params: Spotify.Request.QueryParams.GET['/audio-features']
  ): Promise<Spotify.Response.GET['/audio-features']>;
  getUser(userId: string): Promise<Spotify.Response.GET['/users/:id']>;
  removeItemFromPlaylist(
    playlistId: string,
    { body }: RequestParams<'DELETE', '/playlists/:id/tracks'>
  ): Promise<Spotify.Response.DELETE['/playlists/:id/tracks']>;
  removeSavedAlbums({
    body,
    params,
  }: RequestParams<'DELETE', '/me/albums'>): Promise<boolean>;
  removeSavedEpisodes({
    body,
    params,
  }: RequestParams<'DELETE', '/me/episodes'>): Promise<boolean>;
  removeSavedShows({
    params,
  }: RequestParams<'DELETE', '/me/shows'>): Promise<boolean>;
  removeSavedTracks({
    body,
    params,
  }: RequestParams<'DELETE', '/me/tracks'>): Promise<boolean>;
  resumePlayback({
    body,
    params,
  }: RequestParams<'PUT', '/me/player/play'>): Promise<boolean>;
  pausePlayback({
    params,
  }: RequestParams<'PUT', '/me/player/pause'>): Promise<boolean>;
  saveAlbumsToLibrary({
    body,
    params,
  }: RequestParams<'PUT', '/me/albums'>): Promise<boolean>;
  saveEpisodesToLibrary({
    body,
    params,
  }: RequestParams<'PUT', '/me/episodes'>): Promise<boolean>;
  saveShowsToLibrary({
    params,
  }: RequestParams<'PUT', '/me/shows'>): Promise<boolean>;
  saveTracksToLibrary({
    params,
  }: RequestParams<'PUT', '/me/tracks'>): Promise<boolean>;
  search(
    params: Spotify.Request.QueryParams.GET['/search']
  ): Promise<Spotify.Response.GET['/search']>;
  seekToPosition({
    params,
  }: RequestParams<'PUT', '/me/player/seek'>): Promise<boolean>;
  setRepeatMode({
    params,
  }: RequestParams<'PUT', '/me/player/repeat'>): Promise<boolean>;
  setVolume({
    params,
  }: RequestParams<'PUT', '/me/player/volume'>): Promise<boolean>;
  shufflePlayback({
    params,
  }: RequestParams<'PUT', '/me/player/shuffle'>): Promise<boolean>;
  skipToNext({
    params,
  }: RequestParams<'POST', '/me/player/next'>): Promise<boolean>;
  skipToPrevious({
    params,
  }: RequestParams<'POST', '/me/player/previous'>): Promise<boolean>;
  transferPlayback({
    body,
  }: RequestParams<'PUT', '/me/player'>): Promise<boolean>;
  unfollow({
    body,
    params,
  }: RequestParams<'DELETE', '/me/following'>): Promise<unknown>;
  unfollowPlaylist(playlistId: string): Promise<boolean>;
}
