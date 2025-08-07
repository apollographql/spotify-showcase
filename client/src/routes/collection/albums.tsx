import { gql } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/client/react";
import AlbumTile from '../../components/AlbumTile';
import Skeleton from '../../components/Skeleton';
import TileGrid from '../../components/TileGrid';
import {
  CollectionAlbumsRouteQuery,
  CollectionAlbumsRouteQueryVariables,
} from '../../types/api';
import OffsetBasedPaginationObserver from '../../components/OffsetBasedPaginationObserver';

const COLLECTION_ALBUMS_ROUTE_QUERY = gql`
  query CollectionAlbumsRouteQuery($offset: Int, $limit: Int) {
    me {
      albums(offset: $offset, limit: $limit) {
        pageInfo {
          limit
          offset
          hasNextPage
        }
        edges {
          node {
            id
            ...AlbumTile_album
          }
        }
      }
    }
  }
`;

export const RouteComponent = () => {
  const { data, fetchMore } = useSuspenseQuery<
    CollectionAlbumsRouteQuery,
    CollectionAlbumsRouteQueryVariables
  >(COLLECTION_ALBUMS_ROUTE_QUERY, {
    variables: { limit: 50 },
  });

  if (!data.me || !data.me.albums) {
    throw new Error('Something went wrong');
  }

  const albums = data.me.albums.edges.map((edge) => edge.node);
  const pageInfo = data.me.albums.pageInfo;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Albums</h1>
      <TileGrid gap="1rem" minTileWidth="200px">
        {albums.map((album) => (
          <AlbumTile key={album.id} album={album} />
        ))}
      </TileGrid>
      <OffsetBasedPaginationObserver
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
        template={<Skeleton.MediaTile description />}
        tileCount={15}
        minTileWidth="200px"
      />
    </div>
  );
};
