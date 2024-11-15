import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import usePlaybackState from '../hooks/usePlaybackState';
import {
  AlbumTrackTitleCell_album as Album,
  AlbumTrackTitleCell_album,
  AlbumTrackTitleCell_track,
  AlbumTrackTitleCell_playbackState as PlaybackState,
  AlbumTrackTitleCell_track as Track,
} from '../types/api';
import CommaSeparatedList from './CommaSeparatedList';
import EntityLink from './EntityLink';
import ExplicitBadge from './ExplicitBadge';
import Flex from './Flex';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface AlbumTrackTitleCellProps {
  album: FragmentType<Album>;
  track: FragmentType<Track>;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment AlbumTrackTitleCell_playbackState on PlaybackState {
    context {
      uri
    }
    item {
      id
      uri
    }
  }
`;

const AlbumTrackTitleCellAlbumFragment: TypedDocumentNode<AlbumTrackTitleCell_album> = gql`
  fragment AlbumTrackTitleCell_album on Album {
    uri
  }
`;

const AlbumTrackTitleCellTrackFragment: TypedDocumentNode<AlbumTrackTitleCell_track> = gql`
  fragment AlbumTrackTitleCell_track on Track {
    id
    name
    uri
    explicit
    artists {
      id
      name
    }
  }
`;

fragmentRegistry.register(
  AlbumTrackTitleCellAlbumFragment,
  AlbumTrackTitleCellTrackFragment
);

const AlbumTrackTitleCell = ({ album, track }: AlbumTrackTitleCellProps) => {
  const { data: albumData, complete: albumComplete } = useFragment({
    fragment: AlbumTrackTitleCellAlbumFragment,
    from: album,
  });
  const { data: trackData, complete: trackComplete } = useFragment({
    fragment: AlbumTrackTitleCellTrackFragment,
    from: track,
  });

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  if (!trackComplete || !albumComplete) {
    return null;
  }

  const isPlayingInAlbum = playbackState?.context?.uri === albumData.uri;
  const isCurrentTrack = trackData.uri === playbackState?.item?.uri;

  return (
    <Flex direction="column" gap="0.5">
      <span
        className="text-base"
        color={isCurrentTrack && isPlayingInAlbum ? 'themeLight' : 'primary'}
      >
        {trackData.name}
      </span>
      <Flex gap="0.5rem" alignItems="center">
        {trackData.explicit && <ExplicitBadge />}
        <CommaSeparatedList>
          {trackData.artists.map((artist) => (
            <EntityLink
              className="text-muted transition-colors duration-[0.15s] hover:text-primary"
              key={artist.id}
              entity={artist}
            >
              {artist.name}
            </EntityLink>
          ))}
        </CommaSeparatedList>
      </Flex>
    </Flex>
  );
};

export default AlbumTrackTitleCell;
