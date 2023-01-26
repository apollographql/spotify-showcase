import { SearchPlaylistsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SearchPlaylistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
