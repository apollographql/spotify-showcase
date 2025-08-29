import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';
import {
  CollectionArtistsRouteQuery,
  CollectionArtistsRouteQueryVariables,
} from '../../types/api';
import ArtistTile from '../../components/ArtistTile';
import CursorBasedPaginationObserver from '../../components/CursorBasedPaginationObserver';
import TileGrid from '../../components/TileGrid';
import Skeleton from '../../components/Skeleton';

const COLLECTION_ARTISTS_ROUTE_QUERY = gql`
  query CollectionArtistsRouteQuery($after: String) {
    me {
      followedArtists(after: $after) {
        pageInfo {
          cursors {
            after
          }
        }
        edges {
          node {
            id
            ...ArtistTile_artist
          }
        }
      }
    }
  }
`;

export const RouteComponent = () => {
  const { data, fetchMore } = useSuspenseQuery<
    CollectionArtistsRouteQuery,
    CollectionArtistsRouteQueryVariables
  >(COLLECTION_ARTISTS_ROUTE_QUERY);

  const pageInfo = data.me?.followedArtists?.pageInfo;
  const artists =
    data.me?.followedArtists?.edges.map((edge) => edge.node) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Artists</h1>
      <TileGrid gap="1rem" minTileWidth="200px">
        {artists.map((artist) => (
          <ArtistTile key={artist.id} artist={artist} />
        ))}
      </TileGrid>
      <CursorBasedPaginationObserver
        fetchMore={fetchMore}
        pageInfo={pageInfo}
        threshold="500px"
      />
    </div>
  );
};

export const LoadingState = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Artists</h1>
      <Skeleton.TileGrid
        gap="1rem"
        template={<Skeleton.MediaTile description coverPhotoShape="circle" />}
        tileCount={15}
        minTileWidth="200px"
      />
    </div>
  );
};
