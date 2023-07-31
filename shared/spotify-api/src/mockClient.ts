import { Spotify } from './types';
import { SpotifyDataSource } from './dataSource';
import { mocks } from './mocks';

interface UserPlaybackState {
  actions: Spotify.Object.Actions;
  context: Spotify.Object.Context;
  device: Spotify.Object.Device;
  is_playing: boolean;
  item: { id: string };
  progress_ms: number;
  repeat_state: Spotify.Object.RepeatMode;
  shuffle_state: boolean;
  timestamp: number;
  currently_playing_type: Spotify.Object.CurrentlyPlayingType;
}

const MAX_PROGRESS_MS = 140_000;

function createUserPlaybackState(): UserPlaybackState {
  return {
    actions: { disallows: { interrupting_playback: true } },
    context: {
      external_urls: { spotify: '' },
      href: '',
      type: 'album',
      uri: '',
    },
    device: {
      id: 'f15b1cd24a5ae5fe4224edc5d4958a06f07c5b99',
      is_private_session: false,
      is_restricted: false,
      name: `My Computer`,
      type: 'Computer',
      is_active: true,
      volume_percent: 100,
    },
    is_playing: true,
    item: { id: '4lhhYqzREcts4uOOqWHjRJ' },
    progress_ms: 0,
    repeat_state: 'off',
    shuffle_state: false,
    timestamp: Date.now(),
    currently_playing_type: 'track',
  };
}

function findOrCreateUserPlaybackState(userId: string) {
  return (userState[userId] ||= createUserPlaybackState());
}

const userState: {
  [userId: string]: UserPlaybackState;
} = {};

export class MockSpotifyClient implements SpotifyDataSource {
  private userId: string;
  private state: UserPlaybackState;

  constructor(userId: string) {
    this.userId = userId;
    this.state = findOrCreateUserPlaybackState(userId);
  }

  addItemsToPlaylist(
    playlistId: string,
    {
      params,
      body,
    }: {
      body: { uris?: string[]; position?: number };
      params: { position?: number; uris?: string[] };
    }
  ): Promise<{ snapshot_id: string }> {
    throw new Error('Mock not implemented.');
  }

