import camelize from 'camelize';
import { QueryResolvers } from './types';

const resolvers: QueryResolvers = {
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  recommendations: async (_, { seeds }, { dataSources }) => {
    const data = await dataSources.spotify.getRecommendations({
      seed_genres: seeds.seedGenres ?? undefined,
    });

    return camelize(data);
  },
};

export default resolvers;
