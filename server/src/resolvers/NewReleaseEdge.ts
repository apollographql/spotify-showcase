import { NewReleaseEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: NewReleaseEdgeResolvers = {
  node: itself(),
};

export default resolvers;
