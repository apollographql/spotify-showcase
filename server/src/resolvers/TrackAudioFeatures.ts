import { prop } from './helpers';
import { TrackAudioFeaturesResolvers } from './types';

const resolvers: TrackAudioFeaturesResolvers = {
  analysisUrl: prop('analysis_url'),
  durationMs: prop('duration_ms'),
  timeSignature: prop('time_signature'),
  trackHref: prop('track_href'),
};

export default resolvers;
