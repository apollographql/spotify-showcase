import { maybe } from '../utils/common';
import { SaveAlbumsResponseResolvers } from './types';

const resolvers: SaveAlbumsResponseResolvers = {
  savedAlbums: (_, { limit, offset }, { dataSources }) => {
    return dataSources.spotify.getCurrentUserAlbums({
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
};

export default resolvers;
