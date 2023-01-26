import { QueryResolvers } from './types';
import { format } from 'date-fns';
import { maybe } from '../utils/common';

const resolvers: QueryResolvers = {
  album: (_, { id }, { dataSources }) => dataSources.spotify.getAlbum(id),
  albums: async (_, { ids }, { dataSources }) => {
    const { albums } = await dataSources.spotify.getAlbums({
      ids: ids.join(','),
    });

    return albums;
  },
  artist: (_, { id }, { dataSources }) => dataSources.spotify.getArtist(id),
  artists: async (_, { ids }, { dataSources }) => {
    const { artists } = await dataSources.spotify.getArtists({
      ids: ids.join(','),
    });

    return artists;
  },
  developer: () => {
    // Return empty object since this field is used as a namespace
    return {};
  },
  episode: (_, { id }, { dataSources }) => dataSources.spotify.getEpisode(id),
  episodes: async (_, { ids }, { dataSources }) => {
    const { episodes } = await dataSources.spotify.getEpisodes({
      ids: ids.join(','),
    });

    return episodes;
  },
  featuredPlaylists: (_, { limit, offset, timestamp }, { dataSources }) => {
    return dataSources.spotify.getFeaturedPlaylists({
      limit: limit ?? undefined,
      offset: offset ?? undefined,
      timestamp: timestamp
        ? format(timestamp, "yyyy-LL-dd'T'HH:mm:ss")
        : undefined,
    });
  },
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  me: (_, __, { dataSources }) => dataSources.spotify.getCurrentUser(),
  newReleases: (_, { country, limit, offset }, { dataSources }) => {
    return dataSources.spotify.getNewReleases({
      country: maybe(country),
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
  recommendations: async (_, { seeds }, { dataSources }) => {
    return dataSources.spotify.getRecommendations({
      limit: seeds.limit ?? undefined,
      seed_artists: seeds.seedArtists?.join(','),
      seed_genres: seeds.seedGenres?.join(','),
      seed_tracks: seeds.seedTracks?.join(','),
    });
  },
  playlist: (_, { id }, { dataSources }) => {
    // Intentionally omit tracks. This is an optimal place for @defer and
    // provides a nice learning area
    return dataSources.spotify.getPlaylist(id, {
      fields:
        'id,collaborative,description,external_urls,images,name,owner,public,uri',
    });
  },
  show: (_, { id }, { dataSources }) => dataSources.spotify.getShow(id),
  shows: async (_, { ids }, { dataSources }) => {
    const { shows } = await dataSources.spotify.getShows({
      ids: ids.join(','),
    });

    return shows;
  },
  track: (_, { id }, { dataSources }) => {
    return dataSources.spotify.getTrack(id);
  },
  tracks: async (_, { ids }, { dataSources }) => {
    const { tracks } = await dataSources.spotify.getTracks({
      ids: ids.join(','),
    });

    return tracks;
  },
};

export default resolvers;
