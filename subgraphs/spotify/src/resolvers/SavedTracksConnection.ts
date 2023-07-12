import { SavedTracksConnectionResolvers } from '../__generated__/resolvers-types';
import { prop, itself } from './helpers';

export const SavedTracksConnection: SavedTracksConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
