import { RecommendationsResolvers } from '../__generated__/resolvers-types';
import { Spotify } from '../dataSources/spotify.types';

export const Recommendations: RecommendationsResolvers = {
  tracks: (recommendations) => {
    // TODO: Better determine if the selection set has the right values or if we
    // need to fetch track details. To keep it simple for now, cast to full
    // track type
    return recommendations.tracks as unknown as Spotify.Object.Track[];
  },
};
