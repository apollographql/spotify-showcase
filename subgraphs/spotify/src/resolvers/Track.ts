import { TrackResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';
import { Spotify } from '../dataSources/spotify.types';
import { shouldLoadFullArtist } from '../utils/graphql';

export const Track: TrackResolvers = {
  album: async (track, _, { dataSources }) => {
    if ('album' in track) {
      return track.album;
    }

    const { album } = await dataSources.spotify.getTrack(track.id);

    return album;
  },
  artists: async (track, _, { dataSources }, info) => {
    if (shouldLoadFullArtist(['artists'], info)) {
      const { artists } = await dataSources.spotify.getArtists({
        ids: track.artists.map((track) => track.id).join(','),
      });

      return artists;
    }

    return track.artists as Spotify.Object.Artist[];
  },
  audioFeatures: (track, _, { dataSources }) => {
    return dataSources.spotify.getTrackAudioFeatures(track.id);
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
  __resolveReference: (track, { dataSources }) => {
    return dataSources.spotify.getTrack(track.id);
  },
};
