import { SearchTrackEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: SearchTrackEdgeResolvers = {
  node: itself(),
};

export default resolvers;
