import { gql } from '@apollo/client';
import { AlbumTile_album as Album } from '../types/api';
import { capitalize } from '../utils/string';
import MediaTile from './MediaTile';

interface AlbumTileProps {
  album: Album;
}

const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile
      coverPhotoSrc={album.images[0].url}
      description={capitalize(album.albumType.toLowerCase())}
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
