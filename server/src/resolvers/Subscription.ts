import { SubscriptionResolvers } from './types';
import { pollPlaybackState } from '../utils/spotify';
import { TOPICS } from '../constants';

const resolvers: SubscriptionResolvers = {
  playbackStateChanged: {
    subscribe: async (_, __, { pubsub, dataSources }) => {
      const subscription = pollPlaybackState(dataSources.spotify).subscribe(
        (playbackState) => {
          pubsub.publish(TOPICS.PLAYBACK_STATE_CHANGED, {
            playbackStateChanged: { playbackState },
          });
        }
      );

      pubsub.subscribe(TOPICS.DISCONNECT, () => {
        subscription.unsubscribe();
      });

      return pubsub.asyncIterator(TOPICS.PLAYBACK_STATE_CHANGED) as any;
    },
  },
};

export default resolvers;
