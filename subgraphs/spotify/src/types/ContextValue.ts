import { SpotifyDataSource } from 'spotify-api';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyDataSource;
  };
}
