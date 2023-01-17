import { CurrentUserResolvers } from './types';
import { itself } from './helpers';
import { maybe } from '../utils/common';

const resolvers: CurrentUserResolvers = {
  albums: (_, { limit, offset }, { dataSources }) => {
    return dataSources.spotify.getCurrentUserAlbums({
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
  contains: async (_, args, { dataSources }) => {
    const [albums, episodes, shows, tracks] = await Promise.all([
      args.albums
        ? dataSources.spotify.checkContainsAlbums(args.albums.join(','))
        : null,
      args.episodes
        ? dataSources.spotify.checkContainsEpisodes(args.episodes.join(','))
        : null,
      args.shows
        ? dataSources.spotify.checkContainsShows(args.shows.join(','))
        : null,
      args.tracks
        ? dataSources.spotify.checkContainsTracks(args.tracks.join(','))
        : null,
    ]);

    return { episodes, albums, shows, tracks };
  },
  user: itself(),
  playbackQueue: (_, __, { dataSources }) =>
    dataSources.spotify.getPlaybackQueue(),
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
  tracks: (_, args, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTracks({
      limit: args.limit ?? undefined,
      offset: args.offset ?? undefined,
    });
  },
};

export default resolvers;
