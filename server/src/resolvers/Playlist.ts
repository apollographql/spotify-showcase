import { PlaylistResolvers } from './types';
import { prop } from './helpers';

const resolvers: PlaylistResolvers = {
  externalUrls: prop('external_urls'),
  tracks: async (playlist, { limit, offset }, { dataSources }) => {
    const playlistTracks = await dataSources.spotify.playlistTracks(
      playlist.id,
      {
        limit,
        offset,
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
