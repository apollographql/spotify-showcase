import { SubscriptionResolvers } from './types';
import { pollPlaybackState } from '../utils/spotify';

const resolvers: SubscriptionResolvers = {
  playbackStateChanged: {
    subscribe: async (_, __, { pubsub, dataSources }) => {
      const subscription = pollPlaybackState(dataSources.spotify).subscribe(
        (playbackState) => {
          pubsub.publish('PLAYBACK_STATE_CHANGED', { playbackState });
        }
      );

      pubsub.subscribe('DISCONNECT', () => {
        subscription.unsubscribe();
      });

      return pubsub.asyncIterator('PLAYBACK_STATE_CHANGED') as any;
    },
  },
};

export default resolvers;
