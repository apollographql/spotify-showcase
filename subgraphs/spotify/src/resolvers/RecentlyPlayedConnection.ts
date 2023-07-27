import { prop } from './helpers';
import { RecentlyPlayedConnectionResolvers } from '../__generated__/resolvers-types';

export const RecentlyPlayedConnection: RecentlyPlayedConnectionResolvers = {
  edges: prop('items'),
};
