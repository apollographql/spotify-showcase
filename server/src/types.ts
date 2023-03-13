import { SessionData } from 'express-session';
import { PubSub } from 'graphql-subscriptions';
import SpotifyAPI from './dataSources/spotify';
import Publisher from './publisher';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyAPI;
  };
  pubsub: PubSub;
  publisher: Publisher;
  token: string;
  session: SessionData | undefined;
}
