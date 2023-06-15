import { SavedEpisodesConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const SavedEpisodesConnection: SavedEpisodesConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
