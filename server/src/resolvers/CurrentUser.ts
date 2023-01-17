import { CurrentUserResolvers } from './types';
import { itself } from './helpers';

const resolvers: CurrentUserResolvers = {
  user: itself(),
  player: () => {
    // Return empty object since this field makes no requests to the API
    return {};
  },
  playlists: (_, args, { dataSources }) => {
    return dataSources.spotify.getCurrentUserPlaylists({
      limit: args.limit ?? undefined,
      offset: args.offset ?? undefined,
    });
  },
  queue: (_, __, { dataSources }) => dataSources.spotify.getPlaybackQueue(),
  tracks: (_, args, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTracks({
      limit: args.limit ?? undefined,
      offset: args.offset ?? undefined,
    });
  },
};

export default resolvers;
