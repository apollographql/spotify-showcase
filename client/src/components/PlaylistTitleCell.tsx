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
          <span className={styles.artistName}>
            {playlistTrack.artists.map((artist, index, artists) => (
              <>
                <EntityLink key={artist.id} entity={artist}>
                  {artist.name}
                </EntityLink>
                {index !== artists.length - 1 && ', '}
              </>
            ))}
          </span>
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
        artists {
          id
          name
        }
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
