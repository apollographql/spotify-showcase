import { SearchShowsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SearchShowsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
