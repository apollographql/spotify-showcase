import { PlaybackContextItemResolvers } from './types';

const resolvers: PlaybackContextItemResolvers = {
  __resolveType: (contextItem) => {
    switch (contextItem.type) {
      case 'album':
        return 'Album';
      case 'artist':
        return 'Artist';
      case 'playlist':
        return 'Playlist';
      case 'show':
        return 'Show';
    }
  },
};

export default resolvers;
