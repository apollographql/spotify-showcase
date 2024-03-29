export const AUTH_TOKEN_KEY = 'authToken';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  CODE_VERIFIER: 'codeVerifier',
  EXPIRES_AT: 'expiresAt',
  REFRESH_TOKEN: 'refreshToken',
  STATE: 'state',
  PERSISTED_QUERY_MODE: 'persistedQueryMode',
  HIGHLIGHT_SUSPENSE_BOUNDARIES: 'highlightSuspenseBoundaries',
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

export const NOT_IMPLEMENTED_ROUTES = ['/users/:id', '/collection/episodes'];

export const OAUTH_SCOPES = [
  'streaming',
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
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played',
] as const;
