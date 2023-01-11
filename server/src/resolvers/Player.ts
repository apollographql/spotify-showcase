import { PlayerResolvers } from './types';

const resolvers: PlayerResolvers = {
  playbackState: (_, __, { dataSources }) => {
    return dataSources.spotify.getPlaybackState({
      additional_types: 'episode,track',
    });
  },
};

export default resolvers;
