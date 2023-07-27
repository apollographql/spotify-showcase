import { Spotify, SpotifyDataSource } from 'spotify-api';
import { mocks } from './mockedData';

export class MockedSpotifyDataSource implements SpotifyDataSource {
  private userId: string;
  constructor(userId: string) {
    this.userId = userId;
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
    throw new Error('Method not implemented.');
  }

  async addItemToPlaybackQueue({
    params,
  }: {
    params: { uri: string; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async follow({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string; type: 'artist' | 'user' };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async followPlaylist(
    playlistId: string,
    { body }: { body: { public?: boolean } }
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAlbum(
    id: string,
    params?: { market?: string }
  ): Promise<Spotify.Object.Album> {
    const album = mocks.albums.find((t) => t.id == id);
    if (album && params?.market) {
      if (album.available_markets.includes(params.market)) return album;
    } else if (album) return album;
    else return null;
  }

  async getAlbums(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'albums', Spotify.Object.Album>> {
    return { albums: mocks.albums };
  }

  async getAlbumTracks(
    id: string,
    params?: { limit?: number; offset?: number; market?: string }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.TrackSimplified>> {
    return mocks.albums.find((t) => t.id == id)?.tracks;
  }

  async getArtist(id: string): Promise<Spotify.Object.Artist> {
    throw new Error('Method not implemented.');
  }

  async getArtists(params: {
    ids: string;
  }): Promise<Spotify.Object.List<'artists', Spotify.Object.Artist>> {
    throw new Error('Method not implemented.');
  }

  async getArtistAlbums(
    id: string,
    params?: { limit?: number; offset?: number; include_groups?: string }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>> {
    throw new Error('Method not implemented.');
  }

  async getArtistRelatedArtists(
    artistId: string
  ): Promise<Spotify.Object.List<'artists', Spotify.Object.Artist>> {
    throw new Error('Method not implemented.');
  }

  async getArtistTopTracks(
    artistId: string,
    params: { market: string }
  ): Promise<Spotify.Object.ArtistTopTracks> {
    throw new Error('Method not implemented.');
  }

  async checkContainsAlbums(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }

  async checkContainsEpisodes(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }

  async checkContainsShows(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }

  async checkContainsTracks(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }

  async checkFollowing(params: {
    ids: string;
    type: 'artist' | 'user';
  }): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }

  async checkUsersFollowingPlaylist(
    playlistId: string,
    params: { ids: string }
  ): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }

  async getCurrentlyPlaying(params?: {
    additional_types?: string;
  }): Promise<null | Spotify.Object.CurrentlyPlaying> {
    throw new Error('Method not implemented.');
  }

  async getDevices(): Promise<
    Spotify.Object.List<'devices', Spotify.Object.Device>
  > {
    throw new Error('Method not implemented.');
  }

  async getGenres(): Promise<Spotify.Object.List<'genres', string>> {
    throw new Error('Method not implemented.');
  }

  async getEpisode(id: string): Promise<Spotify.Object.Episode> {
    throw new Error('Method not implemented.');
  }

  async getEpisodes(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'episodes', Spotify.Object.Episode>> {
    throw new Error('Method not implemented.');
  }

  async getFollowed(params: {
    type: 'artist';
    after?: string;
    limit?: number;
  }): Promise<{
    artists: Spotify.Object.PaginatedCursorBased<Spotify.Object.Artist>;
  }> {
    throw new Error('Method not implemented.');
  }

  async getShows(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'shows', Spotify.Object.Show>> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }

  async getCurrentUserEpisodes(params: {
    limit?: number;
    offset?: number;
    market?: string;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedEpisode>> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUserPlaylists(params: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Playlist>> {
    const items: Spotify.Object.Playlist[] = [];

    return {
      total: 10,
      previous: '',
      next: '',
      href: '',
      items: mocks.playlists,
      limit: params.limit ?? 10,
      offset: params.limit ?? 0,
    };
  }

  async getCurrentUserTopArtists(params: {
    limit?: number;
    offset?: number;
    time_range?: 'long_term' | 'medium_term' | 'short_term';
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Artist>> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUserTopTracks(params: {
    limit?: number;
    offset?: number;
    time_range?: 'long_term' | 'medium_term' | 'short_term';
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Track>> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUserTracks(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedTrack>> {
    throw new Error('Method not implemented.');
  }

  async getFeaturedPlaylists(params: {
    limit?: number;
    offset?: number;
    timestamp?: string;
  }): Promise<Spotify.Object.FeaturedPlaylists> {
    throw new Error('Method not implemented.');
  }

  async getNewReleases(params: {
    country?: string;
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.NewReleases> {
    throw new Error('Method not implemented.');
  }

  async getPlaybackState(params?: {
    additional_types?: string;
  }): Promise<Spotify.Object.PlaybackState> {
    throw new Error('Method not implemented.');
  }

  async getPlaybackQueue(): Promise<Spotify.Object.PlaybackQueue> {
    throw new Error('Method not implemented.');
  }

  async getPlaylist(
    id: string,
    params?: { additional_types?: string; fields?: string; market?: string }
  ): Promise<Spotify.Object.Playlist> {
    return mocks.playlists.find((t) => t.id == id);
  }

  async getPlaylistTracks(
    id: string,
    params: { limit?: number; offset?: number }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.PlaylistTrack>> {
    return mocks.playlists.find((t) => t.id == id)?.tracks;
  }

  async getRecentlyPlayed(params?: {
    after?: number;
    before?: number;
    limit?: number;
  }): Promise<Spotify.Object.PaginatedCursorBased<Spotify.Object.PlayHistory>> {
    throw new Error('Method not implemented.');
  }

  async getSavedShows(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedShow>> {
    throw new Error('Method not implemented.');
  }

  async getShow(id: string): Promise<Spotify.Object.Show> {
    throw new Error('Method not implemented.');
  }

  async getShowEpisodes(
    showId: string,
    params: { limit?: number; offset?: number }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>> {
    throw new Error('Method not implemented.');
  }

  async getTrack(
    id: string,
    params?: { market?: string }
  ): Promise<Spotify.Object.Track> {
    const track = mocks.tracks.find((t) => t.id == id);
    if (track && params?.market) {
      if (track.available_markets.includes(params.market)) return track;
    } else if (track) return track;
    else return null;
  }

  async getTrackAudioFeatures(
    trackId: string
  ): Promise<Spotify.Object.TrackAudioFeatures> {
    throw new Error('Method not implemented.');
  }

  async getTracks(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'tracks', Spotify.Object.Track>> {
    return { tracks: mocks.tracks };
  }

  async getTracksAudioFeatures(params: {
    ids: string;
  }): Promise<
    Spotify.Object.List<'audio_features', Spotify.Object.TrackAudioFeatures>
  > {
    throw new Error('Method not implemented.');
  }

  async getUser(userId: string): Promise<Spotify.Object.User> {
    throw new Error('Method not implemented.');
  }

  async removeItemFromPlaylist(
    playlistId: string,
    { body }: { body: { snapshot_id?: string; tracks: { uri: string }[] } }
  ): Promise<{ snapshot_id: string }> {
    throw new Error('Method not implemented.');
  }

  async removeSavedAlbums({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async removeSavedEpisodes({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async removeSavedShows({
    params,
  }: {
    params: { ids: string; market?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async removeSavedTracks({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async resumePlayback({
    body,
    params,
  }: {
    body: {
      context_uri?: string;
      uris?: string[];
      offset?: { position?: number; uri?: string };
      position_ms?: number;
    };
    params: { device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async pausePlayback({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async saveAlbumsToLibrary({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async saveEpisodesToLibrary({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async saveShowsToLibrary({
    params,
  }: {
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async saveTracksToLibrary({
    params,
  }: {
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async search(params: {
    q: string;
    type: string;
    include_external?: 'audio';
    limit?: number;
    market?: string;
    offset?: number;
  }): Promise<Spotify.Object.SearchResults> {
    throw new Error('Method not implemented.');
  }

  async seekToPosition({
    params,
  }: {
    params: { position_ms: number; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async setRepeatMode({
    params,
  }: {
    params: { state: Spotify.Object.RepeatMode; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async setVolume({
    params,
  }: {
    params: { volume_percent: number; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async shufflePlayback({
    params,
  }: {
    params: { state: boolean; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async skipToNext({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async skipToPrevious({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async transferPlayback({
    body,
  }: {
    body: { device_ids: string[]; play?: boolean };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async unfollow({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string; type: 'artist' | 'user' };
  }): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  async unfollowPlaylist(playlistId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
