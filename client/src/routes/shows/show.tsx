import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ShowRouteQuery, ShowRouteQueryVariables } from '../../types/api';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import CoverPhoto from '../../components/CoverPhoto';
import DelimitedList from '../../components/DelimitedList';
import Duration from '../../components/Duration';
import EntityLink from '../../components/EntityLink';
import EpisodeRemainingDuration from '../../components/EpisodeRemainingDuration';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import ReleaseDate from '../../components/ReleaseDate';
import Text from '../../components/Text';
import styles from './show.module.scss';

const SHOW_ROUTE_QUERY = gql`
  query ShowRouteQuery($showId: ID!) {
    show(id: $showId) {
      id
      description(format: HTML)
      name
      publisher
      episodes {
        edges {
          node {
            id
            name
            durationMs
            releaseDate {
              date
              precision
            }

            ...EpisodeRemainingDuration_episode
          }
        }
      }
      images {
        url
      }
    }
  }

  ${EpisodeRemainingDuration.fragments.episode}
`;

const ShowRoute = () => {
  const { showId } = useParams() as { showId: string };
  const { data } = useSuspenseQuery<ShowRouteQuery, ShowRouteQueryVariables>(
    SHOW_ROUTE_QUERY,
    { variables: { showId } }
  );

  const show = data.show!;
  const coverPhoto = show.images[0];

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        mediaType="podcast"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={show.name}
        details={[<span key="publisher">{show.publisher}</span>]}
      />
      <Page.Content>
        <section className={styles.mainSection}>
          <Flex direction="column" gap="1rem">
            <h2>All episodes</h2>
            <ul className={styles.episodeList}>
              {show.episodes?.edges.map(({ node }) => (
                <li key={node.id} className={styles.episode}>
                  <CoverPhoto image={coverPhoto} size="100px" />
                  <Flex direction="column" justifyContent="space-between">
                    <EntityLink className={styles.episodeName} entity={node}>
                      {node.name}
                    </EntityLink>
                    <DelimitedList
                      as={Text}
                      delimiter=" · "
                      color="muted"
                      size="sm"
                    >
                      <ReleaseDate releaseDate={node.releaseDate} />
                      <EpisodeRemainingDuration episode={node} />
                    </DelimitedList>
                  </Flex>
                </li>
              ))}
            </ul>
          </Flex>
          <Flex direction="column" gap="1rem">
            <h2>About</h2>
            <Text
              as="p"
              color="muted"
              dangerouslySetInnerHTML={{ __html: show.description }}
            />
          </Flex>
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

export default ShowRoute;
