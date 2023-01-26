import { SearchAlbumsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SearchAlbumsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
