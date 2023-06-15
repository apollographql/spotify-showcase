import { itself, prop } from './helpers';
import { TopArtistsConnectionResolvers } from '../__generated__/resolvers-types';

export const TopArtistsConnection: TopArtistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
