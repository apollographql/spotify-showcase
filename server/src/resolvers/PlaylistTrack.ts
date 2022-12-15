import { PlaylistTrackResolvers } from './types';

const resolvers: PlaylistTrackResolvers = {
  __resolveType: (playlistItem) => {
    switch (playlistItem.type) {
      case 'track':
        return 'Track';
      case 'episode':
        return 'Episode';
    }
  },
};

export default resolvers;
