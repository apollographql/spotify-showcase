import { itself, prop } from './helpers';
import { TopArtistsConnectionResolvers } from './types';

const resolvers: TopArtistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
