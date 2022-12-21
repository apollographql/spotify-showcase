import { gql } from '@apollo/client';
import { AlbumTile_album as Album } from '../types/api';
import { albumType } from '../utils/album';
import { capitalize } from '../utils/string';
import MediaTile from './MediaTile';

interface AlbumTileProps {
  album: Album;
}

const AlbumTile = ({ album }: AlbumTileProps) => {
  const type = albumType(album);

  return (
    <MediaTile
      coverPhotoSrc={album.images[0].url}
      description={type === 'EP' ? 'EP' : capitalize(type)}
      title={album.name}
      to={`/albums/${album.id}`}
    />
  );
};

AlbumTile.fragments = {
  album: gql`
    fragment AlbumTile_album on Album {
      id
      name
      albumType
      totalTracks
      images {
        url
      }
    }
  `,
};

export default AlbumTile;
