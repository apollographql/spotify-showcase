import SpotifyAPI from '../dataSources/spotify';
import { from, interval, switchMap } from 'rxjs';

export const parseSpotifyIDFromURI = (spotifyURI: string) => {
  const matches = spotifyURI.match(/^spotify:.*?:(.*)$/);

  if (!matches) {
    throw new Error('Could not parse ID from Spotify URI');
  }

  return matches[1];
};

export const pollPlaybackState = (spotifyAPI: SpotifyAPI) => {
  return interval(1000).pipe(
    switchMap(() => {
      return from(
        spotifyAPI.getPlaybackState({ additional_types: 'episode,track' })
      );
    })
  );
};
