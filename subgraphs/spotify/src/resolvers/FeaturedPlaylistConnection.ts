import { FeaturedPlaylistConnectionResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const FeaturedPlaylistConnection: FeaturedPlaylistConnectionResolvers = {
  edges: (featuredPlaylists) => featuredPlaylists.playlists.items,
  pageInfo: prop('playlists'),
};
