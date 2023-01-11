import { PlaybackContextResolvers } from './types';
import { parseSpotifyIDFromURI } from '../utils/spotify';

const resolvers: PlaybackContextResolvers = {
  item: (context, _, { dataSources }) => {
    const id = parseSpotifyIDFromURI(context.uri);

    switch (context.type) {
      case 'album':
        return dataSources.spotify.getAlbum(id);
      case 'artist':
        return dataSources.spotify.getArtist(id);
      case 'playlist':
        return dataSources.spotify.getPlaylist(id);
      case 'show':
        return dataSources.spotify.getShow(id);
    }
  },
};

export default resolvers;
