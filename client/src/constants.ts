export const AUTH_TOKEN_KEY = 'authToken';
export const DEFAULT_BACKGROUND_COLOR = 'var(--background--base)';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  CODE_VERIFIER: 'codeVerifier',
  EXPIRES_AT: 'expiresAt',
  REFRESH_TOKEN: 'refreshToken',
  STATE: 'state',
  PERSISTED_QUERY_MODE: 'persistedQueryMode',
} as const;

export const NOTIFICATION = {
  ADDED_TO_QUEUE: 'Added to queue',
  ADDED_TO_PLAYLIST: 'Added to Playlist',
  REMOVED_SAVED_ALBUM: 'Removed from your Albums',
  REMOVED_SAVED_TRACK: 'Removed from your Liked Songs',
  REMOVED_SAVED_TRACK_ERROR: 'Could not remove from your Liked Songs',
  SAVED_ALBUM: 'Added to your Albums',
  SAVED_TRACK: 'Added to your Liked Songs',
  SAVED_TRACK_ERROR: 'Could not save to your Liked Songs',
} as const;

export const NOT_IMPLEMENTED_ROUTES = [
  '/search',
  '/users/:id',
  '/collection/episodes',
];

// To make this web app a playable device, we use the Spotify Web SDK to
// initiate a session. In order to make this work, the following scopes are
// required by the SDK to properly connect. See the GitHub issue for more
// information: https://github.com/spotify/web-playback-sdk/issues/11
const REQUIRED_STREAMING_SCOPES = ['streaming', 'user-read-private'] as const;

export const OAUTH_SCOPES = [
  ...REQUIRED_STREAMING_SCOPES,
  'user-follow-modify',
  'user-follow-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'user-modify-playback-state',
  'user-read-email',
  'user-read-currently-playing',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played',
] as const;
