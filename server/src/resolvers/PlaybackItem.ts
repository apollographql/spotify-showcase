import { PlaybackItemResolvers } from './types';

const resolvers: PlaybackItemResolvers = {
  __resolveType: (playbackItem) => {
    switch (playbackItem.type) {
      case 'episode':
        return 'Episode';
      case 'track':
        return 'Track';
    }
  },
};

export default resolvers;
