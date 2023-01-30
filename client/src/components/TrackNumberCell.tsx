import { gql } from '@apollo/client';
import {
  TrackNumberCell_track as Track,
  TrackNumberCell_playbackState as PlaybackState,
} from '../types/api';
import AnimatedSoundWave from './AnimatedSoundWave';
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
      id
      uri
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
  const isCurrentTrack = playbackState?.item?.uri === track.uri;

  return (
    <div className="flex min-w-[3ch] justify-end">
      {isPlaying && isPlayingInContext && isCurrentTrack ? (
        <AnimatedSoundWave />
      ) : preferIcon ? (
        <Music size="1rem" />
      ) : (
        <Text
          color={isPlayingInContext && isCurrentTrack ? 'themeLight' : 'muted'}
          numericVariant="tabular-nums"
        >
          {trackNumber}
        </Text>
      )}
    </div>
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
