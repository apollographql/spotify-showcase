import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { EpisodeRemainingDuration_episode as Episode } from '../types/api';
import { Check } from 'lucide-react';
import Duration from './Duration';
import Flex from './Flex';
import ProgressBar from './ProgressBar';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface EpisodeRemainingDurationProps {
  episode: FragmentType<Episode>;
}

const EpisodeRemainingDurationFragment: TypedDocumentNode<Episode> = gql`
  fragment EpisodeRemainingDuration_episode on Episode {
    id
    durationMs
    resumePoint {
      fullyPlayed
      resumePositionMs
    }
  }
`;

fragmentRegistry.register(EpisodeRemainingDurationFragment);

const EpisodeRemainingDuration = ({
  episode,
}: EpisodeRemainingDurationProps) => {
  const { data, complete } = useFragment({
    fragment: EpisodeRemainingDurationFragment,
    from: episode,
  });

  if (!complete) {
    return null;
  }

  const { resumePoint, durationMs } = data;

  if (resumePoint.fullyPlayed) {
    return (
      <Flex inline as="span" gap="0.25rem">
        Played <Check color="var(--color--theme)" />
      </Flex>
    );
  }

  if (
    resumePoint.resumePositionMs > 0 &&
    resumePoint.resumePositionMs <= durationMs
  ) {
    return (
      <Flex inline alignItems="center" gap="0.5rem">
        <span>
          <Duration
            durationMs={data.durationMs - resumePoint.resumePositionMs}
            format={Duration.FORMAT.LONG}
          />{' '}
          left
        </span>
        <ProgressBar
          max={data.durationMs}
          value={resumePoint.resumePositionMs}
          width="100px"
        />
      </Flex>
    );
  }

  return <Duration durationMs={durationMs} format={Duration.FORMAT.LONG} />;
};

export default EpisodeRemainingDuration;
