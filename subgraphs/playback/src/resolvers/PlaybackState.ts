import { PlaybackStateResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const PlaybackState: PlaybackStateResolvers = {
  isPlaying: prop('is_playing'),
  progressMs: prop('progress_ms'),
  repeatState: prop('repeat_state'),
  shuffleState: prop('shuffle_state'),
};
