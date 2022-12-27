import { gql } from '@apollo/client';
import { ArtistTopTracks_tracks as Track } from '../types/api';
import { thumbnail } from '../utils/image';
import CoverPhoto from './CoverPhoto';
import Duration from './Duration';
import Flex from './Flex';
import Text from './Text';
import styles from './ArtistTopTracks.module.scss';

interface ArtistTopTracksProps {
  className?: string;
  tracks: Track[];
}

const ArtistTopTracks = ({ className, tracks }: ArtistTopTracksProps) => {
  return (
    <div className={className}>
      {tracks.slice(0, 5).map((track, index) => {
        const albumCoverPhoto = thumbnail(track.album.images);

        return (
          <div key={track.id} className={styles.track}>
            <Text className={styles.trackNumber} color="muted">
              {index + 1}
            </Text>
            <Flex alignItems="center" gap="1rem">
              <CoverPhoto image={albumCoverPhoto} size="2.5rem" />
              {track.name}
            </Flex>
            <Text color="muted">
              <Duration durationMs={track.durationMs} />
            </Text>
          </div>
        );
      })}
    </div>
  );
};

ArtistTopTracks.fragments = {
  tracks: gql`
    fragment ArtistTopTracks_tracks on Track {
      id
      durationMs
      name
      album {
        id
        images {
          url
        }
      }
    }
  `,
};

export default ArtistTopTracks;
