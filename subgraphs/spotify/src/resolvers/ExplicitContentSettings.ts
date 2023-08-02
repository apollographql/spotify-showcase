import { ExplicitContentSettingsResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const ExplicitContentSettings: ExplicitContentSettingsResolvers = {
  filterEnabled: prop('filter_enabled'),
  filterLocked: prop('filter_locked'),
};
