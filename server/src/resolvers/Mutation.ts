import { MutationResolvers } from './types';
import { identify, updateFieldConfig, resetFieldConfig } from '../fieldConfigs';
import { GraphQLError } from 'graphql';
import { maybe, maybeDeep } from '../utils/common';
import SpotifyAPI from '../dataSources/spotify';
import Publisher from '../publisher';

const refreshPlaybackState = async (
  spotify: SpotifyAPI,
  publisher: Publisher
) => {
  const playbackState = await spotify.getPlaybackState({
    additional_types: 'episode,track',
  });

  publisher.playbackStateChanged({ playbackState });

  return playbackState;
};

const resolvers: MutationResolvers = {
  addItemToPlaybackQueue: async (_, { uri, context }, { dataSources }) => {
    await dataSources.spotify.addItemToPlaybackQueue({
      params: { uri, device_id: maybe(context?.deviceId) },
    });

    const queue = await dataSources.spotify.getPlaybackQueue();

    return { queue };
  },
  resumePlayback: async (_, { context }, { dataSources, publisher }) => {
    await dataSources.spotify.resumePlayback({
      body: {
        context_uri: maybe(context?.contextUri),
        offset: maybeDeep(context?.offset),
        position_ms: maybe(context?.positionMs),
        uris: maybe(context?.uris),
      },
      params: { device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
  pausePlayback: async (_, { context }, { dataSources, publisher }) => {
    await dataSources.spotify.pausePlayback({
      params: {
        device_id: maybe(context?.deviceId),
      },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
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
  saveAlbums: async (_, { ids }, { dataSources }) => {
    await dataSources.spotify.saveAlbumsToLibrary({
      params: { ids: ids.join(',') },
    });
    const { albums } = await dataSources.spotify.getAlbums({
      ids: ids.join(','),
    });

    return { savedAlbums: albums };
  },
  saveTracks: async (_, { ids }, { dataSources }) => {
    await dataSources.spotify.saveTracksToLibrary({
      params: { ids: ids.join(',') },
    });
    const { tracks } = await dataSources.spotify.getTracks({
      ids: ids.join(','),
    });

    return { savedTracks: tracks };
  },
  seekToPosition: async (
    _,
    { positionMs, context },
    { dataSources, publisher }
  ) => {
    await dataSources.spotify.seekToPosition({
      params: { position_ms: positionMs, device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
  setRepeatMode: async (_, { state, context }, { dataSources, publisher }) => {
    await dataSources.spotify.setRepeatMode({
      params: {
        state,
        device_id: maybe(context?.deviceId),
      },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
  setVolume: async (
    _,
    { volumePercent, context },
    { dataSources, publisher }
  ) => {
    await dataSources.spotify.setVolume({
      params: {
        volume_percent: volumePercent,
        device_id: maybe(context?.deviceId),
      },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
  shufflePlayback: async (
    _,
    { state, context },
    { dataSources, publisher }
  ) => {
    await dataSources.spotify.shufflePlayback({
      params: { state, device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
  skipToNext: async (_, { context }, { dataSources, publisher }) => {
    await dataSources.spotify.skipToNext({
      params: { device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
  skipToPrevious: async (_, { context }, { dataSources, publisher }) => {
    await dataSources.spotify.skipToPrevious({
      params: { device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
};

export default resolvers;
