import { getFieldConfigs } from '../fieldConfigs';
import { DeveloperResolvers } from './types';

const resolvers: DeveloperResolvers = {
  fieldConfigs: () => getFieldConfigs(),
};

export default resolvers;
