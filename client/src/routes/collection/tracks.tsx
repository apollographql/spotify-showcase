import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Get } from 'type-fest';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CollectionTracksRouteQuery,
  CollectionTracksRouteQueryVariables,
} from '../../types/api';
import DateTime from '../../components/DateTime';
import Page from '../../components/Page';
import Table from '../../components/Table';
import Text from '../../components/Text';
import TrackTitleCell from '../../components/TrackTitleCell';
import useSetBackgroundColor from '../../hooks/useSetBackgroundColor';
import { Clock } from 'lucide-react';
import Duration from '../../components/Duration';

type SavedTrackEdge = NonNullable<
  Get<CollectionTracksRouteQuery, 'me.tracks.edges[0]'>
>;

const COLLECTION_TRACKS_ROUTE_QUERY = gql`
  query CollectionTracksRouteQuery {
    me {
      tracks {
        edges {
          addedAt
          node {
            id
            name
            durationMs

            ...TrackTitleCell_track
          }
        }
      }
    }
  }

  ${TrackTitleCell.fragments.track}
`;

const CollectionTracksRoute = () => {
  const { data } = useSuspenseQuery<
    CollectionTracksRouteQuery,
    CollectionTracksRouteQueryVariables
  >(COLLECTION_TRACKS_ROUTE_QUERY);

  useSetBackgroundColor('#1F3363');

  return (
    <Page>
      <Page.Content>
        <Table data={data.me?.tracks?.edges ?? []} columns={columns} />
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

const columnHelper = createColumnHelper<SavedTrackEdge>();

const columns = [
  columnHelper.display({
    id: 'number',
    header: '#',
    cell: (info) => <Text color="muted">{info.row.index + 1}</Text>,
    meta: {
      headerAlign: 'center',
      shrink: true,
    },
  }),
  columnHelper.accessor('node', {
    header: 'Title',
    cell: (info) => <TrackTitleCell track={info.getValue()} />,
  }),
  columnHelper.accessor('addedAt', {
    header: 'Date added',
    cell: (info) => (
      <DateTime date={info.getValue()} format={DateTime.FORMAT.timeAgo} />
    ),
  }),
  columnHelper.accessor('node.durationMs', {
    header: () => <Clock size="1rem" />,
    cell: (info) => <Duration durationMs={info.getValue()} />,
    meta: {
      headerAlign: 'right',
      shrink: true,
    },
  }),
];

export default CollectionTracksRoute;
