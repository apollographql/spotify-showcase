import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { AlbumRouteQuery, AlbumRouteQueryVariables } from '../../types/api';
import AlbumTracksTable from '../../components/AlbumTracksTable';
import Page from '../../components/Page';
import EntityLink from '../../components/EntityLink';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import { yearOfRelease } from '../../utils/releaseDate';
import { pluralize } from '../../utils/string';
import CoverPhoto from '../../components/CoverPhoto';
import Text from '../../components/Text';
import ReleaseDate from '../../components/ReleaseDate';
import Flex from '../../components/Flex';

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
      copyrights {
        text
        type
      }
      images {
        url
      }
      releaseDate {
        date
        precision
      }
      tracks {
        edges {
          node {
            id
            durationMs
            name
            trackNumber

            ...AlbumTracksTable_tracks
          }
        }
      }
    }
  }

  ${AlbumTracksTable.fragments.tracks}
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

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={album.name}
        mediaType={album.albumType}
        details={[
          ...album.artists.map((artist) => (
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          )),
          <span key="releaseDate">{yearOfRelease(album.releaseDate)}</span>,
          <span key="song">
            {album.totalTracks} {pluralize('song', album.totalTracks)}
          </span>,
        ]}
      />
      <Page.Content>
        <AlbumTracksTable
          tracks={album.tracks?.edges.map((edge) => edge.node) ?? []}
        />
        <Flex direction="column">
          <Text as="div" color="muted" size="sm">
            <ReleaseDate releaseDate={album.releaseDate} />
          </Text>
          {album.copyrights.map((copyright) => (
            <Text
              key={copyright.text.concat(copyright.type ?? '')}
              color="muted"
              size="xxs"
            >
              {copyright.text}
            </Text>
          ))}
        </Flex>
      </Page.Content>
    </Page>
  );
};

export const LoadingState = () => (
  <Page>
    <Page.SkeletonHeader />
  </Page>
);

export default AlbumRoute;
