import { PlaylistResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistResolvers = {
  externalUrls: prop('external_urls'),
  tracks: async (playlist, args, { dataSources }) => {
    const playlistTracks = await dataSources.spotify.getPlaylistTracks(
      playlist.id,
      {
        limit: args.limit ?? undefined,
        offset: args.offset ?? undefined,
      }
    );

    return {
      ...playlistTracks,
      // Sometimes the API returns items in a playlist with no track, so we
      // filter them out.
      items: playlistTracks.items.filter((item) => item.track),
    };
  },
  // TODO: Add back when @apollo/subgraph adds subscription support
  // https://github.com/apollographql/graphos-subscriptions/issues/123
  // __resolveReference: (playlist, { dataSources }) => {
  //   return dataSources.spotify.getPlaylist(playlist.id);
  // },
};

export default resolvers;
