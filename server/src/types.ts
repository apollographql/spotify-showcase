import SpotifyAPI from './dataSources/spotify';

export interface ContextValue {
  dataSources: {
    spotify: SpotifyAPI;
  };
}
