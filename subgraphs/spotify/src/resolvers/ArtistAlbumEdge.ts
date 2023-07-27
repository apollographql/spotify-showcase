import { ArtistAlbumEdgeResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const ArtistAlbumEdge: ArtistAlbumEdgeResolvers = {
  // TODO: Remove this field since it is not available in the API. Temporarily
  // point to album type
  albumGroup: prop('album_type'),
  node: itself(),
};
