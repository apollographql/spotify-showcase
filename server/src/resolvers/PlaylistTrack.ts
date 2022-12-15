import { PlaylistTrackResolvers } from './types';

const resolvers: PlaylistTrackResolvers = {
  __resolveType: (playlistTrack) => {
    switch (playlistTrack.type) {
      case 'track':
        return 'Track';
      case 'episode':
        return 'Episode';
    }
  },
};

export default resolvers;
