import { SearchArtistsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SearchArtistsConnection: SearchArtistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
