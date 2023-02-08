import { SavedEpisodesConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SavedEpisodesConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
