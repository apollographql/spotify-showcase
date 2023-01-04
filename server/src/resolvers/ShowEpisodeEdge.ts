import { ShowEpisodeEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: ShowEpisodeEdgeResolvers = {
  node: itself(),
};

export default resolvers;
