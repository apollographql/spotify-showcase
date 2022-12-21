import { TrackResolvers } from './types';
import { prop } from './helpers';

const resolvers: TrackResolvers = {
  album: async (track, _, { dataSources }) => {
    if ('album' in track) {
      return track.album;
    }

    const { album } = await dataSources.spotify.track(track.id);

    return album;
  },
  discNumber: prop('disc_number'),
  durationMs: prop('duration_ms'),
  externalUrls: prop('external_urls'),
  externalIds: (track) => ('external_ids' in track ? track.external_ids : null),
  isLocal: prop('is_local'),
  isPlayable: ({ is_playable }) =>
    is_playable === undefined ? true : is_playable,
  previewUrl: prop('preview_url'),
  trackNumber: prop('track_number'),
};

export default resolvers;
