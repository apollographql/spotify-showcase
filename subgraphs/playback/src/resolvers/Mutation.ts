import { MutationResolvers } from '../__generated__/resolvers-types';
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

export const Mutation: MutationResolvers = {
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

    return {playbackState};
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
}