import { FeaturedPlaylistConnectionResolvers } from './types';
import { prop } from './helpers';

const resolvers: FeaturedPlaylistConnectionResolvers = {
  edges: (featuredPlaylists) => featuredPlaylists.playlists.items,
  pageInfo: prop('playlists'),
};

export default resolvers;
