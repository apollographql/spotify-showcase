import { gql } from '@apollo/client';
import { EpisodePlaybackDetails_episode as Episode } from '../types/api';
import EntityLink from './EntityLink';
import Flex from './Flex';
import Text from './Text';

interface EpisodePlaybackDetailsProps {
  episode: Episode;
}

const EpisodePlaybackDetails = ({ episode }: EpisodePlaybackDetailsProps) => {
  return (
    <Flex direction="column" gap="0.25rem">
      <Text size="sm">
        <EntityLink entity={episode}>{episode.name}</EntityLink>
      </Text>
      <Text size="xs" color="muted">
        <EntityLink entity={episode.show}>{episode.show.name}</EntityLink>
      </Text>
    </Flex>
  );
};

EpisodePlaybackDetails.fragments = {
  episode: gql`
    fragment EpisodePlaybackDetails_episode on Episode {
      id
      name
      show {
        id
        name
      }
    }
  `,
};

export default EpisodePlaybackDetails;
