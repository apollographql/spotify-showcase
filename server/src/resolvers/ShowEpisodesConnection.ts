import { ShowEpisodesConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: ShowEpisodesConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
