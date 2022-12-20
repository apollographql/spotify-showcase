import { QueryResolvers } from './types';
import { format } from 'date-fns';

const resolvers: QueryResolvers = {
  featuredPlaylists: (_, { limit, offset, timestamp }, { dataSources }) => {
    return dataSources.spotify.featuredPlaylists({
      limit,
      offset,
      timestamp: timestamp ? format(timestamp, "yyyy-LL-dd'T'HH:mm:ss") : null,
    });
  },
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.genres();

    return genres;
  },
  me: (_, __, { dataSources }) => dataSources.spotify.me(),
  recommendations: async (_, { seeds }, { dataSources }) => {
    return dataSources.spotify.recommendations({
      ...seeds,
      seed_artists: seeds.seedArtists?.join(','),
      seed_genres: seeds.seedGenres?.join(','),
      seed_tracks: seeds.seedTracks?.join(','),
    });
  },
  playlist: (_, { id }, { dataSources }) => {
    // Intentionally omit tracks. This is an optimal place for @defer and
    // provides a nice learning area
    return dataSources.spotify.playlist(id, {
      fields:
        'id,collaborative,description,external_urls,images,name,owner,public,uri',
    });
  },
};

export default resolvers;
