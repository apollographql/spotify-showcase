import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { EpisodeRouteQuery, EpisodeRouteQueryVariables } from '../../types/api';
import Button from '../../components/Button';
import CoverPhoto from '../../components/CoverPhoto';
import DelimitedList from '../../components/DelimitedList';
import EntityLink from '../../components/EntityLink';
import EpisodeReleaseDate from '../../components/EpisodeReleaseDate';
import EpisodeRemainingDuration from '../../components/EpisodeRemainingDuration';
import Page from '../../components/Page';
import Text from '../../components/Text';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';

const EPISODE_ROUTE_QUERY = gql`
  query EpisodeRouteQuery($episodeId: ID!) {
    episode(id: $episodeId) {
      id
      name
      releaseDate {
        date
        precision
      }
      show {
        id
        name
        images {
          url
        }
      }

      ...EpisodeRemainingDuration_episode
    }
  }

  ${EpisodeRemainingDuration.fragments.episode}
`;

const EpisodeRoute = () => {
  const { episodeId } = useParams() as { episodeId: string };
  const { data } = useSuspenseQuery<
    EpisodeRouteQuery,
    EpisodeRouteQueryVariables
  >(EPISODE_ROUTE_QUERY, { variables: { episodeId } });

  const episode = data.episode!;
  const { show } = episode;
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
          <EpisodeReleaseDate releaseDate={episode.releaseDate} />
          <EpisodeRemainingDuration episode={episode} />
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
