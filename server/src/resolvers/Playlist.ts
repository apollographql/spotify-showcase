import { PlaylistResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistResolvers = {
  externalUrls: prop('external_urls'),
  tracks: (playlist, { limit, offset }, { dataSources }) => {
    if (limit == null && offset == null) {
      return playlist.tracks;
    }

    if (limit === playlist.tracks.limit && offset === playlist.tracks.offset) {
      return playlist.tracks;
    }

    if (limit == null && offset === playlist.tracks.offset) {
      return playlist.tracks;
    }

    if (offset == null && limit === playlist.tracks.limit) {
      return playlist.tracks;
    }

    return dataSources.spotify.playlistTracks(playlist.id, { limit, offset });
  },
};

export default resolvers;
