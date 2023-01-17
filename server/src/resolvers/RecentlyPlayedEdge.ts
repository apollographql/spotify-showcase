import { RecentlyPlayedEdgeResolvers } from './types';
import { Spotify } from '../dataSources/spotify.types';
import { parseISO } from 'date-fns';

const resolvers: RecentlyPlayedEdgeResolvers = {
  playedAt: ({ played_at }) => parseISO(played_at),
  node: ({ track }) => {
    // TODO: Add some smarts to determine if the full track should be refetched
    return track as Spotify.Object.Track;
  },
};

export default resolvers;
