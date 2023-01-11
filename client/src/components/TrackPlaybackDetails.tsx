import { gql } from '@apollo/client';
import { TrackPlaybackDetails_track as Track } from '../types/api';
import DelimitedList from './DelimitedList';
import EntityLink from './EntityLink';
import Flex from './Flex';
import Text from './Text';

interface TrackPlaybackDetailsProps {
  track: Track;
}

const TrackPlaybackDetails = ({ track }: TrackPlaybackDetailsProps) => {
  return (
    <Flex direction="column" gap="0.25rem">
      <Text size="sm">
        <EntityLink entity={track.album}>{track.name}</EntityLink>
      </Text>
      <Text size="xs" color="muted">
        <DelimitedList delimiter=", ">
          {track.artists.map((artist) => (
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          ))}
        </DelimitedList>
      </Text>
    </Flex>
  );
};

TrackPlaybackDetails.fragments = {
  track: gql`
    fragment TrackPlaybackDetails_track on Track {
      id
      name
      album {
        id
        name
      }
      artists {
        id
        name
      }
    }
  `,
};

export default TrackPlaybackDetails;
