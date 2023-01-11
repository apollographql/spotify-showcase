import { CurrentlyPlayingResolvers } from './types';
import { prop } from './helpers';

const resolvers: CurrentlyPlayingResolvers = {
  isPlaying: prop('is_playing'),
  progressMs: prop('progress_ms'),
};

export default resolvers;
