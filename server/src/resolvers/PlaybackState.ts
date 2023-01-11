import { PlaybackStateResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaybackStateResolvers = {
  isPlaying: prop('is_playing'),
  progressMs: prop('progress_ms'),
  repeatState: prop('repeat_state'),
  shuffleState: prop('shuffle_state'),
};

export default resolvers;
