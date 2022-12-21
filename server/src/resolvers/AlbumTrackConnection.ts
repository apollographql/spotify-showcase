import { itself, prop } from './helpers';
import { AlbumTrackConnectionResolvers } from './types';

const resolvers: AlbumTrackConnectionResolvers = {
  edges: prop('items'),
  pageInfo: itself(),
};

export default resolvers;
