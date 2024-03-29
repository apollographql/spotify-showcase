import { SpotifyDataSource } from 'spotify-api';
import { from, interval, switchMap } from 'rxjs';

export const createPlaybackStateObservable = (spotify: SpotifyDataSource) => {
  return interval(1000).pipe(
    switchMap(() =>
      from(
        spotify.getPlaybackState({
          additional_types: 'episode,track',
        })
      )
    )
  );
};
