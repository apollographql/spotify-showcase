import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import {
  TrackTitleCell_playbackState as PlaybackState,
  TrackTitleCell_track,
} from '../types/api';
import cx from 'classnames';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import CommaSeparatedList from './CommaSeparatedList';
import usePlaybackState from '../hooks/usePlaybackState';
import ExplicitBadge from './ExplicitBadge';
import { thumbnail } from '../utils/image';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface Context {
  uri: string;
}

interface TrackTitleCellProps {
  context: Context | null;
  track: FragmentType<TrackTitleCell_track>;
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

const TrackTitleCellFragment: TypedDocumentNode<TrackTitleCell_track> = gql`
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
`;

fragmentRegistry.register(TrackTitleCellFragment);

const TrackTitleCell = ({ context, track }: TrackTitleCellProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const { data, complete } = useFragment({
    fragment: TrackTitleCellFragment,
    from: track,
  });

  if (!complete) {
    return null;
  }

  const isPlayingInContext =
    context != null && playbackState?.context?.uri === context.uri;
  const isCurrentTrack = data.uri === playbackState?.item?.uri;

  return (
    <Flex gap="0.5rem">
      <CoverPhoto image={thumbnail(data.album.images)} size="2.5rem" />
      <Flex direction="column">
        <span
          className={cx(
            'text-base',
            isCurrentTrack && isPlayingInContext
              ? 'text-theme-light'
              : 'text-primary'
          )}
        >
          {data.name}
        </span>
        <Flex gap="0.5rem" alignItems="center">
          {data.explicit && <ExplicitBadge />}
          <CommaSeparatedList>
            {data.artists.map((artist) => (
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

export default TrackTitleCell;
