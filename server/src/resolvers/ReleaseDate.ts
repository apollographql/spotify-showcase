import { ReleaseDateResolvers } from './types';
import { prop } from './helpers';

const resolvers: ReleaseDateResolvers = {
  precision: prop('release_date_precision'),
};

export default resolvers;
