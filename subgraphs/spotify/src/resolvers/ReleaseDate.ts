import { ReleaseDateResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const ReleaseDate: ReleaseDateResolvers = {
  date: prop('release_date'),
  precision: prop('release_date_precision'),
};
