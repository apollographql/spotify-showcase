import { CurrentUserResolvers } from './types';
import { itself } from './helpers';

const resolvers: CurrentUserResolvers = {
  user: itself(),
  playlists: (_, args, { dataSources }) => {
    return dataSources.spotify.currentUserPlaylists(args);
  },
};

export default resolvers;
