import { gql, useSuspenseQuery } from '@apollo/client';
import { TrackRouteQuery, TrackRouteQueryVariables } from '../../types/api';
import { useParams } from 'react-router-dom';
import AlbumTracksTable from '../../components/AlbumTracksTable';
import ArtistTopTracks from '../../components/ArtistTopTracks';
import ArtistTile from '../../components/ArtistTile';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Duration from '../../components/Duration';
import Page from '../../components/Page';
import TileGrid from '../../components/TileGrid';
import Flex from '../../components/Flex';
import useSavedTracksContains from '../../hooks/useSavedTracksContains';

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
          vibrantColor(format: RGB, alpha: 0.9) @client
        }

        ...AlbumTracksTable_album
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

  ${AlbumTracksTable.fragments.album}
  ${ArtistTile.fragments.artist}
  ${ArtistTopTracks.fragments.tracks}
`;

export const RouteComponent = () => {
  const { trackId } = useParams() as { trackId: string };
  const { data } = useSuspenseQuery<TrackRouteQuery, TrackRouteQueryVariables>(
    TRACK_ROUTE_QUERY,
    { variables: { trackId } }
  );

  const track = data.track;

  if (!track) {
    throw new Error('Track not found');
  }

  const { album } = track;
  const coverPhoto = album.images[0];
  const primaryArtist = track.artists[0];

  const tracksContains = useSavedTracksContains(
    album.tracks?.edges.map((edge) => edge.node.id) ?? []
  );

  return (
    <Page bgColor={coverPhoto.vibrantColor}>
      <Page.Header
        mediaType="song"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        details={[
          <EntityLink key={primaryArtist.id} entity={primaryArtist}>
            {primaryArtist.name}
          </EntityLink>,
          <span key="durationMs">
            <Duration durationMs={track.durationMs} />
          </span>,
        ]}
        title={track.name}
      />
      <Page.Content gap="2rem">
        <TileGrid gap="1rem" minTileWidth="200px">
          <ArtistTile key={primaryArtist.id} artist={primaryArtist} />
        </TileGrid>
        <Flex as="section" direction="column" gap="0.5rem">
          <h2>Popular Tracks by {primaryArtist.name}</h2>
          <ArtistTopTracks tracks={primaryArtist.topTracks} />
        </Flex>
        <Flex as="section" direction="column" gap="0.5rem">
          <Flex gap="1rem" alignItems="center">
            <EntityLink entity={album}>
              <CoverPhoto image={coverPhoto} size="5rem" />
            </EntityLink>
            <Flex direction="column">
              <span className="text-xs uppercase">
                From the {album.albumType.toLowerCase()}
              </span>
              <EntityLink className="text-lg" entity={album}>
                {album.name}
              </EntityLink>
            </Flex>
          </Flex>
          <AlbumTracksTable album={album} tracksContains={tracksContains} />
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
