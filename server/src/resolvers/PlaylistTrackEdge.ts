import { PlaylistTrackEdgeResolvers } from './types';
import { prop } from './helpers';
import { parseISO } from 'date-fns';

const resolvers: PlaylistTrackEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  addedBy: prop('added_by'),
  node: prop('track'),
};

export default resolvers;
