import { EpisodeResolvers } from '../__generated__/resolvers-types';
import { prop, itself } from './helpers';

export const Episode: EpisodeResolvers = {
  audioPreviewUrl: prop('audio_preview_url'),
  description: ({ description, html_description }, { format }) => {
    return format === 'HTML' ? html_description : description;
  },
  durationMs: prop('duration_ms'),
  externalUrls: prop('external_urls'),
  isExternallyHosted: prop('is_externally_hosted'),
  isPlayable: prop('is_playable'),
  releaseDate: itself(),
  resumePoint: prop('resume_point'),
  __resolveReference: (episode, { dataSources }) => {
    return dataSources.spotify.getEpisode(episode.id);
  },
};
