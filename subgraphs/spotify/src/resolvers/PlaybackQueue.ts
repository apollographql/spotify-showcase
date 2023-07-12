import { PlaybackQueueResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const PlaybackQueue: PlaybackQueueResolvers = {
  currentlyPlaying: prop('currently_playing'),
};
