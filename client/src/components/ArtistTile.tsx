import { gql } from '@apollo/client';
import { ArtistTile_artist as Artist } from '../types/api';
import CoverPhoto from './CoverPhoto';
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
    <MediaTile
      coverPhoto={
        <CoverPhoto
          animateIn={animateIn}
          shape="circle"
          image={artist.images[0]}
        />
      }
      description="Artist"
      title={artist.name}
      to={`/artists/${artist.id}`}
    />
  );
};

export default ArtistTile;
