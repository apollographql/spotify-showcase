export const AUTH_TOKEN_KEY = 'authToken';
export const DEFAULT_BACKGROUND_COLOR = 'var(--background--base)';
export const LOGIN_URL = `${import.meta.env.VITE_SERVER_HOST}/oauth/init`;

export const NOTIFICATION = {
  ADDED_TO_QUEUE: 'Added to queue',
  REMOVED_SAVED_TRACK: 'Removed from your Liked Songs',
  SAVED_TRACK: 'Added to your Liked Songs',
} as const;
