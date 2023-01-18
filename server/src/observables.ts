import SpotifyAPI from './dataSources/spotify';
import { from, interval, switchMap } from 'rxjs';

export const createPlaybackStateObservable = (spotify: SpotifyAPI) => {
  return interval(1000).pipe(
    switchMap(() =>
      from(spotify.getPlaybackState({ additional_types: 'episode,track' }))
    )
  );
};
