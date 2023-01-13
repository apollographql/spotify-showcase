import { gql } from '@apollo/client';
import {
  TrackNumberCell_track as Track,
  TrackNumberCell_playbackState as PlaybackState,
} from '../types/api';
import AnimatedSoundWave from './AnimatedSoundWave';
import Flex from './Flex';
import Text from './Text';
import usePlaybackState from '../hooks/usePlaybackState';
import { Music } from 'lucide-react';

interface Context {
  __typename: 'Playlist' | 'Album';
  uri: string;
}

interface TrackNumberCellProps {
  context: Context;
  position: number;
  track: Track;
  preferIcon?: boolean;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment TrackNumberCell_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
    item {
      ... on Track {
        uri
      }
      ... on Episode {
        uri
      }
    }
  }
`;

const TrackNumberCell = ({
  context,
  position,
  track,
  preferIcon = false,
}: TrackNumberCellProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const trackNumber =
    context.__typename === 'Playlist' ? position + 1 : track.trackNumber;

  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingInContext = playbackState?.context?.uri === context.uri;

  return (
    <Flex justifyContent="end">
      {isPlaying &&
        isPlayingInContext &&
        playbackState.item?.uri === track.uri ? (
        <AnimatedSoundWave />
      ) : preferIcon ? (
        <Music size="1rem" />
      ) : (
        <Text numericVariant="tabular-nums">{trackNumber}</Text>
      )}
    </Flex>
  );
};

TrackNumberCell.fragments = {
  track: gql`
    fragment TrackNumberCell_track on Track {
      id
      uri
      trackNumber
    }
  `,
};

export default TrackNumberCell;
