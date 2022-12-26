import { gql } from '@apollo/client';
import { AlbumTile_album as Album } from '../types/api';
import { capitalize } from '../utils/string';
import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';

interface AlbumTileProps {
  album: Album;
}

const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile
      coverPhoto={album.images[0]}
      description={[
        <span>{yearOfRelease(album.releaseDate)}</span>,
        <span>{capitalize(album.albumType.toLowerCase())}</span>,
      ]}
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
      releaseDate {
        date
      }
      images {
        url
      }
    }
  `,
};

export default AlbumTile;
