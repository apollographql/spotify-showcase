import { PlaybackQueueResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaybackQueueResolvers = {
  currentlyPlaying: prop('currently_playing'),
};

export default resolvers;
