import { prop } from './helpers';
import { RecentlyPlayedConnectionResolvers } from './types';

const resolvers: RecentlyPlayedConnectionResolvers = {
  edges: prop('items'),
};

export default resolvers;
