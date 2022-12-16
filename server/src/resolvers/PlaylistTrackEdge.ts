import { PlaylistTrackEdgeResolvers } from './types';
import { prop } from './helpers';
import { parseISO } from 'date-fns';
import { Spotify } from '../dataSources/spotify.types';

const resolvers: PlaylistTrackEdgeResolvers = {
  addedAt: ({ added_at }) => parseISO(added_at),
  addedBy: ({ added_by }) => {
    // TODO: Determine if we need to fetch the full user based on the selection
    // set
    return added_by as Spotify.Object.User;
  },
  node: prop('track'),
};

export default resolvers;
