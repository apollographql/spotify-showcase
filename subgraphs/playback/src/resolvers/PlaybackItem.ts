import { PlaybackItemResolvers } from '../__generated__/resolvers-types';

export const PlaybackItem: PlaybackItemResolvers = {
  __resolveType: (playbackItem) => {
    switch (playbackItem.type) {
      case 'episode':
        return 'Episode';
      case 'track':
        return 'Track';
    }
  }
};
