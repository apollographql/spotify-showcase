import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ShowRouteQuery, ShowRouteQueryVariables } from '../../types/api';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import CoverPhoto from '../../components/CoverPhoto';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import Text from '../../components/Text';
import styles from './show.module.scss';

const SHOW_ROUTE_QUERY = gql`
  query ShowRouteQuery($showId: ID!) {
    show(id: $showId) {
      id
      description(format: HTML)
      name
      publisher
      images {
        url
      }
    }
  }
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
          <div>
            <h2>All episodes</h2>
          </div>
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
