import { TrackResolvers } from './types';
import { prop } from './helpers';
import { selectsField } from '../utils/graphql';

const resolvers: TrackResolvers = {
  album: async (track, _, { dataSources }) => {
    if ('album' in track) {
      return track.album;
    }

    const { album } = await dataSources.spotify.track(track.id);

    return album;
  },
  artists: async (track, _, { dataSources }, info) => {
    const shouldLoadFullArtists =
      selectsField(['artists', 'followers'], info) ||
      selectsField(['artists', 'genres'], info) ||
      selectsField(['artists', 'images'], info) ||
      selectsField(['artists', 'popularity'], info);

    if (!shouldLoadFullArtists) {
      return track.artists;
    }

    const { artists } = await dataSources.spotify.getArtists(
      track.artists.map((track) => track.id)
    );

    return artists;
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
