import { gql } from '@apollo/client';
import { AlbumTrackTitleCell_track as Track } from '../types/api';
import CommaSeparatedList from './CommaSeparatedList';
import EntityLink from './EntityLink';
import ExplicitBadge from './ExplicitBadge';
import Flex from './Flex';
import Text from './Text';

interface AlbumTrackTitleCellProps {
  track: Track;
}

const AlbumTrackTitleCell = ({ track }: AlbumTrackTitleCellProps) => {
  return (
    <Flex direction="column" gap="0.5">
      <Text size="base">{track.name}</Text>
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
  track: gql`
    fragment AlbumTrackTitleCell_track on Track {
      id
      name
      explicit
      artists {
        id
        name
      }
    }
  `,
};

export default AlbumTrackTitleCell;
