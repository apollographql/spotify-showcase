import { capitalize } from '../utils/string';
import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';
import CoverPhoto from './CoverPhoto';

interface Album {
  id: string;
  name: string;
  totalTracks: number;
  // EXERCISE: We want to add support for this data
  // releaseDate: { date: string };
  images: Array<{ url: string }>;
}

interface AlbumTileProps {
  album: Album;
}

const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile
      coverPhoto={<CoverPhoto image={album.images[0]} />}
      description={
        [
          // EXERCISE: We want to show the release date on each album tile
          // <span key="releaseDate">{yearOfRelease(album.releaseDate)}</span>,
          // ---
          // EXERCISE: We want to show the album type on each album tile.
          //   NOTE: Do this after converting this component to use fragments
          //
          // <span key="albumType">
          //   {capitalize(album.albumType.toLowerCase())}
          // </span>,
        ]
      }
      title={album.name}
      to={`/albums/${album.id}`}
    />
  );
};

export default AlbumTile;
