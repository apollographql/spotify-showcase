import { MutationResolvers } from '../__generated__/resolvers-types';
import { maybe, maybeDeep } from '../utils/common';
import { SpotifyDataSource } from '../dataSources/spotify';

const refreshPlaybackState = async (
  spotify: SpotifyDataSource,
  ip?: string
) => {
  return spotify.getPlaybackState(
    {
      additional_types: 'episode,track',
    },
    ip
  );
};

export const Mutation: MutationResolvers = {
  resumePlayback: async (_, { input }, { dataSources, userIdForMocks }) => {
    let resumed = false;
    try {
      await dataSources.spotify.resumePlayback(
        {
          body: {
            context_uri: maybe(input?.contextUri),
            offset: maybeDeep(input?.offset),
            position_ms: maybe(input?.positionMs),
            uris: maybe(input?.uris),
          },
          params: { device_id: maybe(input?.deviceId) },
        },
        userIdForMocks
      );
      resumed = true;
    } catch (err) {
      console.log(err);
      if (err?.extensions?.reason == 'NO_ACTIVE_DEVICE') {
        //If there are no active devices...
        //  check to see if one is open and start on the first in the index
        const response = await dataSources.spotify.getDevices();
        if (response.devices.length > 0) {
          await dataSources.spotify.resumePlayback(
            {
              body: {
                context_uri: maybe(input?.contextUri),
                offset: maybeDeep(input?.offset),
                position_ms: maybe(input?.positionMs),
                uris: maybe(input?.uris),
              },
              params: { device_id: response.devices[0].id },
            },
            userIdForMocks
          );
          resumed = true;
        }
      }
    }

    if (!resumed) return null;

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  pausePlayback: async (_, { context }, { dataSources, userIdForMocks }) => {
    await dataSources.spotify.pausePlayback(
      {
        params: {
          device_id: maybe(context?.deviceId),
        },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  seekToPosition: async (
    _,
    { positionMs, context },
    { dataSources, userIdForMocks }
  ) => {
    await dataSources.spotify.seekToPosition(
      {
        params: {
          position_ms: positionMs,
          device_id: maybe(context?.deviceId),
        },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  setRepeatMode: async (
    _,
    { state, context },
    { dataSources, userIdForMocks }
  ) => {
    await dataSources.spotify.setRepeatMode(
      {
        params: {
          state,
          device_id: maybe(context?.deviceId),
        },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  setVolume: async (
    _,
    { volumePercent, context },
    { dataSources, userIdForMocks }
  ) => {
    await dataSources.spotify.setVolume(
      {
        params: {
          volume_percent: volumePercent,
          device_id: maybe(context?.deviceId),
        },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },

  shufflePlayback: async (
    _,
    { state, context },
    { dataSources, userIdForMocks }
  ) => {
    await dataSources.spotify.shufflePlayback(
      {
        params: { state, device_id: maybe(context?.deviceId) },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  skipToNext: async (_, { context }, { dataSources, userIdForMocks }) => {
    await dataSources.spotify.skipToNext(
      {
        params: { device_id: maybe(context?.deviceId) },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  skipToPrevious: async (_, { context }, { dataSources, userIdForMocks }) => {
    await dataSources.spotify.skipToPrevious(
      {
        params: { device_id: maybe(context?.deviceId) },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
  transferPlayback: async (_, { input }, { dataSources, userIdForMocks }) => {
    await dataSources.spotify.transferPlayback(
      {
        body: { device_ids: input.deviceIds, play: maybe(input.play) },
      },
      userIdForMocks
    );

    const playbackState = await refreshPlaybackState(
      dataSources.spotify,
      userIdForMocks
    );

    return { playbackState };
  },
};
