import { TopArtistEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: TopArtistEdgeResolvers = {
  node: itself(),
};

export default resolvers;
