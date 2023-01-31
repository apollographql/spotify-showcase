import { TopTrackEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: TopTrackEdgeResolvers = {
  node: itself(),
};

export default resolvers;
