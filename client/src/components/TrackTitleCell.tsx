import { gql } from '@apollo/client';
import {
  TrackTitleCell_track as Track,
  TrackTitleCell_playbackState as PlaybackState,
} from '../types/api';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import CommaSeparatedList from './CommaSeparatedList';
import Text from './Text';
import usePlaybackState from '../hooks/usePlaybackState';
import ExplicitBadge from './ExplicitBadge';

interface Context {
  uri: string;
}

interface TrackTitleCellProps {
  context: Context;
  track: Track;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment TrackTitleCell_playbackState on PlaybackState {
    context {
      uri
    }
    item {
      id
      uri
    }
  }
`;

const TrackTitleCell = ({ context, track }: TrackTitleCellProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const isPlayingInContext = playbackState?.context?.uri === context.uri;
  const isCurrentTrack = track.uri === playbackState?.item?.uri;

  return (
    <Flex gap="0.5rem">
      <CoverPhoto image={track.album.images[0]} size="2.5rem" />
      <Flex direction="column">
        <Text
          size="base"
          color={
            isCurrentTrack && isPlayingInContext ? 'themeLight' : 'primary'
          }
        >
          {track.name}
        </Text>
        <Flex gap="0.5rem" alignItems="center">
          {track.explicit && <ExplicitBadge />}
          <CommaSeparatedList>
            {track.artists.map((artist) => (
              <Text
                interactive
                as={EntityLink}
                key={artist.id}
                color="muted"
                entity={artist}
              >
                {artist.name}
              </Text>
            ))}
          </CommaSeparatedList>
        </Flex>
      </Flex>
    </Flex>
  );
};

TrackTitleCell.fragments = {
  track: gql`
    fragment TrackTitleCell_track on Track {
      id
      explicit
      name
      uri
      album {
        id
        images {
          url
        }
      }
      artists {
        id
        name
      }
    }
  `,
};

export default TrackTitleCell;
