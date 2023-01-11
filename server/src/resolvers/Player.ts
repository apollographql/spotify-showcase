import { PlayerResolvers } from './types';

const resolvers: PlayerResolvers = {
  currentlyPlaying: (_, __, { dataSources }) => {
    return dataSources.spotify.getCurrentlyPlaying();
  },
  devices: async (_, __, { dataSources }) => {
    const { devices } = await dataSources.spotify.getDevices();

    return devices;
  },
  playbackState: (_, __, { dataSources }) => {
    return dataSources.spotify.getPlaybackState({
      additional_types: 'episode,track',
    });
  },
};

export default resolvers;
