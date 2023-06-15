import { FollowedArtistsConnectionResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const FollowedArtistsConnection: FollowedArtistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};
