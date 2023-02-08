import { parseISO } from 'date-fns';
import { prop } from './helpers';
import { SavedEpisodeEdgeResolvers } from './types';

const resolvers: SavedEpisodeEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('episode'),
};

export default resolvers;
