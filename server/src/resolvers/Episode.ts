import { EpisodeResolvers } from './types';
import { prop } from './helpers';

const resolvers: EpisodeResolvers = {
  audioPreviewUrl: prop('audio_preview_url'),
  description: ({ description, html_description }, { format }) => {
    return format === 'HTML' ? html_description : description;
  },
  durationMs: prop('duration_ms'),
  externalUrls: prop('external_urls'),
  isExternallyHosted: prop('is_externally_hosted'),
  isPlayable: prop('is_playable'),
};

export default resolvers;
