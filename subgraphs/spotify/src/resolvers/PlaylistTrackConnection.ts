import { PlaylistTrackConnectionResolvers } from '../__generated__/resolvers-types';
import { prop, itself } from './helpers';

export const PlaylistTrackConnection: PlaylistTrackConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
