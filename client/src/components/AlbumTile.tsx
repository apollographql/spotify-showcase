import { capitalize } from '../utils/string';
// import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';
import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import { AlbumTile_album, AlbumTileDetails_album } from '../types/api';
import { yearOfRelease } from '../utils/releaseDate';

// EXERCISE: Allow for album as props
interface Album {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  // EXERCISE: We want to add support for this data
  releaseDate: { date: string };
  albumType: string;
}

interface AlbumTileProps {
  album: AlbumTile_album;
}

// EXERCISE
const AlbumTile = ({ album }: AlbumTileProps) => {
  return (
    <MediaTile to={`/albums/${album.id}`}>
      <MediaTile.CoverPhoto image={album.images[0]} />
      <div className="flex flex-col">
        <AlbumTileDetails album={album} />
      </div>
    </MediaTile>
  );
};

AlbumTileDetails.fragments = {
  album: gql`
    fragment AlbumTileDetails_album on Album {
      name
      albumType
      releaseDate {
        date
      }
    }
  `,
};

AlbumTile.fragments = {
  album: gql`
    fragment AlbumTile_album on Album {
      id
      name
      images {
        url
      }
      ...AlbumTileDetails_album
    }

    ${AlbumTileDetails.fragments.album}
  `,
};

interface AlbumDetailsProps {
  album: AlbumTileDetails_album;
}

// EXERCISE
function AlbumTileDetails({ album }: AlbumDetailsProps) {
  return (
    <>
      <MediaTile.Title>{album.name}</MediaTile.Title>
      <MediaTile.Details>
        <span>{capitalize(album.albumType.toLowerCase())}</span>
        <span>{yearOfRelease(album.releaseDate)}</span>
      </MediaTile.Details>
    </>
  );
}

export default AlbumTile;
