import { PlaylistResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistResolvers = {
  externalUrls: prop('external_urls'),
};

export default resolvers;
