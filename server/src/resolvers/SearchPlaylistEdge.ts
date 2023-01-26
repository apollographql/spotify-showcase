import { SearchPlaylistEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: SearchPlaylistEdgeResolvers = {
  node: itself(),
};

export default resolvers;
