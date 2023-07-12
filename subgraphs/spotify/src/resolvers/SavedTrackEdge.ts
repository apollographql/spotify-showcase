import { parseISO } from 'date-fns';
import { SavedTrackEdgeResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const SavedTrackEdge: SavedTrackEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('track'),
};
