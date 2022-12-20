import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import { PlaylistTile_playlist as Playlist } from '../types/api';
import CoverPhoto from './CoverPhoto';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';
import styles from './PlaylistTile.module.scss';

interface PlaylistTileProps {
  playlist: Playlist;
}

const PlaylistTile = ({ playlist }: PlaylistTileProps) => {
  const image = playlist.images[0];
  const href = `/playlists/${playlist.id}`;

  return (
    <div className={styles.playlistTile}>
      <Link to={href}>
        <CoverPhoto
          src={image?.url}
          fallback={<PlaceholderCoverPhoto icon={Music} />}
        />
      </Link>
      <Link to={href}>{playlist.name}</Link>
    </div>
  );
};

PlaylistTile.fragments = {
  playlist: gql`
    fragment PlaylistTile_playlist on Playlist {
      id
      name
      images {
        url
      }
    }
  `,
};

export default PlaylistTile;
