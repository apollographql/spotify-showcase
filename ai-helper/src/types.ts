/**
 * Represents a single suggested track returned by the AI workflow.
 * This is the standardized structure expected by the frontend.
 */
export interface SuggestedSong {
  /** Spotify track ID (or empty string if not available) */
  id: string;

  /** Track title */
  name: string;

  /** Artist name */
  artist: string;
}