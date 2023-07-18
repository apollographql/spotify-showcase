import SpotifyAPI, { SpotifyDataSource } from '../dataSources/spotify';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyDataSource;
  };
  userIdForMocks?: string; //This will only be used if the `authorization` header isn't present
}
