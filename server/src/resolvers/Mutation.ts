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
  addItemToPlaybackQueue: async (_, { input }, { dataSources }) => {
    await dataSources.spotify.addItemToPlaybackQueue({
      params: { uri: input.uri, device_id: maybe(input.deviceId) },
    });

    const playbackQueue = await dataSources.spotify.getPlaybackQueue();

    return { playbackQueue };
  },
  addItemsToPlaylist: async (_, { input }, { dataSources }) => {
    await dataSources.spotify.addItemsToPlaylist(input.playlistId, {
      params: {},
      body: { uris: input.uris, position: maybe(input.position) },
    });

    const playlist = await dataSources.spotify.getPlaylist(input.playlistId);

    return { playlist };
  },
  resumePlayback: async (_, { input }, { dataSources, publisher }) => {
    await dataSources.spotify.resumePlayback({
      body: {
        context_uri: maybe(input?.contextUri),
        offset: maybeDeep(input?.offset),
        position_ms: maybe(input?.positionMs),
        uris: maybe(input?.uris),
      },
      params: { device_id: maybe(input?.deviceId) },
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
  removeItemFromPlaylist: async (_, { input }, { dataSources }) => {
    const { snapshot_id } = await dataSources.spotify.removeItemFromPlaylist(
      input.playlistId,
      { body: { snapshot_id: maybe(input.snapshotId), tracks: input.tracks } }
    );

    const playlist = await dataSources.spotify.getPlaylist(input.playlistId);

    return { playlist, snapshotId: snapshot_id };
  },
  removeSavedAlbums: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.removeSavedAlbums({ params: { ids } });
    const { albums } = await dataSources.spotify.getAlbums({ ids });

    return { removedAlbums: albums };
  },
  removeSavedTracks: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.removeSavedTracks({ params: { ids } });
    const { tracks } = await dataSources.spotify.getTracks({ ids });

    return { removedTracks: tracks };
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
  saveAlbums: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.saveAlbumsToLibrary({
      params: { ids },
    });

    const { albums } = await dataSources.spotify.getAlbums({ ids });

    return { savedAlbums: albums };
  },
  saveTracks: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.saveTracksToLibrary({
      params: { ids },
    });
    const { tracks } = await dataSources.spotify.getTracks({ ids });

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
  transferPlayback: async (_, { input }, { dataSources, publisher }) => {
    await dataSources.spotify.transferPlayback({
      body: { device_ids: input.deviceIds, play: maybe(input.play) },
    });

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      publisher
    );

    return { playbackState };
  },
};

export default resolvers;
