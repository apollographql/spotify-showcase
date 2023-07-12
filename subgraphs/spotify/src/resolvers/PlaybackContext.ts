import { prop } from './helpers';
import { PlaybackContextResolvers } from '../__generated__/resolvers-types';

export const PlaybackContext: PlaybackContextResolvers = {
  externalUrls: prop('external_urls'),
};
