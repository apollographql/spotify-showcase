import { RecentlyPlayedEdgeResolvers } from '../__generated__/resolvers-types';
import { Spotify } from 'spotify-api';
import { parseISO } from 'date-fns';

export const RecentlyPlayedEdge: RecentlyPlayedEdgeResolvers = {
  playedAt: ({ played_at }) => parseISO(played_at),
  node: ({ track }) => {
    // TODO: Add some smarts to determine if the full track should be refetched
    return track as Spotify.Object.Track;
  },
};
