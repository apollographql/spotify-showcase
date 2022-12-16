import { AlbumResolvers } from './types';
import { itself } from './helpers';

const resolvers: AlbumResolvers = {
  releaseDate: itself(),
};

export default resolvers;
