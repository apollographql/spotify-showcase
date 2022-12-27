import { CurrentUserResolvers } from './types';
import { itself } from './helpers';

const resolvers: CurrentUserResolvers = {
  user: itself(),
  playlists: (_, args, { dataSources }) => {
    return dataSources.spotify.getCurrentUserPlaylists(args);
  },
  tracks: (_, args, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTracks(args);
  },
};

export default resolvers;
