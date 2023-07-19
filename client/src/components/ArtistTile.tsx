import { gql } from '@apollo/client';
import { ArtistTile_artist as Artist } from '../types/api';
import CoverPhoto from './CoverPhoto';
import MediaTile from './MediaTile';

interface ArtistTileProps {
  artist: Artist;
  animateIn?: boolean;
}

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

ArtistTile.fragments = {
  artist: gql`
    fragment ArtistTile_artist on Artist {
      id
      name
      images {
        url
      }
    }
  `,
};

export default ArtistTile;
