import SpotifyAPI from '../dataSources/spotify';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyAPI;
  };
}
