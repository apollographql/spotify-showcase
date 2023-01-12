import { MutationResolvers } from './types';
import { identify, updateFieldConfig, resetFieldConfig } from '../fieldConfigs';
import { GraphQLError } from 'graphql';

const resolvers: MutationResolvers = {
  pausePlayback: async (_, { deviceId }, { dataSources }) => {
    await dataSources.spotify.pausePlayback({
      device_id: deviceId ?? undefined,
    });

    return { playbackState: null };
  },
  updateFieldConfig: (_, { field, config }) => {
    if (!field.schemaField) {
      throw new GraphQLError('You must provide field.schemaField');
    }

    const fieldConfig = updateFieldConfig(
      identify.fromSchemaField(field.schemaField),
      config
    );

    return { fieldConfig };
  },
  resetFieldConfig: (_, { field }) => {
    if (!field.schemaField) {
      throw new GraphQLError('You must provide field.schemaField');
    }

    const fieldConfig = resetFieldConfig(
      identify.fromSchemaField(field.schemaField)
    );

    return { fieldConfig };
  },
};

export default resolvers;
