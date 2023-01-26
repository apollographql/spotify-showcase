import { SearchShowEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: SearchShowEdgeResolvers = {
  node: itself(),
};

export default resolvers;
