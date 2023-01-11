import { DeviceResolvers } from './types';
import { prop } from './helpers';

const resolvers: DeviceResolvers = {
  isActive: prop('is_active'),
  isPrivateSession: prop('is_private_session'),
  isRestricted: prop('is_restricted'),
  volumePercent: prop('volume_percent'),
};

export default resolvers;
