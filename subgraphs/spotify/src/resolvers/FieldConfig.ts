import { FieldConfigResolvers } from '../__generated__/resolvers-types';
import { itself } from './helpers';

export const FieldConfig: FieldConfigResolvers = {
  timeout: (fieldConfig) => fieldConfig.config.timeout,
  errorRate: (fieldConfig) => fieldConfig.config.errorRate,
  schemaField: itself(),
};
