import { parseISO } from 'date-fns';
import { prop } from './helpers';
import { SavedEpisodeEdgeResolvers } from '../__generated__/resolvers-types';

export const SavedEpisodeEdge: SavedEpisodeEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('episode'),
};
