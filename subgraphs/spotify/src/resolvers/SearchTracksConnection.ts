import { SearchTracksConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SearchTracksConnection: SearchTracksConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
