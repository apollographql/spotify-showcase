import { gql } from '@apollo/client';
import { TrackTitleCell_track as Track } from '../types/api';
import { Music } from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import PlaceholderCoverPhoto from './PlaceholderCoverPhoto';
import Flex from './Flex';
import CommaSeparatedList from './CommaSeparatedList';
import Text from './Text';

interface TrackTitleCellProps {
  track: Track;
}

const TrackTitleCell = ({ track }: TrackTitleCellProps) => {
  return (
    <Flex gap="0.5rem">
      <CoverPhoto
        image={track.album.images[0]}
        fallback={<PlaceholderCoverPhoto icon={Music} />}
        size="2.5rem"
      />
      <Flex direction="column">
        <Text size="base">{track.name}</Text>
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
  );
};

TrackTitleCell.fragments = {
  track: gql`
    fragment TrackTitleCell_track on Track {
      id
      name
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
