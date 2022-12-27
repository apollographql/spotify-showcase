import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { TrackRouteQuery, TrackRouteQueryVariables } from '../../types/api';
import { useParams } from 'react-router-dom';
import AlbumTracksTable from '../../components/AlbumTracksTable';
import ArtistTopTracks from '../../components/ArtistTopTracks';
import ArtistTile from '../../components/ArtistTile';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Duration from '../../components/Duration';
import Page from '../../components/Page';
import Text from '../../components/Text';
import TileGrid from '../../components/TileGrid';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import Flex from '../../components/Flex';

const TRACK_ROUTE_QUERY = gql`
  query TrackRouteQuery($trackId: ID!) {
    track(id: $trackId) {
      id
      durationMs
      name
      album {
        id
        albumType
        name
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
        topTracks {
          id
          ...ArtistTopTracks_tracks
        }

        ...ArtistTile_artist
      }
    }
  }

  ${AlbumTracksTable.fragments.tracks}
  ${ArtistTile.fragments.artist}
  ${ArtistTopTracks.fragments.tracks}
`;

const TrackRoute = () => {
  const { trackId } = useParams() as { trackId: string };
  const { data } = useSuspenseQuery<TrackRouteQuery, TrackRouteQueryVariables>(
    TRACK_ROUTE_QUERY,
    { variables: { trackId } }
  );

  const track = data.track!;
  const { album } = track;
  const coverPhoto = album.images[0];

  useSetBackgroundColorFromImage(coverPhoto, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <Page>
      <Page.Header
        mediaType="song"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
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
      <Page.Content gap="2rem">
        <TileGrid gap="1rem" minTileWidth="200px">
          {track.artists.map((artist) => (
            <ArtistTile key={artist.id} artist={artist} />
          ))}
        </TileGrid>
        {track.artists.map((artist) => (
          <Flex key={artist.id} as="section" direction="column">
            <h2>Popular tracks by {artist.name}</h2>
            <ArtistTopTracks tracks={artist.topTracks} />
          </Flex>
        ))}
        <Flex as="section" direction="column" gap="0.5rem">
          <Flex gap="1rem" alignItems="center">
            <EntityLink entity={album}>
              <CoverPhoto image={coverPhoto} size="5rem" />
            </EntityLink>
            <Flex direction="column">
              <Text size="xs" uppercase>
                From the {album.albumType.toLowerCase()}
              </Text>
              <Text as={EntityLink} size="lg" entity={album}>
                {album.name}
              </Text>
            </Flex>
          </Flex>
          <AlbumTracksTable
            tracks={album.tracks?.edges.map((edge) => edge.node) ?? []}
          />
        </Flex>
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
