import { PlaylistTrackEdgeResolvers } from './types';
import { parseISO } from 'date-fns';
import { Spotify } from '../dataSources/spotify.types';

// Use value returned from Spotify API
const UNIX_EPOCH_BEGINNING = '1970-01-01T00:00:00Z';

const resolvers: PlaylistTrackEdgeResolvers = {
  addedAt: ({ added_at }) => {
    return added_at === UNIX_EPOCH_BEGINNING ? null : parseISO(added_at);
  },
  addedBy: ({ added_by }) => {
    // TODO: Determine if we need to fetch the full user based on the selection
    // set
    return added_by as Spotify.Object.User;
  },
  node: (playlistTrack, _, { dataSources }) => {
    if (playlistTrack.track.type === 'track') {
      return playlistTrack.track;
    }

    return dataSources.spotify.getEpisode(playlistTrack.track.id);
  },
};

export default resolvers;
