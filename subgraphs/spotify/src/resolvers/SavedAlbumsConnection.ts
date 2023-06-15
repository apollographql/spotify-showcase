import { SavedAlbumsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SavedAlbumsConnection: SavedAlbumsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
