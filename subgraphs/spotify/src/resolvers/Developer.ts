import { getFieldConfigs } from '../fieldConfigs';
import { DeveloperResolvers } from '../__generated__/resolvers-types';

export const Developer: DeveloperResolvers = {
  fieldConfigs: () => getFieldConfigs(),
};