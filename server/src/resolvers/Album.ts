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

    return dataSources.spotify.albumTracks(album.id, args);
  },
};

export default resolvers;
