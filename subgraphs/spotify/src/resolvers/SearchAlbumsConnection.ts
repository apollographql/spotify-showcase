import { SearchAlbumsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SearchAlbumsConnection: SearchAlbumsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
