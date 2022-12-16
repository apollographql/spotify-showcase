import { ReleaseDateResolvers } from './types';
import { prop } from './helpers';

const resolvers: ReleaseDateResolvers = {
  date: prop('release_date'),
  precision: prop('release_date_precision'),
};

export default resolvers;
