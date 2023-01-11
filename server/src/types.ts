import { PubSub } from 'graphql-subscriptions';
import SpotifyAPI from './dataSources/spotify';

export interface ContextValue {
  defaultCountryCode: string;
  dataSources: {
    spotify: SpotifyAPI;
  };
}

export interface SubscriptionContextValue {
  pubsub: PubSub;
  dataSources: {
    spotify: SpotifyAPI;
  };
}
