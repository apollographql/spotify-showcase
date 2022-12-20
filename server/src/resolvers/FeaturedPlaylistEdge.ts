import { FeaturedPlaylistEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: FeaturedPlaylistEdgeResolvers = {
  node: itself(),
};

export default resolvers;
