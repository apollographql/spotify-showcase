import { SpotifyDataSource } from './dataSources/spotify';
import { from, interval, switchMap } from 'rxjs';
import { ContextValue } from './types/ContextValue';

export const createPlaybackStateObservable = (context: ContextValue) => {
  return interval(1000).pipe(
    switchMap(() =>
      from(
        context.dataSources.spotify.getPlaybackState(
          {
            additional_types: 'episode,track',
          },
          //This is for mocking responses if user doesn't have Spotify token
          context.userIdForMocks
        )
      )
    )
  );
};
