import { PlaybackItemResolvers } from '../__generated__/resolvers-types';

export const PlaybackItem: PlaybackItemResolvers = {
  __resolveType: (playbackItem) => {
    switch (playbackItem.type) {
      case 'episode':
        return 'Episode';
      case 'track':
        return 'Track';
    }
  },
  async __resolveReference(playbackItem, { dataSources }, info) {
    info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
    // This is strictly for a demo, not a good practice
    const id = playbackItem.id;
    try {
      return await dataSources.spotify.getTrack(id);
    } catch (err) {
      return await dataSources.spotify.getEpisode(id);
    }
  },
};
