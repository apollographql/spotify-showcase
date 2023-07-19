import { gql } from '@apollo/client';
import { ArtistTile_artist as Artist } from '../types/api';
import CoverPhoto from './CoverPhoto';
import MediaTile from './MediaTile';

interface ArtistTileProps {
  artist: Artist;
  ease?: boolean;
}

const ArtistTile = ({ artist, ease }: ArtistTileProps) => {
  return (
    <MediaTile
      coverPhoto={
        <CoverPhoto ease={ease} shape="circle" image={artist.images[0]} />
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