  async addItemToPlaybackQueue({
    params,
  }: {
    params: { uri: string; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async follow({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string; type: 'artist' | 'user' };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async followPlaylist(
    playlistId: string,
    { body }: { body: { public?: boolean } }
  ): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async getAlbum(
    id: string,
    params?: { market?: string }
  ): Promise<Spotify.Object.Album> {
    const album = mocks.albums[id];

    if (params.market && album.available_markets.includes(params.market)) {
      return album;
    } else if (album) {
      return album;
    }

    return null;
  }

  async getAlbums(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'albums', Spotify.Object.Album>> {
    return { albums: Object.values(mocks.albums) };
  }

  async getAlbumTracks(
    id: string,
    params?: { limit?: number; offset?: number; market?: string }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.TrackSimplified>> {
    return mocks.albums[id]?.tracks;
  }

  async getArtist(id: string): Promise<Spotify.Object.Artist> {
    throw new Error('Mock not implemented.');
  }

  async getArtists(params: {
    ids: string;
  }): Promise<Spotify.Object.List<'artists', Spotify.Object.Artist>> {
    throw new Error('Mock not implemented.');
  }

  async getArtistAlbums(
    id: string,
    params?: { limit?: number; offset?: number; include_groups?: string }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>> {
    throw new Error('Mock not implemented.');
  }

  async getArtistRelatedArtists(
    artistId: string
  ): Promise<Spotify.Object.List<'artists', Spotify.Object.Artist>> {
    throw new Error('Mock not implemented.');
  }

  async getArtistTopTracks(
    artistId: string,
    params: { market: string }
  ): Promise<Spotify.Object.ArtistTopTracks> {
    throw new Error('Mock not implemented.');
  }

  async checkContainsAlbums(ids: string): Promise<boolean[]> {
    throw new Error('Mock not implemented.');
  }

  async checkContainsEpisodes(ids: string): Promise<boolean[]> {
    throw new Error('Mock not implemented.');
  }

  async checkContainsShows(ids: string): Promise<boolean[]> {
    throw new Error('Mock not implemented.');
  }

  async checkContainsTracks(ids: string): Promise<boolean[]> {
    throw new Error('Mock not implemented.');
  }

  async checkFollowing(params: {
    ids: string;
    type: 'artist' | 'user';
  }): Promise<boolean[]> {
    throw new Error('Mock not implemented.');
  }

  async checkUsersFollowingPlaylist(
    playlistId: string,
    params: { ids: string }
  ): Promise<boolean[]> {
    throw new Error('Mock not implemented.');
  }

  async getCurrentlyPlaying(params?: {
    additional_types?: string;
  }): Promise<null | Spotify.Object.CurrentlyPlaying> {
    throw new Error('Mock not implemented.');
  }

  async getDevices(): Promise<
    Spotify.Object.List<'devices', Spotify.Object.Device>
  > {
    return { devices: [this.state.device] };
  }

  async getGenres(): Promise<Spotify.Object.List<'genres', string>> {
    return { genres: mocks.genres };
  }

  async getEpisode(id: string): Promise<Spotify.Object.Episode> {
    throw new Error('Mock not implemented.');
  }

  async getEpisodes(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'episodes', Spotify.Object.Episode>> {
    throw new Error('Mock not implemented.');
  }

  async getFollowed(params: {
    type: 'artist';
    after?: string;
    limit?: number;
  }): Promise<{
    artists: Spotify.Object.PaginatedCursorBased<Spotify.Object.Artist>;
  }> {
    throw new Error('Mock not implemented.');
  }

  async getShows(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'shows', Spotify.Object.Show>> {
    throw new Error('Mock not implemented.');
  }

  async getRecommendations(params: {
    seed_artists?: string;
    seed_genres?: string;
    seed_tracks?: string;
    limit?: number;
    max_acousticness?: number;
    max_danceability?: number;
    max_duration_ms?: number;
    max_energy?: number;
    max_instrumentalness?: number;
    max_key?: number;
    max_liveness?: number;
    max_loudness?: number;
    max_mode?: number;
    max_popularity?: number;
    max_speechiness?: number;
    max_tempo?: number;
    max_time_signature?: number;
    max_valence?: number;
    min_acousticness?: number;
    min_danceability?: number;
    min_duration_ms?: number;
    min_energy?: number;
    min_instrumentalness?: number;
    min_key?: number;
    min_liveness?: number;
    min_loudness?: number;
    min_mode?: number;
    min_popularity?: number;
    min_speechiness?: number;
    min_tempo?: number;
    min_time_signature?: number;
    min_valence?: number;
    target_acousticness?: number;
    target_danceability?: number;
    target_duration_ms?: number;
    target_energy?: number;
    target_instrumentalness?: number;
    target_key?: number;
    target_liveness?: number;
    target_loudness?: number;
    target_mode?: number;
    target_popularity?: number;
    target_speechiness?: number;
    target_tempo?: number;
    target_time_signature?: number;
    target_valence?: number;
  }): Promise<Spotify.Object.Recommendations> {
    throw new Error('Mock not implemented.');
  }

  async getCurrentUser(): Promise<Spotify.Object.CurrentUser> {
    return {
      id: this.userId,
      display_name: 'GraphOS User',
      email: 'contact@apollographql.com',
      external_urls: { spotify: '' },
      followers: { href: '', total: 1000000 },
      images: [],
      uri: 'https://discord.gg/graphos',
    } as Spotify.Object.CurrentUser;
  }

  async getCurrentUserAlbums(params: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedAlbum>> {
    throw new Error('Mock not implemented.');
  }

  async getCurrentUserEpisodes(params: {
    limit?: number;
    offset?: number;
    market?: string;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedEpisode>> {
    throw new Error('Mock not implemented.');
  }

  async getCurrentUserPlaylists(params: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Playlist>> {
    const playlists = Object.values(mocks.playlists);
    const { offset = 0, limit = 10 } = params;

    return {
      total: playlists.length,
      previous: '',
      next: '',
      href: '',
      items: playlists.slice(offset, offset + limit),
      limit,
      offset,
    };
  }

  async getCurrentUserTopArtists(params: {
    limit?: number;
    offset?: number;
    time_range?: 'long_term' | 'medium_term' | 'short_term';
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Artist>> {
    throw new Error('Mock not implemented.');
  }

  async getCurrentUserTopTracks(params: {
    limit?: number;
    offset?: number;
    time_range?: 'long_term' | 'medium_term' | 'short_term';
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Track>> {
    throw new Error('Mock not implemented.');
  }

  async getCurrentUserTracks(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedTrack>> {
    throw new Error('Mock not implemented.');
  }

  async getFeaturedPlaylists(params: {
    limit?: number;
    offset?: number;
    timestamp?: string;
  }): Promise<Spotify.Object.FeaturedPlaylists> {
    throw new Error('Mock not implemented.');
  }

  async getNewReleases(params: {
    country?: string;
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.NewReleases> {
    throw new Error('Mock not implemented.');
  }

  async getPlaybackState(params?: {
    additional_types?: string;
  }): Promise<Spotify.Object.PlaybackState> {
    if (this.state.is_playing) {
      if (this.state.progress_ms >= MAX_PROGRESS_MS) {
        this.state.progress_ms = 0;
      } else {
        this.state.progress_ms += 1000;
      }
    }

    return this.state as Spotify.Object.PlaybackState;
  }

  async getPlaybackQueue(): Promise<Spotify.Object.PlaybackQueue> {
    throw new Error('Mock not implemented.');
  }

  async getPlaylist(
    id: string,
    params?: { additional_types?: string; fields?: string; market?: string }
  ): Promise<Spotify.Object.Playlist> {
    return mocks.playlists[id];
  }

  async getPlaylistTracks(
    id: string,
    params: { limit?: number; offset?: number }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.PlaylistTrack>> {
    return mocks.playlists[id]?.tracks;
  }

  async getRecentlyPlayed(params?: {
    after?: number;
    before?: number;
    limit?: number;
  }): Promise<Spotify.Object.PaginatedCursorBased<Spotify.Object.PlayHistory>> {
    throw new Error('Mock not implemented.');
  }

  async getSavedShows(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedShow>> {
    throw new Error('Mock not implemented.');
  }

  async getShow(id: string): Promise<Spotify.Object.Show> {
    throw new Error('Mock not implemented.');
  }

  async getShowEpisodes(
    showId: string,
    params: { limit?: number; offset?: number }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>> {
    throw new Error('Mock not implemented.');
  }

  async getTrack(
    id: string,
    params?: { market?: string }
  ): Promise<Spotify.Object.Track> {
    const track = mocks.tracks[id];

    if (track && params?.market) {
      if (track.available_markets.includes(params.market)) return track;
    } else if (track) {
      return track;
    }

    return null;
  }

  async getTrackAudioFeatures(
    trackId: string
  ): Promise<Spotify.Object.TrackAudioFeatures> {
    throw new Error('Mock not implemented.');
  }

  async getTracks(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'tracks', Spotify.Object.Track>> {
    return {
      tracks: Object.values(mocks.tracks).filter((track) =>
        params.ids.split(',').includes(track.id)
      ),
    };
  }

  async getTracksAudioFeatures(params: {
    ids: string;
  }): Promise<
    Spotify.Object.List<'audio_features', Spotify.Object.TrackAudioFeatures>
  > {
    throw new Error('Mock not implemented.');
  }

  async getUser(userId: string): Promise<Spotify.Object.User> {
    throw new Error('Mock not implemented.');
  }

  async removeItemFromPlaylist(
    playlistId: string,
    { body }: { body: { snapshot_id?: string; tracks: { uri: string }[] } }
  ): Promise<{ snapshot_id: string }> {
    throw new Error('Mock not implemented.');
  }

  async removeSavedAlbums({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async removeSavedEpisodes({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async removeSavedShows({
    params,
  }: {
    params: { ids: string; market?: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async removeSavedTracks({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async resumePlayback({
    body,
    params,
  }: {
    params: { device_id?: string };
    body: {
      context_uri?: string;
      uris?: string[];
      offset?: { position?: number; uri?: string };
      position_ms?: number;
    };
  }): Promise<boolean> {
    if (this.state.is_playing) {
      return false;
    }

    this.state.is_playing = true;
    this.state.device.is_active = true;

    return true;
  }

  async pausePlayback({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    if (!this.state.is_playing) {
      return false;
    }

    this.state.is_playing = false;
    this.state.device.is_active = false;

    return true;
  }

  async saveAlbumsToLibrary({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async saveEpisodesToLibrary({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async saveShowsToLibrary({
    params,
  }: {
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async saveTracksToLibrary({
    params,
  }: {
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }

  async search(params: {
    q: string;
    type: string;
    include_external?: 'audio';
    limit?: number;
    market?: string;
    offset?: number;
  }): Promise<Spotify.Object.SearchResults> {
    throw new Error('Mock not implemented.');
  }

  async seekToPosition({
    params,
  }: {
    params: { position_ms: number; device_id?: string };
  }): Promise<boolean> {
    this.state.progress_ms = params.position_ms;

    return true;
  }

  async setRepeatMode({
    params,
  }: {
    params: { state: Spotify.Object.RepeatMode; device_id?: string };
  }): Promise<boolean> {
    this.state.repeat_state = params.state;

    return true;
  }

  async setVolume({
    params,
  }: {
    params: { volume_percent: number; device_id?: string };
  }): Promise<boolean> {
    this.state.device.volume_percent = params.volume_percent;

    return true;
  }

  async shufflePlayback({
    params,
  }: {
    params: { state: boolean; device_id?: string };
  }): Promise<boolean> {
    this.state.shuffle_state = params.state;

    return true;
  }

  async skipToNext({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    this.state.progress_ms = 0;

    return true;
  }

  async skipToPrevious({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    this.state.progress_ms = 0;

    return true;
  }

  async transferPlayback({
    body,
  }: {
    body: { device_ids: string[]; play?: boolean };
  }): Promise<boolean> {
    if (body.device_ids.length === 0) {
      return false;
    }

    this.state.device.id = body.device_ids[0];
    this.state.device.is_active = body.play;
    this.state.is_playing = body.play;

    return true;
  }

  async unfollow({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string; type: 'artist' | 'user' };
  }): Promise<unknown> {
    throw new Error('Mock not implemented.');
  }

  async unfollowPlaylist(playlistId: string): Promise<boolean> {
    throw new Error('Mock not implemented.');
  }
}
