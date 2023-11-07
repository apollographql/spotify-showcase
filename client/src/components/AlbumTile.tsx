import { AlbumType } from '../types/api';
import { capitalize } from '../utils/string';
import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';
import CoverPhoto from './CoverPhoto';

interface Album {
  id: string;
  name: string;
  albumType: AlbumType;
  totalTracks: number;
  releaseDate: { date: string };
  images: Array<{ url: string }>;
}

interface AlbumTileProps {
  album: Album;
}

const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile
      coverPhoto={<CoverPhoto image={album.images[0]} />}
      description={[
        <span key="releaseDate">{yearOfRelease(album.releaseDate)}</span>,
        <span key="albumType">
          {capitalize(album.albumType.toLowerCase())}
        </span>,
      ]}
      title={album.name}
      to={`/albums/${album.id}`}
    />
  );
};

export default AlbumTile;
