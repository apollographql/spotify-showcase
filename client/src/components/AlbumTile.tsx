import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { AlbumTile_album } from '../types/api';
import { capitalize } from '../utils/string';
import { yearOfRelease } from '../utils/releaseDate';
import MediaTile from './MediaTile';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface AlbumTileProps {
  album: FragmentType<AlbumTile_album>;
}

const AlbumTileFragment: TypedDocumentNode<AlbumTile_album> = gql`
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
`;

fragmentRegistry.register(AlbumTileFragment);

const AlbumTile = ({ album }: AlbumTileProps) => {
  const { data, complete } = useFragment({
    fragment: AlbumTileFragment,
    from: album,
  });

  if (!complete) {
    return null;
  }

  return (
    <MediaTile to={`/albums/${data.id}`}>
      <MediaTile.CoverPhoto image={data.images[0]} />
      <div className="flex flex-col">
        <MediaTile.Title>{data.name}</MediaTile.Title>
        <MediaTile.Details>
          <span>{yearOfRelease(data.releaseDate)}</span>
          <span>{capitalize(data.albumType.toLowerCase())}</span>
        </MediaTile.Details>
      </div>
    </MediaTile>
  );
};

export default AlbumTile;
