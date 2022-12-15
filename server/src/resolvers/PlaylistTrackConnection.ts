import { PlaylistTrackConnectionResolvers } from './types';
import { prop, itself } from './helpers';

const resolvers: PlaylistTrackConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
