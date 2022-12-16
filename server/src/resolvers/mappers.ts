import { Spotify } from '../dataSources/spotify.types';

export interface Releasable {
  release_date: string;
  release_date_precision: Spotify.Object.ReleaseDatePrecision;
}
