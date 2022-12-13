import { Resolver } from '../types';

interface RecommendationSeedInput {
  seedGenres?: string[];
}

export const genres: Resolver = async (_, __, { dataSources }) => {
  const { genres } = await dataSources.spotify.getGenres();

  return genres;
};

export const recommendations: Resolver<
  any,
  { seeds: RecommendationSeedInput }
> = async (_, { seeds }, { dataSources }) => {
  return dataSources.spotify.getRecommendations({
    seed_genres: seeds.seedGenres,
  });
};
