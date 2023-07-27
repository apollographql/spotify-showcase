import { AlbumResolvers } from '../__generated__/resolvers-types';
import { itself, prop } from './helpers';

export const Album: AlbumResolvers = {
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
  __resolveReference: (album, { dataSources }) => {
    return dataSources.spotify.getAlbum(album.id);
  },
};
