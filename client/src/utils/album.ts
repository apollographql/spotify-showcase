import { Album as AlbumSchemaType, AlbumType } from '../types/api';

type Album = Pick<AlbumSchemaType, 'albumType' | 'totalTracks'>;

export const albumType = (album: Album) => {
  if (album.albumType === AlbumType.Single && album.totalTracks > 1) {
    return 'EP';
  }

  return album.albumType;
};
