import { prop } from './helpers';
import { TrackAudioFeaturesResolvers } from '../__generated__/resolvers-types';

export const TrackAudioFeatures: TrackAudioFeaturesResolvers = {
  analysisUrl: prop('analysis_url'),
  durationMs: prop('duration_ms'),
  timeSignature: prop('time_signature'),
  trackHref: prop('track_href'),
};
