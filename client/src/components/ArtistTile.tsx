import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { ArtistTile_artist as Artist, ArtistTile_artist } from '../types/api';
import MediaTile from './MediaTile';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface ArtistTileProps {
  artist: FragmentType<Artist>;
  animateIn?: boolean;
}

const ArtistTileFragment: TypedDocumentNode<ArtistTile_artist> = gql`
  fragment ArtistTile_artist on Artist {
    id
    name
    images {
      url
    }
  }
`;

fragmentRegistry.register(ArtistTileFragment);

const ArtistTile = ({ artist, animateIn }: ArtistTileProps) => {
  const { data, complete } = useFragment({
    fragment: ArtistTileFragment,
    from: artist,
  });

  if (!complete) {
    return null;
  }

  return (
    <MediaTile to={`/artists/${data.id}`}>
      <MediaTile.CoverPhoto
        image={data.images[0]}
        shape="circle"
        animateIn={animateIn}
      />
      <div className="flex flex-col">
        <MediaTile.Title>{data.name}</MediaTile.Title>
        <MediaTile.Details>Artist</MediaTile.Details>
      </div>
    </MediaTile>
  );
};

export default ArtistTile;
