import { itself, prop } from './helpers';
import { AlbumTrackConnectionResolvers } from '../__generated__/resolvers-types';

export const AlbumTrackConnection: AlbumTrackConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
