import { ArtistResolvers } from './types';
import { prop } from './helpers';

const resolvers: ArtistResolvers = {
  externalUrls: prop('external_urls'),
  topTracks: async (artist, _, { dataSources }) => {
    const { tracks } = await dataSources.spotify.artistTopTracks(artist.id);

    return tracks;
  },
};

export default resolvers;
