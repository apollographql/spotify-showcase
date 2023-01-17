import { maybe } from '../utils/common';
import { SaveTracksResponseResolvers } from './types';

const resolvers: SaveTracksResponseResolvers = {
  savedTracks: (_, { limit, offset }, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTracks({
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
};

export default resolvers;
