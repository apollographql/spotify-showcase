import { parseISO } from 'date-fns';
import { prop } from './helpers';
import { SavedAlbumEdgeResolvers } from './types';

const resolvers: SavedAlbumEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  node: prop('album'),
};

export default resolvers;
