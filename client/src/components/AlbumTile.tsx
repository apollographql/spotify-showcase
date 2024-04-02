// import { capitalize } from '../utils/string';
// import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';
import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import { AlbumTileQuery, AlbumTileQueryVariables } from '../types/api';
import Skeleton from './Skeleton/Skeleton';

// EXERCISE: Allow for album as props
// interface Album {
//   // id: string;
//   // name: string;
//   // images: Array<{ url: string }>;
//   // EXERCISE: We want to add support for this data
//   // releaseDate: { date: string };
//   // albumType: string
// }

interface AlbumTileProps {
  // EXERCISE: Allow for album as props
  // album: Album;
  albumId: string;
}

const ALBUM_TILE_QUERY: TypedDocumentNode<
  AlbumTileQuery,
  AlbumTileQueryVariables
> = gql`
  query AlbumTileQuery($id: ID!) {
    album(id: $id) {
      id
      name
      images {
        url
      }
    }
  }
`;

// EXERCISE
const AlbumTile = ({ albumId }: AlbumTileProps) => {
  const { data, loading, error } = useQuery(ALBUM_TILE_QUERY, {
    variables: { id: albumId },
  });

  if (loading) {
    return <Skeleton.MediaTile coverPhotoShape="square" description />;
  }

  if (error) {
    throw new Error('Could not fetch album');
  }

  const album = data!.album!;

  return (
    <MediaTile to={`/albums/${album.id}`}>
      <MediaTile.CoverPhoto image={album.images[0]} />
      <div className="flex flex-col">
        <AlbumTileDetails album={album} />
      </div>
    </MediaTile>
  );
};

interface AlbumDetailsProps {
  album: {
    name: string;
  };
}

function AlbumTileDetails({ album }: AlbumDetailsProps) {
  return (
    <>
      <MediaTile.Title>{album.name}</MediaTile.Title>
      <MediaTile.Details>{/* EXERCISE */}</MediaTile.Details>
    </>
  );
}

export default AlbumTile;
