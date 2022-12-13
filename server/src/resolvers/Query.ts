import { GraphQLObjectResolver } from '../types';

interface RecommendationSeedInput {
  seedGenres?: string[];
}

const resolver: GraphQLObjectResolver<
  unknown,
  { seeds: RecommendationSeedInput }
> = {
  recommendations: (_, { seeds }, { dataSources }) => {
    return dataSources.spotify.getRecommendations({
      seed_genres: seeds.seedGenres,
    });
  },
};

export default resolver;
