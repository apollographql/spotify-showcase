import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { EpisodeRouteQuery, EpisodeRouteQueryVariables } from '../../types/api';
import Button from '../../components/Button';
import CoverPhoto from '../../components/CoverPhoto';
import DelimitedList from '../../components/DelimitedList';
import Duration from '../../components/Duration';
import EntityLink from '../../components/EntityLink';
import Page from '../../components/Page';
import ProgressBar from '../../components/ProgressBar';
import Text from '../../components/Text';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import { parseReleaseDate } from '../../utils/releaseDate';
import Flex from '../../components/Flex';

const EPISODE_ROUTE_QUERY = gql`
  query EpisodeRouteQuery($episodeId: ID!) {
    episode(id: $episodeId) {
      id
      name
      durationMs
      releaseDate {
        date
        precision
      }
      resumePoint {
        fullyPlayed
        resumePositionMs
      }
      show {
        id
        name
        images {
          url
        }
      }
    }
  }
`;

const EpisodeRoute = () => {
  const { episodeId } = useParams() as { episodeId: string };
  const { data } = useSuspenseQuery<
    EpisodeRouteQuery,
    EpisodeRouteQueryVariables
  >(EPISODE_ROUTE_QUERY, { variables: { episodeId } });

  const episode = data.episode!;
  const { show, resumePoint } = episode;
  const coverPhoto = show.images[0];

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        mediaType="podcast episode"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        details={[<EntityLink entity={show}>{show.name}</EntityLink>]}
        title={episode.name}
      />
      <Page.Content>
        <DelimitedList as={Text} color="muted" delimiter=" · ">
          <Text color="muted">
            {format(parseReleaseDate(episode.releaseDate), 'MMM yyyy')}
          </Text>
          {resumePoint.fullyPlayed ? (
            <Flex inline as={Text} color="muted" gap="0.25rem">
              Played <Check color="var(--color--theme)" />
            </Flex>
          ) : resumePoint.resumePositionMs === 0 ? (
            <Duration
              durationMs={episode.durationMs}
              format={Duration.FORMAT.LONG}
            />
          ) : (
            <Flex inline alignItems="center" gap="0.5rem">
              <Text>
                <Duration
                  durationMs={episode.durationMs - resumePoint.resumePositionMs}
                  format={Duration.FORMAT.LONG}
                />{' '}
                left
              </Text>
              <ProgressBar
                max={episode.durationMs}
                value={resumePoint.resumePositionMs}
                width="100px"
              />
            </Flex>
          )}
        </DelimitedList>
        <section>
          <Button as={EntityLink} variant="hollow" entity={show} size="xs">
            See all episodes
          </Button>
        </section>
      </Page.Content>
    </Page>
  );
};

export const LoadingState = () => {
  return (
    <Page>
      <Page.SkeletonHeader />
    </Page>
  );
};

export default EpisodeRoute;
