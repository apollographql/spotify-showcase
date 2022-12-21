import { ArtistAlbumEdgeResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: ArtistAlbumEdgeResolvers = {
  albumGroup: prop('album_group'),
  node: itself(),
};

export default resolvers;
