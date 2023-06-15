import { SavedShowEdgeResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';
import { parseISO } from 'date-fns';

export const SavedShowEdge: SavedShowEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('show'),
};
