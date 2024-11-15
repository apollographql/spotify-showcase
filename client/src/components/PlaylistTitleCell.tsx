import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import cx from 'classnames';
import CommaSeparatedList from './CommaSeparatedList';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { thumbnail } from '../utils/image';
import {
  PlaylistTitleCell_playbackState as PlaybackState,
  PlaylistTitleCell_playlistTrack,
} from '../types/api';
import usePlaybackState from '../hooks/usePlaybackState';
import ExplicitBadge from './ExplicitBadge';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaylistTitleCellProps {
  playlistTrack: FragmentType<PlaylistTitleCell_playlistTrack>;
  playlistUri: string;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaylistTitleCell_playbackState on PlaybackState {
    context {
      uri
    }
    item {
      id
      uri
    }
  }
`;

const PlaylistTitleCellFragment: TypedDocumentNode<PlaylistTitleCell_playlistTrack> = gql`
  fragment PlaylistTitleCell_playlistTrack on PlaylistTrack {
    id
    name
    uri

    ... on Episode {
      explicit
      show {
        id
        publisher
        images {
          url
        }
      }
    }

    ... on Track {
      explicit
      artists {
        id
        name
      }
      album {
        id
        name
        images {
          url
        }
      }
    }
  }
`;

fragmentRegistry.register(PlaylistTitleCellFragment);

const PlaylistTitleCell = ({
  playlistTrack,
  playlistUri,
}: PlaylistTitleCellProps) => {
  const { data, complete } = useFragment({
    fragment: PlaylistTitleCellFragment,
    from: playlistTrack,
  });

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  if (!complete) {
    return null;
  }

  const isPlayingInPlaylist = playbackState?.context?.uri === playlistUri;
  const isCurrentTrack = data.uri === playbackState?.item?.uri;

  const images =
    data.__typename === 'Episode' ? data.show.images : data.album.images;

  const image = thumbnail(images);

  return (
    <Flex gap="0.5rem" alignItems="end">
      <CoverPhoto image={image} size="2.5rem" />
      <Flex direction="column">
        <EntityLink
          className={cx(
            'text-base',
            isCurrentTrack && isPlayingInPlaylist
              ? 'text-theme-light'
              : 'text-primary'
          )}
          entity={data}
        >
          {data.name}
        </EntityLink>
        <Flex gap="0.5rem" alignItems="center">
          {data.explicit && <ExplicitBadge />}
          {data.__typename === 'Track' ? (
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
          ) : (
            <span className="text-muted">{data.show.publisher}</span>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PlaylistTitleCell;
