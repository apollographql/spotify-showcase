import { gql } from '@apollo/client';
import usePlaybackState from '../hooks/usePlaybackState';
import {
  AlbumTrackTitleCell_album as Album,
  AlbumTrackTitleCell_playbackState as PlaybackState,
  AlbumTrackTitleCell_track as Track,
} from '../types/api';
import CommaSeparatedList from './CommaSeparatedList';
import EntityLink from './EntityLink';
import ExplicitBadge from './ExplicitBadge';
import Flex from './Flex';
import Text from './Text';

interface AlbumTrackTitleCellProps {
  album: Album;
  track: Track;
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

const AlbumTrackTitleCell = ({ album, track }: AlbumTrackTitleCellProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const isPlayingInAlbum = playbackState?.context?.uri === album.uri;
  const isCurrentTrack = track.uri === playbackState?.item?.uri;

  return (
    <Flex direction="column" gap="0.5">
      <Text
        size="base"
        color={isCurrentTrack && isPlayingInAlbum ? 'themeLight' : 'primary'}
      >
        {track.name}
      </Text>
      <Flex gap="0.5rem" alignItems="center">
        {track.explicit && <ExplicitBadge />}
        <CommaSeparatedList>
          {track.artists.map((artist) => (
            <Text
              interactive
              key={artist.id}
              as={EntityLink}
              color="muted"
              entity={artist}
            >
              {artist.name}
            </Text>
          ))}
        </CommaSeparatedList>
      </Flex>
    </Flex>
  );
};

AlbumTrackTitleCell.fragments = {
  album: gql`
    fragment AlbumTrackTitleCell_album on Album {
      uri
    }
  `,
  track: gql`
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
  `,
};

export default AlbumTrackTitleCell;
