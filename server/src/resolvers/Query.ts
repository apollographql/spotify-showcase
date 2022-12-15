import camelize from 'camelize';
import { QueryResolvers } from './types';

const resolvers: QueryResolvers = {
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
    return dataSources.spotify.playlist(id);
  },
};

export default resolvers;
