import { AlbumResolvers } from './types';
import { itself, prop } from './helpers';

const resolvers: AlbumResolvers = {
  albumType: prop('album_type'),
  externalUrls: prop('external_urls'),
  releaseDate: itself(),
  totalTracks: prop('total_tracks'),
  tracks: (album, args, { dataSources }) => {
    if ('tracks' in album) {
      return album.tracks;
    }

    return dataSources.spotify.getAlbumTracks(album.id, {
      limit: args.limit ?? undefined,
      offset: args.offset ?? undefined,
    });
  },
  // TODO: Add back when @apollo/subgraph adds subscription support
  // https://github.com/apollographql/graphos-subscriptions/issues/123
  // __resolveReference: (album, { dataSources }) => {
  //   return dataSources.spotify.getAlbum(album.id);
  // },
};

export default resolvers;
