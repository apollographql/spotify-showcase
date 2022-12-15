import { PlaylistTrackEdgeResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistTrackEdgeResolvers = {
  node: prop('track'),
};

export default resolvers;
