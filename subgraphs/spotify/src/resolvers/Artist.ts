import { ArtistResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const Artist: ArtistResolvers = {
  albums: (artist, { includeGroups, limit, offset }, { dataSources }) => {
    return dataSources.spotify.getArtistAlbums(artist.id, {
      limit: limit ?? undefined,
      offset: offset ?? undefined,
      include_groups: includeGroups ? includeGroups.join(',') : undefined,
    });
  },
  externalUrls: prop('external_urls'),
  relatedArtists: async (artist, _, { dataSources }) => {
    const { artists } = await dataSources.spotify.getArtistRelatedArtists(
      artist.id
    );

    return artists;
  },
  topTracks: async (artist, _, { dataSources, defaultCountryCode }) => {
    const { tracks } = await dataSources.spotify.getArtistTopTracks(artist.id, {
      market: defaultCountryCode,
    });

    return tracks;
  },
  __resolveReference: (artist, { dataSources }) => {
    return dataSources.spotify.getArtist(artist.id);
  },
};
