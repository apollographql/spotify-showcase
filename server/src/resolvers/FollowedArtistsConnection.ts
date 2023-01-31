import { FollowedArtistsConnectionResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: FollowedArtistsConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
