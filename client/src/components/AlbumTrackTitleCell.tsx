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
import { fragmentRegistry } from '../apollo/fragmentRegistry';

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

fragmentRegistry.register(gql`
  fragment AlbumTrackTitleCell_album on Album {
    id
    uri
  }

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
`);

const AlbumTrackTitleCell = ({ album, track }: AlbumTrackTitleCellProps) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const isPlayingInAlbum = playbackState?.context?.uri === album.uri;
  const isCurrentTrack = track.uri === playbackState?.item?.uri;

  return (
    <Flex direction="column" gap="0.5">
      <span
        className="text-base"
        color={isCurrentTrack && isPlayingInAlbum ? 'themeLight' : 'primary'}
      >
        {track.name}
      </span>
      <Flex gap="0.5rem" alignItems="center">
        {track.explicit && <ExplicitBadge />}
        <CommaSeparatedList>
          {track.artists.map((artist) => (
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
