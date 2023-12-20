import { gql } from '@apollo/client';
import { ArtistTile_artist as Artist } from '../types/api';
import MediaTile from './MediaTile';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface ArtistTileProps {
  artist: Artist;
  animateIn?: boolean;
}

fragmentRegistry.register(gql`
  fragment ArtistTile_artist on Artist {
    id
    name
    images {
      url
    }
  }
`);

const ArtistTile = ({ artist, animateIn }: ArtistTileProps) => {
  return (
    <MediaTile to={`/artists/${artist.id}`}>
      <MediaTile.CoverPhoto
        image={artist.images[0]}
        shape="circle"
        animateIn={animateIn}
      />
      <div className="flex flex-col">
        <MediaTile.Title>{artist.name}</MediaTile.Title>
        <MediaTile.Details>Artist</MediaTile.Details>
      </div>
    </MediaTile>
  );
};

export default ArtistTile;
