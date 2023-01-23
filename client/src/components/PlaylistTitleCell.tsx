import { gql } from '@apollo/client';
import CommaSeparatedList from './CommaSeparatedList';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Flex from './Flex';
import Text from './Text';
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
        <Text
          as={EntityLink}
          size="base"
          entity={playlistTrack}
          color={
            isCurrentTrack && isPlayingInPlaylist ? 'themeLight' : 'primary'
          }
        >
          {playlistTrack.name}
        </Text>
        <Flex gap="0.5rem" alignItems="center">
          {playlistTrack.explicit && <ExplicitBadge />}
          {playlistTrack.__typename === 'Track' ? (
            <CommaSeparatedList>
              {playlistTrack.artists.map((artist) => (
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
          ) : (
            <Text color="muted">{playlistTrack.show.publisher}</Text>
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
