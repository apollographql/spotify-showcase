import { PlaylistConnectionResolvers } from './types';
import { prop, itself } from './helpers';

const resolvers: PlaylistConnectionResolvers = {
  nodes: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
