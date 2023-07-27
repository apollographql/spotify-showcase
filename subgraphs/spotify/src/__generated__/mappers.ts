import { Spotify } from 'spotify-api';

export interface Releasable {
  release_date: string;
  release_date_precision: Spotify.Object.ReleaseDatePrecision;
}
