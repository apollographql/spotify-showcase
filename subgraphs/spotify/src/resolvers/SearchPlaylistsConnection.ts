import { SearchPlaylistsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SearchPlaylistsConnection: SearchPlaylistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
