import { FollowedArtistEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: FollowedArtistEdgeResolvers = {
  node: itself(),
};

export default resolvers;
