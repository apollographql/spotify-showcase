import { SearchEpisodesConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: SearchEpisodesConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
