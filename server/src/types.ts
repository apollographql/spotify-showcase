import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { Spotify } from './dataSources/spotify.types';
import SpotifyAPI from './dataSources/spotify';
import Publisher from './publisher';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyAPI;
  };
  playbackState$: Observable<Spotify.Object.PlaybackState | null>;
  pubsub: PubSub;
  publisher: Publisher;
  token: string;
}
