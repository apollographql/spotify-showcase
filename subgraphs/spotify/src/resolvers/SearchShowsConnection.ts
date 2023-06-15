import { SearchShowsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SearchShowsConnection: SearchShowsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
