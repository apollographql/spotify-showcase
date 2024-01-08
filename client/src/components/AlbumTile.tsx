import { gql } from '@apollo/client';
import { AlbumTile_album as Album } from '../types/api';
import { capitalize } from '../utils/string';
import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface AlbumTileProps {
  album: Album;
}

fragmentRegistry.register(gql`
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
`);

const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile to={`/albums/${album.id}`}>
      <MediaTile.CoverPhoto image={album.images[0]} />
      <div className="flex flex-col">
        <MediaTile.Title>{album.name}</MediaTile.Title>
        <MediaTile.Details>
          <span>{yearOfRelease(album.releaseDate)}</span>
          <span>{capitalize(album.albumType.toLowerCase())}</span>
        </MediaTile.Details>
      </div>
    </MediaTile>
  );
};

export default AlbumTile;
