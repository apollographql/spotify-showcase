import { itself, prop } from './helpers';
import { SavedShowsConnectionResolvers } from '../__generated__/resolvers-types';

export const SavedShowsConnection: SavedShowsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
