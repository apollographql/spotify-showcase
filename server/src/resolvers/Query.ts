import { GraphQLObjectResolver } from '../types';

interface RecommendationSeedInput {
  seedGenres?: string[];
}

const resolver: GraphQLObjectResolver = {
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  recommendations: (
    _,
    { seeds }: { seeds: RecommendationSeedInput },
    { dataSources }
  ) => {
    return dataSources.spotify.getRecommendations({
      seed_genres: seeds.seedGenres,
    });
  },
};

export default resolver;
