import { SearchAlbumEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: SearchAlbumEdgeResolvers = {
  node: itself(),
};

export default resolvers;
