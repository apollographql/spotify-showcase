import SpotifyAPI from './dataSources/spotify';

export interface ContextValue {
  fieldConfig: {
    timeout: number;
  };
  dataSources: {
    spotify: SpotifyAPI;
  };
}
