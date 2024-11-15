import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { ArtistTopTracks_tracks as Track } from '../types/api';
import { thumbnail } from '../utils/image';
import CoverPhoto from './CoverPhoto';
import ExplicitBadge from './ExplicitBadge';
import Duration from './Duration';
import Flex from './Flex';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface ArtistTopTrackProps {
  track: FragmentType<Track>;
  trackNumber: number;
}

const ArtistTopTrackFragment: TypedDocumentNode<Track> = gql`
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
`;

fragmentRegistry.register(ArtistTopTrackFragment);

const ArtistTopTrack = ({ track, trackNumber }: ArtistTopTrackProps) => {
  const { data, complete } = useFragment({
    fragment: ArtistTopTrackFragment,
    from: track,
  });

  if (!complete) {
    return null;
  }

  const albumCoverPhoto = thumbnail(data.album.images);

  return (
    <div className="grid [grid-template-columns:1ch_1fr_auto] gap-4 py-2 px-4 items-center rounded hover:bg-surface">
      <span className="text-muted justify-self-end" color="muted">
        {trackNumber}
      </span>
      <Flex alignItems="center" gap="1rem">
        <CoverPhoto image={albumCoverPhoto} size="2.5rem" />
        <Flex direction="column" alignItems="start">
          <span>{data.name}</span>
          {data.explicit && <ExplicitBadge />}
        </Flex>
      </Flex>
      <span className="text-muted">
        <Duration durationMs={data.durationMs} />
      </span>
    </div>
  );
};

export default ArtistTopTrack;
