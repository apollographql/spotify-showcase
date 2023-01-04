import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { EpisodeRouteQuery, EpisodeRouteQueryVariables } from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Page from '../../components/Page';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import { parseReleaseDate } from '../../utils/releaseDate';

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
        {format(parseReleaseDate(episode.releaseDate), 'MMM yyyy')}
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
