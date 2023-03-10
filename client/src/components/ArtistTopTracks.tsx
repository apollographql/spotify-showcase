import { gql } from '@apollo/client';
import { ArtistTopTracks_tracks as Track } from '../types/api';
import { thumbnail } from '../utils/image';
import CoverPhoto from './CoverPhoto';
import ExplicitBadge from './ExplicitBadge';
import Duration from './Duration';
import Flex from './Flex';

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
          <div
            key={track.id}
            className="grid [grid-template-columns:1ch_1fr_auto] gap-4 py-2 px-4 items-center rounded hover:bg-surface"
          >
            <span className="text-muted justify-self-end" color="muted">
              {index + 1}
            </span>
            <Flex alignItems="center" gap="1rem">
              <CoverPhoto image={albumCoverPhoto} size="2.5rem" />
              <Flex direction="column" alignItems="start">
                <span>{track.name}</span>
                {track.explicit && <ExplicitBadge />}
              </Flex>
            </Flex>
            <span className="text-muted">
              <Duration durationMs={track.durationMs} />
            </span>
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
      explicit
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
