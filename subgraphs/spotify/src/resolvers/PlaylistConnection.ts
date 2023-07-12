import { PlaylistConnectionResolvers } from '../__generated__/resolvers-types';
import { prop, itself } from './helpers';

export const PlaylistConnection: PlaylistConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
