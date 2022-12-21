import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ArtistRouteQuery, ArtistRouteQueryVariables } from '../../types/api';
import Page from '../../components/Page';
import Text from '../../components/Text';
import styles from './artist.module.scss';

const ARTIST_ROUTE_QUERY = gql`
  query ArtistRouteQuery($artistId: ID!) {
    artist(id: $artistId) {
      id
      name
      followers {
        total
      }
      images {
        url
      }
    }
  }
`;

const ArtistRoute = () => {
  const { artistId } = useParams() as { artistId: string };

  const { data } = useSuspenseQuery<
    ArtistRouteQuery,
    ArtistRouteQueryVariables
  >(ARTIST_ROUTE_QUERY, {
    variables: { artistId },
  });

  const artist = data.artist!;
  const image = artist.images[0];

  return (
    <Page>
      <header
        className={styles.header}
        style={{ backgroundImage: `url(${image.url})` }}
      >
        <Page.Title>{artist.name}</Page.Title>
        <Text>
          {new Intl.NumberFormat().format(artist.followers.total)} followers
        </Text>
      </header>
    </Page>
  );
};

export const LoadingState = () => null;

export default ArtistRoute;
