import { PlaylistConnectionResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistConnectionResolvers = {
  nodes: prop('items'),
};

export default resolvers;
