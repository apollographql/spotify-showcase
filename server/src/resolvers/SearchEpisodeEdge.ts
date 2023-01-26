import { SearchEpisodeEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: SearchEpisodeEdgeResolvers = {
  node: itself(),
};

export default resolvers;
