import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  CollectionPlaylistsRouteQuery,
  CollectionTracksRouteQueryVariables,
} from '../../types/api';
import PlaylistTile from '../../components/PlaylistTile';
import TileGrid from '../../components/TileGrid';
import PaginationObserver from '../../components/PaginationObserver';

const COLLECTION_PLAYLISTS_ROUTE_QUERY = gql`
  query CollectionPlaylistsRouteQuery($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit)
        @connection(key: "collectionPlaylists") {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            ...PlaylistTile_playlist
          }
        }
      }
    }
  }

  ${PlaylistTile.fragments.playlist}
`;

const CollectionPlaylistsRoute = () => {
  const { data, fetchMore } = useSuspenseQuery<
    CollectionPlaylistsRouteQuery,
    CollectionTracksRouteQueryVariables
  >(COLLECTION_PLAYLISTS_ROUTE_QUERY, {
    suspensePolicy: 'initial',
    variables: { limit: 50 },
  });

  const pageInfo = data.me?.playlists?.pageInfo;
  const playlists = data.me?.playlists?.edges?.map((edge) => edge.node) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Playlists</h1>
      <TileGrid gap="1.5rem" minTileWidth="200px">
        {playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </TileGrid>
      <PaginationObserver fetchMore={fetchMore} pageInfo={pageInfo} />
    </div>
  );
};

export const LoadingState = () => {
  return <div />;
};

export default CollectionPlaylistsRoute;
