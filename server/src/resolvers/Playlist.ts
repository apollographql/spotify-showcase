import { PlaylistResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistResolvers = {
  externalUrls: prop('external_urls'),
  tracks: (playlist, { limit, offset }, { dataSources }) => {
    return dataSources.spotify.playlistTracks(playlist.id, { limit, offset });
  },
};

export default resolvers;
