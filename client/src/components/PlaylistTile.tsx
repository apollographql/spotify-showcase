import { gql } from '@apollo/client';
import { PlaylistTile_playlist as Playlist } from '../types/api';
import MediaTile from './MediaTile';

interface PlaylistTileProps {
  playlist: Playlist;
}

const PlaylistTile = ({ playlist }: PlaylistTileProps) => {
  return (
    <MediaTile
      coverPhotoSrc={playlist.images[0].url}
      description={playlist.description}
      title={playlist.name}
      to={`/playlists/${playlist.id}`}
    />
  );
};

PlaylistTile.fragments = {
  playlist: gql`
    fragment PlaylistTile_playlist on Playlist {
      id
      name
      description
      images {
        url
      }
    }
  `,
};

export default PlaylistTile;
