import { prop } from './helpers';
import { PlaybackContextResolvers } from './types';

const resolvers: PlaybackContextResolvers = {
  externalUrls: prop('external_urls'),
};

export default resolvers;
