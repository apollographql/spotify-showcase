import { parseISO } from 'date-fns';
import { SavedTrackEdgeResolvers } from './types';
import { prop } from './helpers';

const resolvers: SavedTrackEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('track'),
};

export default resolvers;
