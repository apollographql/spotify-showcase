import { DeviceResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const Device: DeviceResolvers = {
  isActive: prop('is_active'),
  isPrivateSession: prop('is_private_session'),
  isRestricted: prop('is_restricted'),
  volumePercent: prop('volume_percent'),
};
