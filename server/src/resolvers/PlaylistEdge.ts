import { PlaylistEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: PlaylistEdgeResolvers = {
  node: itself(),
};

export default resolvers;
