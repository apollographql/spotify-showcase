import camelize from 'camelize';
import { QueryResolvers } from './types';

const resolvers: QueryResolvers = {
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  me: async (_, __, { dataSources }) => {
    const user = await dataSources.spotify.me();

    return user ? { user: camelize(user) } : null;
  },
  recommendations: async (_, { seeds }, { dataSources }) => {
    const data = await dataSources.spotify.getRecommendations({
      ...seeds,
      seed_artists: seeds.seedArtists?.join(','),
      seed_genres: seeds.seedGenres?.join(','),
      seed_tracks: seeds.seedTracks?.join(','),
    });

    return camelize(data);
  },
};

export default resolvers;
