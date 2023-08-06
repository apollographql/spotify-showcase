import { MutationResolvers } from '../__generated__/resolvers-types';
import { GraphQLError } from 'graphql';
import { maybe } from '../utils/common';
import { FieldConfig, fieldConfigs } from '@shared/field-synthetics';

export const Mutation: MutationResolvers = {
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
  updateFieldConfig: (_, { input }) => {
    const { field, config } = input;

    if (!field.schemaField) {
      throw new GraphQLError('You must provide field.schemaField');
    }

    const fieldConfig = fieldConfigs.updateFieldConfig(
      fieldConfigs.fromSchemaField(field.schemaField),
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

    await dataSources.spotify.removeSavedAlbums({ body: {}, params: { ids } });
    const { albums } = await dataSources.spotify.getAlbums({ ids });

    return { removedAlbums: albums };
  },
  removeSavedEpisodes: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');
    await dataSources.spotify.removeSavedEpisodes({
      body: {},
      params: { ids },
    });
    const { episodes } = await dataSources.spotify.getEpisodes({ ids });

    return { removedEpisodes: episodes };
  },
  removeSavedShows: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');
    await dataSources.spotify.removeSavedShows({
      params: { ids },
    });
    const { shows } = await dataSources.spotify.getShows({ ids });

    return { removedShows: shows };
  },
  removeSavedTracks: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.removeSavedTracks({ body: {}, params: { ids } });
    const { tracks } = await dataSources.spotify.getTracks({ ids });

    return { removedTracks: tracks };
  },
  resetFieldConfig: (_, { input }) => {
    const { field } = input;

    if (!field.schemaField) {
      throw new GraphQLError('You must provide field.schemaField');
    }

    const id = fieldConfigs.fromSchemaField(field.schemaField);
    fieldConfigs.resetFieldConfig(id);

    return { fieldConfig: new FieldConfig(id) };
  },
  saveAlbums: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.saveAlbumsToLibrary({
      body: {},
      params: { ids },
    });

    const { albums } = await dataSources.spotify.getAlbums({ ids });

    return { savedAlbums: albums };
  },
  saveEpisodes: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.saveEpisodesToLibrary({
      body: {},
      params: { ids },
    });

    const { episodes } = await dataSources.spotify.getEpisodes({ ids });

    return { savedEpisodes: episodes };
  },
  saveShows: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.saveShowsToLibrary({
      params: { ids },
    });

    const { shows } = await dataSources.spotify.getShows({ ids });

    return { savedShows: shows };
  },
  saveTracks: async (_, { input }, { dataSources }) => {
    const ids = input.ids.join(',');

    await dataSources.spotify.saveTracksToLibrary({
      params: { ids },
    });
    const { tracks } = await dataSources.spotify.getTracks({ ids });

    return { savedTracks: tracks };
  },
};
