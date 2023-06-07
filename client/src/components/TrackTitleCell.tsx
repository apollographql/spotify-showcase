import { gql } from '@apollo/client';
import {
  TrackTitleCell_track as Track,
  TrackTitleCell_playbackState as PlaybackState,
} from '../types/api';
import cx from 'classnames';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import CommaSeparatedList from './CommaSeparatedList';
import usePlaybackState from '../hooks/usePlaybackState';
import ExplicitBadge from './ExplicitBadge';
import { thumbnail } from '../utils/image';

interface Context {
  uri: string;
}

interface TrackTitleCellProps {
  context: Context | null;
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

  const isPlayingInContext =
    context != null && playbackState?.context?.uri === context.uri;
  const isCurrentTrack = track.uri === playbackState?.item?.uri;

  return (
    <Flex gap="0.5rem">
      <CoverPhoto image={thumbnail(track.album.images)} size="2.5rem" />
      <Flex direction="column">
        <span
          className={cx(
            'text-base',
            isCurrentTrack && isPlayingInContext
              ? 'text-theme-light'
              : 'text-primary'
          )}
        >
          {track.name}
        </span>
        <Flex gap="0.5rem" alignItems="center">
          {track.explicit && <ExplicitBadge />}
          <CommaSeparatedList>
            {track.artists.map((artist) => (
              <EntityLink
                className="text-muted transition-colors duration-150 hover:text-primary"
                key={artist.id}
                entity={artist}
              >
                {artist.name}
              </EntityLink>
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
