import { ArtistAlbumEdgeResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const ArtistAlbumEdge: ArtistAlbumEdgeResolvers = {
  albumGroup: prop('album_group'),
  node: itself(),
};
