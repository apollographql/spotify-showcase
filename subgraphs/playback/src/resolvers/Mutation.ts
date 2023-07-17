import { MutationResolvers } from '../__generated__/resolvers-types';
import { maybe, maybeDeep } from '../utils/common';
import SpotifyAPI from '../dataSources/spotify';

const refreshPlaybackState = async (spotify: SpotifyAPI) => {
  return spotify.getPlaybackState({
    additional_types: 'episode,track',
  });
};

export const Mutation: MutationResolvers = {
  resumePlayback: async (_, { input }, { dataSources }) => {
    let resumed = false;
    try {
      await dataSources.spotify.resumePlayback({
        body: {
          context_uri: maybe(input?.contextUri),
          offset: maybeDeep(input?.offset),
          position_ms: maybe(input?.positionMs),
          uris: maybe(input?.uris),
        },
        params: { device_id: maybe(input?.deviceId) },
      });
      resumed = true;
    } catch (err) {
      console.log(err);
      if (err?.extensions?.reason == 'NO_ACTIVE_DEVICE') {
        //If there are no active devices...
        //  check to see if one is open and start on the first in the index
        const response = await dataSources.spotify.getDevices();
        if (response.devices.length > 0) {
          await dataSources.spotify.resumePlayback({
            body: {
              context_uri: maybe(input?.contextUri),
              offset: maybeDeep(input?.offset),
              position_ms: maybe(input?.positionMs),
              uris: maybe(input?.uris),
            },
            params: { device_id: response.devices[0].id },
          });
          resumed = true;
        }
      }
    }

    if (!resumed) return null;

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  pausePlayback: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.pausePlayback({
      params: {
        device_id: maybe(context?.deviceId),
      },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  seekToPosition: async (_, { positionMs, context }, { dataSources }) => {
    await dataSources.spotify.seekToPosition({
      params: { position_ms: positionMs, device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  setRepeatMode: async (_, { state, context }, { dataSources }) => {
    await dataSources.spotify.setRepeatMode({
      params: {
        state,
        device_id: maybe(context?.deviceId),
      },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  setVolume: async (_, { volumePercent, context }, { dataSources }) => {
    await dataSources.spotify.setVolume({
      params: {
        volume_percent: volumePercent,
        device_id: maybe(context?.deviceId),
      },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },

  shufflePlayback: async (_, { state, context }, { dataSources }) => {
    await dataSources.spotify.shufflePlayback({
      params: { state, device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  skipToNext: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.skipToNext({
      params: { device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  skipToPrevious: async (_, { context }, { dataSources }) => {
    await dataSources.spotify.skipToPrevious({
      params: { device_id: maybe(context?.deviceId) },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
  transferPlayback: async (_, { input }, { dataSources }) => {
    await dataSources.spotify.transferPlayback({
      body: { device_ids: input.deviceIds, play: maybe(input.play) },
    });

    const playbackState = await refreshPlaybackState(dataSources.spotify);

    return { playbackState };
  },
};
