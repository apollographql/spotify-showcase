import { AlbumTrackEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: AlbumTrackEdgeResolvers = {
  node: itself(),
};

export default resolvers;
