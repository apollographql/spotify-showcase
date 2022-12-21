import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { Get } from 'type-fest';
import { AlbumRouteQuery, AlbumRouteQueryVariables } from '../../types/api';
import AlbumTrackTitleCell from '../../components/AlbumTrackTitleCell';
import Page from '../../components/Page';
import Table from '../../components/Table';
import EntityLink from '../../components/EntityLink';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import { yearOfRelease } from '../../utils/releaseDate';
import { pluralize } from '../../utils/string';
import { Clock } from 'lucide-react';
import Duration from '../../components/Duration';
import Text from '../../components/Text';
import ReleaseDate from '../../components/ReleaseDate';
import Flex from '../../components/Flex';

type AlbumTrack = NonNullable<
  Get<AlbumRouteQuery, 'album.tracks.edges[0].node'>
>;

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

            ...AlbumTrackTitleCell_track
          }
        }
      }
    }
  }

  ${AlbumTrackTitleCell.fragments.track}
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

  useSetBackgroundColorFromImage(coverPhoto?.url, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

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
      <Page.Content>
        <Table
          columns={columns}
          data={album.tracks?.edges.map((edge) => edge.node) ?? []}
        />
        <Flex direction="column">
          <Text as="div" color="muted" size="sm">
            <ReleaseDate releaseDate={album.releaseDate} />
          </Text>
          {album.copyrights.map((copyright) => (
            <Text key={copyright.text} color="muted" size="xxs">
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

const columnHelper = createColumnHelper<AlbumTrack>();

const columns = [
  columnHelper.accessor('trackNumber', { header: '#', meta: { shrink: true } }),
  columnHelper.display({
    id: 'title',
    header: 'Title',
    cell: (info) => {
      return <AlbumTrackTitleCell track={info.row.original} />;
    },
  }),
  columnHelper.accessor('durationMs', {
    header: () => <Clock size="1rem" />,
    cell: (info) => <Duration durationMs={info.getValue()} />,
    meta: {
      headerAlign: 'right',
      shrink: true,
    },
  }),
];

export default AlbumRoute;
