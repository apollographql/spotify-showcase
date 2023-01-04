import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ShowRouteQuery, ShowRouteQueryVariables } from '../../types/api';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import CoverPhoto from '../../components/CoverPhoto';
import Page from '../../components/Page';

const SHOW_ROUTE_QUERY = gql`
  query ShowRouteQuery($showId: ID!) {
    show(id: $showId) {
      id
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
        details={[<span>{show.publisher}</span>]}
      />
      <Page.Content>Stuff here</Page.Content>
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
