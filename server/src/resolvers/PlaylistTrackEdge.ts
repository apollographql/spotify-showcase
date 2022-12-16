import { PlaylistTrackEdgeResolvers } from './types';
import { parseISO } from 'date-fns';
import { Spotify } from '../dataSources/spotify.types';

const resolvers: PlaylistTrackEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  addedBy: ({ added_by }) => {
    // TODO: Determine if we need to fetch the full user based on the selection
    // set
    return added_by as Spotify.Object.User;
  },
  node: (playlistTrack, _, { dataSources }) => {
    if (playlistTrack.track.type === 'track') {
      return playlistTrack.track;
    }

    return dataSources.spotify.episode(playlistTrack.track.id);
  },
};

export default resolvers;
