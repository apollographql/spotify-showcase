import { CurrentlyPlayingResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const CurrentlyPlaying: CurrentlyPlayingResolvers = {
  isPlaying: prop('is_playing'),
  progressMs: prop('progress_ms'),
};
