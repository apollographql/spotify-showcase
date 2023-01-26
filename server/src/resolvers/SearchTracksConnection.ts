import { SearchTracksConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SearchTracksConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
