import { SearchArtistEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: SearchArtistEdgeResolvers = {
  node: itself(),
};

export default resolvers;
