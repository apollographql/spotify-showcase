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
  albumsContains: (_, { ids }, { dataSources }) => {
    return dataSources.spotify.checkContainsAlbums(ids.join(','));
  },
  episodesContains: (_, { ids }, { dataSources }) => {
    return dataSources.spotify.checkContainsEpisodes(ids.join(','));
  },
  user: itself(),
  playbackQueue: (_, __, { dataSources }) => {
    return dataSources.spotify.getPlaybackQueue();
  },
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
  showsContains: (_, { ids }, { dataSources }) => {
    return dataSources.spotify.checkContainsShows(ids.join(','));
  },
  tracks: (_, args, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTracks({
      limit: args.limit ?? undefined,
      offset: args.offset ?? undefined,
    });
  },
  tracksContains: (_, { ids }, { dataSources }) => {
    return dataSources.spotify.checkContainsTracks(ids.join(','));
  },
};

export default resolvers;
