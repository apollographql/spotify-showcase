import { gql } from '@apollo/client';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';
import { Music } from 'lucide-react';
import { thumbnail } from '../utils/image';
import { PlaylistTitleCell_playlistTrack as PlaylistTrack } from '../types/api';
import styles from './PlaylistTitleCell.module.scss';

interface PlaylistTitleCellProps {
  playlistTrack: PlaylistTrack;
}

const PlaylistTitleCell = ({ playlistTrack }: PlaylistTitleCellProps) => {
  const images =
    playlistTrack.__typename === 'Episode'
      ? playlistTrack.show.images
      : playlistTrack.album.images;

  const image = thumbnail(images);

  return (
    <Flex gap="0.5rem" alignItems="end">
      <CoverPhoto
        src={image.url}
        fallback={<PlaceholderCoverPhoto icon={Music} />}
        size="2.5rem"
      />
      <Flex direction="column">
        <EntityLink className={styles.trackName} entity={playlistTrack}>
          {playlistTrack.name}
        </EntityLink>
        {playlistTrack.__typename === 'Track' ? (
          <EntityLink className={styles.albumName} entity={playlistTrack.album}>
            {playlistTrack.album.name}
          </EntityLink>
        ) : (
          <span className={styles.publisher}>
            {playlistTrack.show.publisher}
          </span>
        )}
      </Flex>
    </Flex>
  );
};

PlaylistTitleCell.fragments = {
  playlistTrack: gql`
    fragment PlaylistTitleCell_playlistTrack on PlaylistTrack {
      id
      name

      ... on Episode {
        show {
          id
          publisher
          images {
            url
          }
        }
      }

      ... on Track {
        album {
          id
          name
          images {
            url
          }
        }
      }
    }
  `,
};

export default PlaylistTitleCell;
