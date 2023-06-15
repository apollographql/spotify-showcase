import { NewReleasesConnectionResolvers } from '../__generated__/resolvers-types';

export const NewReleasesConnection: NewReleasesConnectionResolvers = {
  edges: (newReleases) => newReleases.albums.items,
  pageInfo: (newReleases) => newReleases.albums,
};
