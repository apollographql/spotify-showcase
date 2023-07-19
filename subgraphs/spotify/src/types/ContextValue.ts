import { SpotifyDataSource } from '../dataSources/spotify';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyDataSource;
  };
}
