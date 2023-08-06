import { fieldConfigs } from '@shared/field-synthetics';
import { DeveloperResolvers } from '../__generated__/resolvers-types';

export const Developer: DeveloperResolvers = {
  fieldConfigs: () => fieldConfigs.getFieldConfigs(),
};
