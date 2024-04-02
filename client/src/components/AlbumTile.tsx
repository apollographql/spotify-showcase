import { capitalize } from '../utils/string';
import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';

interface Album {
  id: string;
  name: string;
  totalTracks: number;
  images: Array<{ url: string }>;
  // EXERCISE: We want to add support for this data
  // releaseDate: { date: string };
  // albumType: string
}

interface AlbumTileProps {
  album: Album;
}

// EXERCISE
const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile to={`/albums/${album.id}`}>
      <MediaTile.CoverPhoto image={album.images[0]} />
      <div className="flex flex-col">
        <MediaTile.Title>{album.name}</MediaTile.Title>
        <MediaTile.Details>{/* EXERCISE */}</MediaTile.Details>
      </div>
    </MediaTile>
  );
};

export default AlbumTile;
