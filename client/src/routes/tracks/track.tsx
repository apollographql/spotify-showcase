import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { TrackRouteQuery, TrackRouteQueryVariables } from '../../types/api';
import { useParams } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Duration from '../../components/Duration';
import Page from '../../components/Page';

const TRACK_ROUTE_QUERY = gql`
  query TrackRouteQuery($trackId: ID!) {
    track(id: $trackId) {
      id
      durationMs
      name
      album {
        id
        images {
          url
        }
      }
      artists {
        id
        name
      }
    }
  }
`;

const TrackRoute = () => {
  const { trackId } = useParams() as { trackId: string };
  const { data } = useSuspenseQuery<TrackRouteQuery, TrackRouteQueryVariables>(
    TRACK_ROUTE_QUERY,
    { variables: { trackId } }
  );

  const track = data.track!;

  console.log(track);

  return (
    <Page>
      <Page.Header
        mediaType="song"
        coverPhoto={<CoverPhoto image={track.album.images[0]} />}
        details={[
          ...track.artists.map((artist) => (
            <EntityLink key={artist.id} entity={artist}>
              {artist.name}
            </EntityLink>
          )),
          <Duration durationMs={track.durationMs} />,
        ]}
        title={track.name}
      />
      <Page.Content />
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

export default TrackRoute;
