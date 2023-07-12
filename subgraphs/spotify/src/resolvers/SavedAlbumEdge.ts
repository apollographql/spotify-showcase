import { parseISO } from 'date-fns';
import { prop } from './helpers';
import { SavedAlbumEdgeResolvers } from '../__generated__/resolvers-types';

export const SavedAlbumEdge: SavedAlbumEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('album'),
};
