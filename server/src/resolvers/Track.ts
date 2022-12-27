import { TrackResolvers } from './types';
import { prop } from './helpers';
import { Spotify } from '../dataSources/spotify.types';
import { shouldLoadFullArtist } from '../utils/schema';

const resolvers: TrackResolvers = {
  album: async (track, _, { dataSources }) => {
    if ('album' in track) {
      return track.album;
    }

    const { album } = await dataSources.spotify.getTrack(track.id);

    return album;
  },
  artists: async (track, _, { dataSources }, info) => {
    if (shouldLoadFullArtist(['artists'], info)) {
      const { artists } = await dataSources.spotify.getArtists(
        track.artists.map((track) => track.id)
      );

      return artists;
    }

    return track.artists as Spotify.Object.Artist[];
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
