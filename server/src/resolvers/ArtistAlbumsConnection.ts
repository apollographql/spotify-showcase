import { ArtistAlbumsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: ArtistAlbumsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
