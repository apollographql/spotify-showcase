import { Spotify } from '../dataSources/spotify.types';
import { SpotifyDataSource } from '../dataSources/spotify';
import { resolve } from 'path';

export const mocks = {
  User: () => ({
    displayName: 'Mocked Watson',
  }),
};

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
  addItemToPlaybackQueue({
    params,
  }: {
    params: { uri: string; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  follow({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string; type: 'artist' | 'user' };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  followPlaylist(
    playlistId: string,
    { body }: { body: { public?: boolean } }
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAlbum(
    id: string,
    params?: { market?: string }
  ): Promise<Spotify.Object.Album> {
    throw new Error('Method not implemented.');
  }
  getAlbums(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'albums', Spotify.Object.Album>> {
    throw new Error('Method not implemented.');
  }
  getAlbumTracks(
    id: string,
    params?: { limit?: number; offset?: number; market?: string }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.TrackSimplified>> {
    throw new Error('Method not implemented.');
  }
  getArtist(id: string): Promise<Spotify.Object.Artist> {
    throw new Error('Method not implemented.');
  }
  getArtists(params: {
    ids: string;
  }): Promise<Spotify.Object.List<'artists', Spotify.Object.Artist>> {
    throw new Error('Method not implemented.');
  }
  getArtistAlbums(
    id: string,
    params?: { limit?: number; offset?: number; include_groups?: string }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.AlbumSimplified>> {
    throw new Error('Method not implemented.');
  }
  getArtistRelatedArtists(
    artistId: string
  ): Promise<Spotify.Object.List<'artists', Spotify.Object.Artist>> {
    throw new Error('Method not implemented.');
  }
  getArtistTopTracks(
    artistId: string,
    params: { market: string }
  ): Promise<Spotify.Object.ArtistTopTracks> {
    throw new Error('Method not implemented.');
  }
  checkContainsAlbums(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  checkContainsEpisodes(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  checkContainsShows(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  checkContainsTracks(ids: string): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  checkFollowing(params: {
    ids: string;
    type: 'artist' | 'user';
  }): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  checkUsersFollowingPlaylist(
    playlistId: string,
    params: { ids: string }
  ): Promise<boolean[]> {
    throw new Error('Method not implemented.');
  }
  getCurrentlyPlaying(params?: {
    additional_types?: string;
  }): Promise<null | Spotify.Object.CurrentlyPlaying> {
    throw new Error('Method not implemented.');
  }
  getDevices(): Promise<Spotify.Object.List<'devices', Spotify.Object.Device>> {
    throw new Error('Method not implemented.');
  }
  getGenres(): Promise<Spotify.Object.List<'genres', string>> {
    throw new Error('Method not implemented.');
  }
  getEpisode(id: string): Promise<Spotify.Object.Episode> {
    throw new Error('Method not implemented.');
  }
  getEpisodes(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'episodes', Spotify.Object.Episode>> {
    throw new Error('Method not implemented.');
  }
  getFollowed(params: {
    type: 'artist';
    after?: string;
    limit?: number;
  }): Promise<{
    artists: Spotify.Object.PaginatedCursorBased<Spotify.Object.Artist>;
  }> {
    throw new Error('Method not implemented.');
  }
  getShows(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'shows', Spotify.Object.Show>> {
    throw new Error('Method not implemented.');
  }
  getRecommendations(params: {
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
  getCurrentUser(): Promise<Spotify.Object.CurrentUser> {
    return new Promise((resolve) =>
      resolve({
        id: this.userId,
        display_name: 'GraphOS User',
        email: 'contact@apollographql.com',
        external_urls: { spotify: '' },
        followers: { href: '', total: 1000000 },
        images: [],
        uri: 'https://discord.gg/graphos',
      } as any)
    );
  }
  getCurrentUserAlbums(params: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedAlbum>> {
    throw new Error('Method not implemented.');
  }
  getCurrentUserEpisodes(params: {
    limit?: number;
    offset?: number;
    market?: string;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedEpisode>> {
    throw new Error('Method not implemented.');
  }
  getCurrentUserPlaylists(params: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Playlist>> {
    return new Promise((resolve) =>
      resolve({
        total: 10,
        previous: '',
        next: '',
        href: '',
        items: [],
        limit: params.limit ?? 10,
        offset: params.limit ?? 0,
      })
    );
  }
  getCurrentUserTopArtists(params: {
    limit?: number;
    offset?: number;
    time_range?: 'long_term' | 'medium_term' | 'short_term';
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Artist>> {
    throw new Error('Method not implemented.');
  }
  getCurrentUserTopTracks(params: {
    limit?: number;
    offset?: number;
    time_range?: 'long_term' | 'medium_term' | 'short_term';
  }): Promise<Spotify.Object.Paginated<Spotify.Object.Track>> {
    throw new Error('Method not implemented.');
  }
  getCurrentUserTracks(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedTrack>> {
    throw new Error('Method not implemented.');
  }
  getFeaturedPlaylists(params: {
    limit?: number;
    offset?: number;
    timestamp?: string;
  }): Promise<Spotify.Object.FeaturedPlaylists> {
    throw new Error('Method not implemented.');
  }
  getNewReleases(params: {
    country?: string;
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.NewReleases> {
    throw new Error('Method not implemented.');
  }
  getPlaybackState(params?: {
    additional_types?: string;
  }): Promise<Spotify.Object.PlaybackState> {
    throw new Error('Method not implemented.');
  }
  getPlaybackQueue(): Promise<Spotify.Object.PlaybackQueue> {
    throw new Error('Method not implemented.');
  }
  getPlaylist(
    id: string,
    params?: { additional_types?: string; fields?: string; market?: string }
  ): Promise<Spotify.Object.Playlist> {
    throw new Error('Method not implemented.');
  }
  getPlaylistTracks(
    id: string,
    params: { limit?: number; offset?: number }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.PlaylistTrack>> {
    throw new Error('Method not implemented.');
  }
  getRecentlyPlayed(params?: {
    after?: number;
    before?: number;
    limit?: number;
  }): Promise<Spotify.Object.PaginatedCursorBased<Spotify.Object.PlayHistory>> {
    throw new Error('Method not implemented.');
  }
  getSavedShows(params?: {
    limit?: number;
    offset?: number;
  }): Promise<Spotify.Object.Paginated<Spotify.Object.SavedShow>> {
    throw new Error('Method not implemented.');
  }
  getShow(id: string): Promise<Spotify.Object.Show> {
    throw new Error('Method not implemented.');
  }
  getShowEpisodes(
    showId: string,
    params: { limit?: number; offset?: number }
  ): Promise<Spotify.Object.Paginated<Spotify.Object.EpisodeSimplified>> {
    throw new Error('Method not implemented.');
  }
  getTrack(
    id: string,
    params?: { market?: string }
  ): Promise<Spotify.Object.Track> {
    return new Promise((resolve) =>
      resolve({
        type: 'track',
        id: '2jJIENqpTOjBECelzBJAVL',
        name: 'Apollo I : The Writing Writer - Explicit Album Version',
        duration_ms: 315480,
        album: {
          id: '4nYsnQpTAQaPzrPc6rOsBN',
          name: "Good Apollo I'm Burning Star IV Volume One: From Fear Through The Eyes Of Madness",
          artists: [
            {
              id: '3utxjLheHaVEd9bPjQRsy8',
              name: 'Coheed and Cambria',
            },
          ],
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d0000b273a9250e237a834437fa7d8739',
            },
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02a9250e237a834437fa7d8739',
            },
            {
              url: 'https://i.scdn.co/image/ab67616d00004851a9250e237a834437fa7d8739',
            },
          ],
        },
      } as any)
    );
  }
  getTrackAudioFeatures(
    trackId: string
  ): Promise<Spotify.Object.TrackAudioFeatures> {
    throw new Error('Method not implemented.');
  }
  getTracks(params: {
    ids: string;
    market?: string;
  }): Promise<Spotify.Object.List<'tracks', Spotify.Object.Track>> {
    throw new Error('Method not implemented.');
  }
  getTracksAudioFeatures(params: {
    ids: string;
  }): Promise<
    Spotify.Object.List<'audio_features', Spotify.Object.TrackAudioFeatures>
  > {
    throw new Error('Method not implemented.');
  }
  getUser(userId: string): Promise<Spotify.Object.User> {
    throw new Error('Method not implemented.');
  }
  removeItemFromPlaylist(
    playlistId: string,
    { body }: { body: { snapshot_id?: string; tracks: { uri: string }[] } }
  ): Promise<{ snapshot_id: string }> {
    throw new Error('Method not implemented.');
  }
  removeSavedAlbums({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  removeSavedEpisodes({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  removeSavedShows({
    params,
  }: {
    params: { ids: string; market?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  removeSavedTracks({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  resumePlayback({
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
  pausePlayback({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  saveAlbumsToLibrary({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  saveEpisodesToLibrary({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  saveShowsToLibrary({
    params,
  }: {
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  saveTracksToLibrary({
    params,
  }: {
    params: { ids: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  search(params: {
    q: string;
    type: string;
    include_external?: 'audio';
    limit?: number;
    market?: string;
    offset?: number;
  }): Promise<Spotify.Object.SearchResults> {
    throw new Error('Method not implemented.');
  }
  seekToPosition({
    params,
  }: {
    params: { position_ms: number; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  setRepeatMode({
    params,
  }: {
    params: { state: Spotify.Object.RepeatMode; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  setVolume({
    params,
  }: {
    params: { volume_percent: number; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  shufflePlayback({
    params,
  }: {
    params: { state: boolean; device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  skipToNext({ params }: { params: { device_id?: string } }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  skipToPrevious({
    params,
  }: {
    params: { device_id?: string };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  transferPlayback({
    body,
  }: {
    body: { device_ids: string[]; play?: boolean };
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  unfollow({
    body,
    params,
  }: {
    body: { ids?: string[] };
    params: { ids: string; type: 'artist' | 'user' };
  }): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  unfollowPlaylist(playlistId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
