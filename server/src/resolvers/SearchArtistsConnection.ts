import { SearchArtistsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SearchArtistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
