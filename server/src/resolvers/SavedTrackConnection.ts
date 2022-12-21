import { SavedTrackConnectionResolvers } from './types';
import { prop, itself } from './helpers';

const resolvers: SavedTrackConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
