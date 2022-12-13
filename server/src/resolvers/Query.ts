import { QueryResolvers } from './types';

const resolvers: QueryResolvers = {
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  recommendations: async (_, { seeds }, { dataSources }) => {
    return dataSources.spotify.getRecommendations({
      seed_genres: seeds.seedGenres,
    });
  },
};

export default resolvers;
