import SpotifyAPI from './dataSources/spotify';
import { from, interval, map, switchMap, Subject, share } from 'rxjs';

export const createPlaybackStateObservable = (spotify: SpotifyAPI) => {
  return interval(1000).pipe(
    switchMap(() =>
      from(spotify.getPlaybackState({ additional_types: 'episode,track' }))
    ),
    map((result) => result && { ...result, timestamp: Date.now() }),
    share({ connector: () => new Subject() })
  );
};
