import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { AlbumRouteQuery, AlbumRouteQueryVariables } from '../../types/api';
import Page from '../../components/Page';
import EntityLink from '../../components/EntityLink';
import { yearOfRelease } from '../../utils/releaseDate';
import { pluralize } from '../../utils/string';

const ALBUM_ROUTE_QUERY = gql`
  query AlbumRouteQuery($albumId: ID!) {
    album(id: $albumId) {
      id
      albumType
      name
      totalTracks
      artists {
        id
        name
      }
      images {
        url
      }
      releaseDate {
        date
        precision
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
    <Page>
      <Page.Header
        coverPhoto={{ src: coverPhoto?.url }}
        title={album.name}
        mediaType={album.albumType}
        details={[
          ...album.artists.map((artist) => (
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          )),
          <span>{yearOfRelease(album.releaseDate)}</span>,
          <span>
            {album.totalTracks} {pluralize('song', album.totalTracks)}
          </span>,
        ]}
      />
    </Page>
  );
};

export const LoadingState = () => (
  <Page>
    <Page.SkeletonHeader />
  </Page>
);

export default AlbumRoute;
