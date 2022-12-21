import { Album, AlbumType } from '../types/api';

export const albumType = (album: Pick<Album, 'albumType' | 'totalTracks'>) => {
  if (album.albumType === AlbumType.Single && album.totalTracks > 1) {
    return 'EP';
  }

  return album.albumType;
};
