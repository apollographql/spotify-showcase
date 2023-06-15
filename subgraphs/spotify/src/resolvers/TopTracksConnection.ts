import { itself, prop } from './helpers';
import { TopTracksConnectionResolvers } from '../__generated__/resolvers-types';

export const TopTracksConnection: TopTracksConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
