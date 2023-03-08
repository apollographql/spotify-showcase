import { PubSub } from 'graphql-subscriptions';
import { TOPICS } from './constants';
import { Spotify } from './dataSources/spotify.types';

export default class Publisher {
  private pubsub: PubSub;

  constructor(pubsub: PubSub) {
    this.pubsub = pubsub;
  }

  disconnect() {
    this.pubsub.publish(TOPICS.DISCONNECT, true);
  }

  playbackStateChanged({
    playbackState,
  }: {
    playbackState: Spotify.Object.PlaybackState | null;
  }) {
    this.pubsub.publish(TOPICS.PLAYBACK_STATE_CHANGED, {
      data: {
        playbackStateChanged: playbackState,
      },
    });
  }

  playbackStateError(error: Error) {
    this.pubsub.publish(TOPICS.PLAYBACK_STATE_CHANGED, { error });
  }
}
