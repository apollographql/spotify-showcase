import { ArtistAlbumsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const ArtistAlbumsConnection: ArtistAlbumsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
