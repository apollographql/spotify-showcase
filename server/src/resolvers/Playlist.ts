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
};

export default resolvers;
