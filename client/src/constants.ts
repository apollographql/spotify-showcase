export const AUTH_TOKEN_KEY = 'authToken';
export const DEFAULT_BACKGROUND_COLOR = 'var(--background--base)';

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
