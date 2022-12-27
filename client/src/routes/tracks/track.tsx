import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { TrackRouteQuery, TrackRouteQueryVariables } from '../../types/api';
import { useParams } from 'react-router-dom';
import AlbumTracksTable from '../../components/AlbumTracksTable';
import ArtistTile from '../../components/ArtistTile';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Duration from '../../components/Duration';
import Page from '../../components/Page';
import TileGrid from '../../components/TileGrid';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';

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
        tracks {
          edges {
            node {
              id

              ...AlbumTracksTable_tracks
            }
          }
        }
      }
      artists {
        id
        name

        ...ArtistTile_artist
      }
    }
  }

  ${AlbumTracksTable.fragments.tracks}
  ${ArtistTile.fragments.artist}
`;

const TrackRoute = () => {
  const { trackId } = useParams() as { trackId: string };
  const { data } = useSuspenseQuery<TrackRouteQuery, TrackRouteQueryVariables>(
    TRACK_ROUTE_QUERY,
    { variables: { trackId } }
  );

  const track = data.track!;

  useSetBackgroundColorFromImage(track.album.images[0], {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

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
          <span>
            <Duration durationMs={track.durationMs} />
          </span>,
        ]}
        title={track.name}
      />
      <Page.Content>
        <TileGrid gap="1rem" minTileWidth="200px">
          {track.artists.map((artist) => (
            <ArtistTile key={artist.id} artist={artist} />
          ))}
        </TileGrid>
        <section>
          <AlbumTracksTable
            tracks={track.album.tracks?.edges.map((edge) => edge.node) ?? []}
          />
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

export default TrackRoute;
