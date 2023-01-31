import { itself, prop } from './helpers';
import { TopTracksConnectionResolvers } from './types';

const resolvers: TopTracksConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
