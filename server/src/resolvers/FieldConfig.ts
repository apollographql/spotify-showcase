import { FieldConfigResolvers } from './types';
import { itself } from './helpers';

const resolvers: FieldConfigResolvers = {
  timeout: (fieldConfig) => fieldConfig.config.timeout,
  errorRate: (fieldConfig) => fieldConfig.config.errorRate,
  schemaField: itself(),
};

export default resolvers;
