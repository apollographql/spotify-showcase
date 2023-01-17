import { SavedTracksConnectionResolvers } from './types';
import { prop, itself } from './helpers';

const resolvers: SavedTracksConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
