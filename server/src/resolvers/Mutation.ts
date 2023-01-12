import { MutationResolvers } from './types';
import { identify, updateFieldConfig, resetFieldConfig } from '../fieldConfigs';
import { GraphQLError } from 'graphql';
import { maybe, maybeDeep } from '../utils/common';

const resolvers: MutationResolvers = {
  resumePlayback: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.resumePlayback({
      body: {
        context_uri: maybe(context?.contextUri),
        offset: maybeDeep(context?.offset),
        position_ms: maybe(context?.positionMs),
        uris: maybe(context?.uris),
      },
      params: { device_id: maybe(context?.deviceId) },
    });

    return { playbackState: null };
  },
  pausePlayback: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.pausePlayback({
      params: {
        device_id: maybe(context?.deviceId),
      },
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
  seekToPosition: async (_, { positionMs, context }, { dataSources }) => {
    await dataSources.spotify.seekToPosition({
      params: { position_ms: positionMs, device_id: maybe(context?.deviceId) },
    });

    return { playbackState: null };
  },
  setVolume: async (_, { volumePercent, context }, { dataSources }) => {
    await dataSources.spotify.setVolume({
      params: {
        volume_percent: volumePercent,
        device_id: maybe(context?.deviceId),
      },
    });

    return { playbackState: null };
  },
  skipToNext: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.skipToNext({
      params: { device_id: maybe(context?.deviceId) },
    });

    return { playbackState: null };
  },
  skipToPrevious: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.skipToPrevious({
      params: { device_id: maybe(context?.deviceId) },
    });

    return { playbackState: null };
  },
};

export default resolvers;
