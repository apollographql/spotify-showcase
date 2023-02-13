import { SavedAlbumsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SavedAlbumsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
