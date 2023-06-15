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
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played',
] as const;

export const TOPICS = {
  DISCONNECT: 'DISCONNECT',
  PLAYBACK_STATE_CHANGED: 'PLAYBACK_STATE_CHANGED',
} as const;
