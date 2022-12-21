import { AlbumResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: AlbumResolvers = {
  albumType: prop('album_type'),
  releaseDate: itself(),
  totalTracks: prop('total_tracks'),
};

export default resolvers;
