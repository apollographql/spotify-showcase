import { QueryResolvers } from './types';
import { format } from 'date-fns';

const resolvers: QueryResolvers = {
  album: (_, { id }, { dataSources }) => dataSources.spotify.getAlbum(id),
  artist: (_, { id }, { dataSources }) => dataSources.spotify.getArtist(id),
  episode: (_, { id }, { dataSources }) => dataSources.spotify.getEpisode(id),
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
  track: (_, { id }, { dataSources }) => {
    return dataSources.spotify.getTrack(id);
  },
};

export default resolvers;
