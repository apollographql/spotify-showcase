import { maybe } from '../utils/common';
import { PlayerResolvers } from './types';

const resolvers: PlayerResolvers = {
  currentlyPlaying: (_, __, { dataSources }) => {
    return dataSources.spotify.getCurrentlyPlaying();
  },
  devices: async (_, __, { dataSources }) => {
    const { devices } = await dataSources.spotify.getDevices();

    return devices;
  },
  queue: (_, __, { dataSources }) => {
    return dataSources.spotify.getPlaybackQueue();
  },
  playbackState: (_, __, { dataSources }) => {
    return dataSources.spotify.getPlaybackState({
      additional_types: 'episode,track',
    });
  },
  recentlyPlayed: (_, { after, before, limit }, { dataSources }) => {
    return dataSources.spotify.getRecentlyPlayed({
      after: maybe(after),
      before: maybe(before),
      limit: maybe(limit),
    });
  },
};

export default resolvers;
