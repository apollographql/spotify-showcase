import { itself, prop } from './helpers';
import { SavedShowsConnectionResolvers } from './types';

const resolvers: SavedShowsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
