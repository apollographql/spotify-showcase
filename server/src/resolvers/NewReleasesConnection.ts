import { NewReleasesConnectionResolvers } from './types';

const resolvers: NewReleasesConnectionResolvers = {
  edges: (newReleases) => newReleases.albums.items,
  pageInfo: (newReleases) => newReleases.albums,
};

export default resolvers;
