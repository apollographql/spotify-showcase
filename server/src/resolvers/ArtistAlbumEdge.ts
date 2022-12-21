import { ArtistAlbumEdgeResolvers } from './types';
import { itself } from './helpers';

const resolvers: ArtistAlbumEdgeResolvers = {
  node: itself(),
};

export default resolvers;
