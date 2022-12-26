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
  relatedArtists: async (artist, _, { dataSources }) => {
    const { artists } = await dataSources.spotify.artistRelatedArtists(
      artist.id
    );

    return artists;
  },
  topTracks: async (artist, _, { dataSources, defaultCountryCode }) => {
    const { tracks } = await dataSources.spotify.artistTopTracks(artist.id, {
      market: defaultCountryCode,
    });

    return tracks;
  },
};

export default resolvers;
