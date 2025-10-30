import { MutationResolvers } from '../__generated__/resolvers-types';
import { GraphQLError } from 'graphql';
import { maybe } from '../utils/common';
import { FieldConfig, fieldConfigs } from '@shared/field-synthetics';

export const Mutation: MutationResolvers & Record<string, any> = {
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
  createPlaylist: async (_, { input }, { dataSources }) => {
    // Fetch current user id and create a playlist for them
    const me = await dataSources.spotify.getCurrentUser();

    const spotifyClient = dataSources.spotify as any;

    // Try several possible method names/signatures that different clients/mocks
    // might expose. This prevents a runtime TypeError and provides a clearer
    // error if none are available.
    const candidateFns = [
      'createPlaylist',
      'createUserPlaylist',
      'createPlaylistForUser',
      'createPlaylistForCurrentUser',
      'postCreatePlaylist',
      'postPlaylist',
    ];

    const fnName = candidateFns.find((n) => typeof spotifyClient?.[n] === 'function');

    let created;
    if (fnName) {
      // Se o client tem função, usa ela
      created = await spotifyClient[fnName](me.id, {
        body: {
          name: input.name,
          description: maybe(input.description),
          public: maybe(input.public),
        },
      });
    } else {
      // Fallback: faz fetch direto
      const token = spotifyClient?.token;
      if (!token) {
        const available = Object.keys(spotifyClient || {}).sort().join(', ');
        throw new GraphQLError(
          `Spotify client does not implement a playlist-creation method. Tried: ${candidateFns.join(
            ', '
          )}. Available keys: ${available}`,
          {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          }
        );
      }
      const url = `https://api.spotify.com/v1/users/${encodeURIComponent(me.id)}/playlists`;
      const resp = await globalThis.fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: input.name,
          description: maybe(input.description),
          public: maybe(input.public),
        }),
      });
      if (!resp.ok) {
        const text = await resp.text().catch(() => undefined);
        throw new GraphQLError(
          `Spotify API create playlist returned ${resp.status}: ${text ?? resp.statusText}`,
          { extensions: { code: 'INTERNAL_SERVER_ERROR' } }
        );
      }
      created = await resp.json();
    }

    const playlistId = created?.id ?? created?.playlist?.id;
    console.log('createPlaylist: playlistId:', playlistId);

    let playlist = null;
    if (playlistId) {
      try {
        playlist = await dataSources.spotify.getPlaylist(playlistId);
        console.log('createPlaylist: fetched playlist:', playlist);
      } catch (err) {
        console.error('createPlaylist: error fetching playlist:', err);
        playlist = created;
      }
    } else if (created) {
      playlist = created;
    }

    // eslint-disable-next-line no-console
    console.log('createPlaylist: final returned playlist:', playlist);
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
