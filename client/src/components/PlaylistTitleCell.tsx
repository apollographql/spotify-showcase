import { gql } from '@apollo/client';
import cx from 'classnames';
import CommaSeparatedList from './CommaSeparatedList';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import { thumbnail } from '../utils/image';
import {
  PlaylistTitleCell_playlist as Playlist,
  PlaylistTitleCell_playlistTrack as PlaylistTrack,
  PlaylistTitleCell_playbackState as PlaybackState,
} from '../types/api';
import usePlaybackState from '../hooks/usePlaybackState';
import ExplicitBadge from './ExplicitBadge';

interface PlaylistTitleCellProps {
  playlist: Playlist;
  playlistTrack: PlaylistTrack;
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

const PlaylistTitleCell = ({
  playlist,
  playlistTrack,
}: PlaylistTitleCellProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const isPlayingInPlaylist = playbackState?.context?.uri === playlist.uri;
  const isCurrentTrack = playlistTrack.uri === playbackState?.item?.uri;

  const images =
    playlistTrack.__typename === 'Episode'
      ? playlistTrack.show.images
      : playlistTrack.album.images;

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
          entity={playlistTrack}
        >
          {playlistTrack.name}
        </EntityLink>
        <Flex gap="0.5rem" alignItems="center">
          {playlistTrack.explicit && <ExplicitBadge />}
          {playlistTrack.__typename === 'Track' ? (
            <CommaSeparatedList>
              {playlistTrack.artists.map((artist) => (
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
            <span className="text-muted">{playlistTrack.show.publisher}</span>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

PlaylistTitleCell.fragments = {
  playlist: gql`
    fragment PlaylistTitleCell_playlist on Playlist {
      id
      uri
    }
  `,
  playlistTrack: gql`
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
  `,
};

export default PlaylistTitleCell;
