import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { AlbumRouteQuery, AlbumRouteQueryVariables } from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import PlaceholderCoverPhoto from '../../components/PlaceholderCoverPhoto';
import Flex from '../../components/Flex';
import { Music } from 'lucide-react';

const ALBUM_ROUTE_QUERY = gql`
  query AlbumRouteQuery($albumId: ID!) {
    album(id: $albumId) {
      id
      images {
        url
      }
    }
  }
`;

const AlbumRoute = () => {
  const { albumId } = useParams() as { albumId: 'string' };
  const { data } = useSuspenseQuery<AlbumRouteQuery, AlbumRouteQueryVariables>(
    ALBUM_ROUTE_QUERY,
    { variables: { albumId } }
  );

  const album = data.album!;
  const images = album.images ?? [];
  const coverPhoto = images[0];

  return (
    <Flex direction="column">
      <Flex as="header" gap="2rem" alignItems="end">
        <CoverPhoto
          src={coverPhoto.url}
          fallback={<PlaceholderCoverPhoto icon={Music} />}
          size="250px"
        />
      </Flex>
    </Flex>
  );
};

export const LoadingState = () => null;

export default AlbumRoute;
