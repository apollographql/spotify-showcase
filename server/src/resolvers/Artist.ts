import { ArtistResolvers } from './types';
import { prop } from './helpers';

const resolvers: ArtistResolvers = {
  albums: (artist, { includeGroups, limit, offset }, { dataSources }) => {
    return dataSources.spotify.artistAlbums(artist.id, {
      limit,
      offset,
      include_groups: includeGroups ? includeGroups.join(',') : null,
    });
  },
  externalUrls: prop('external_urls'),
  topTracks: async (artist, _, { dataSources }) => {
    const { tracks } = await dataSources.spotify.artistTopTracks(artist.id);

    return tracks;
  },
};

export default resolvers;
