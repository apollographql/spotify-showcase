import { SavedShowEdgeResolvers } from './types';
import { prop } from './helpers';
import { parseISO } from 'date-fns';

const resolvers: SavedShowEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('show'),
};

export default resolvers;
