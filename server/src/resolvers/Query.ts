import { GraphQLObjectResolver } from '../types';

interface RecommendationSeedInput {
  seedGenres?: string[];
}

const resolver: GraphQLObjectResolver<
  unknown,
  { seeds: RecommendationSeedInput }
> = {
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  recommendations: (_, { seeds }, { dataSources }) => {
    return dataSources.spotify.getRecommendations({
      seed_genres: seeds.seedGenres,
    });
  },
};

export default resolver;
