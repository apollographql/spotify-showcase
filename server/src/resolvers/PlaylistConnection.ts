import { PlaylistConnectionResolvers } from './types';
import { prop, itself } from './helpers';

const resolvers: PlaylistConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
