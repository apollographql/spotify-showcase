import { MutationResolvers } from './types';
import { identify, updateFieldConfig, resetFieldConfig } from '../fieldConfigs';
import { GraphQLError } from 'graphql';

const resolvers: MutationResolvers = {
  updateFieldConfig: (_, { field, config }) => {
    if (!field.schema) {
      throw new GraphQLError('You must provide field.schema');
    }

    const fieldConfig = updateFieldConfig(
      identify.fromSchemaField(field.schema),
      config
    );

    return { fieldConfig };
  },
  resetFieldConfig: (_, { field }) => {
    if (!field.schema) {
      throw new GraphQLError('You must provide field.schema');
    }

    const fieldConfig = resetFieldConfig(
      identify.fromSchemaField(field.schema)
    );

    return { fieldConfig };
  },
};

export default resolvers;
