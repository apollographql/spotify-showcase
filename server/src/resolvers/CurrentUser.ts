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
  episodes: (_, { limit, offset }, { dataSources }) => {
    return dataSources.spotify.getCurrentUserEpisodes({
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
  episodesContains: (_, { ids }, { dataSources }) => {
    return dataSources.spotify.checkContainsEpisodes(ids.join(','));
  },
  followedArtists: async (_, { after, limit }, { dataSources }) => {
    const { artists } = await dataSources.spotify.getFollowed({
      type: 'artist',
      after: maybe(after),
      limit: maybe(limit),
    });

    return artists;
  },
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
  shows: (_, { limit, offset }, { dataSources }) => {
    return dataSources.spotify.getSavedShows({
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
  showsContains: (_, { ids }, { dataSources }) => {
    return dataSources.spotify.checkContainsShows(ids.join(','));
  },
  topArtists: (_, { limit, offset, timeRange }, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTopArtists({
      limit: maybe(limit),
      offset: maybe(offset),
      time_range: maybe(timeRange),
    });
  },
  topTracks: (_, { limit, offset, timeRange }, { dataSources }) => {
    return dataSources.spotify.getCurrentUserTopTracks({
      limit: maybe(limit),
      offset: maybe(offset),
      time_range: maybe(timeRange),
    });
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
