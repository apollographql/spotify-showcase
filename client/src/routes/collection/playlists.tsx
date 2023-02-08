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
import LikedSongsTile from '../../components/LikedSongsTile';
import MediaTile from '../../components/MediaTile';
import GradientIcon from '../../components/GradientIcon';
import { Bookmark } from 'lucide-react';

const COLLECTION_PLAYLISTS_ROUTE_QUERY = gql`
  query CollectionPlaylistsRouteQuery($offset: Int, $limit: Int) {
    me {
      episodes {
        pageInfo {
          total
        }
      }
      tracks(limit: 10) @connection(key: "collectionPlaylistsTracks") {
        # We need to select this data here even though its present in the
        # fragment due to a bug in the cache. Without re-selecting the fields
        # here, the data comes back empty.
        pageInfo {
          total
        }
        edges {
          node {
            id
            name
            artists {
              id
              name
            }
          }
        }
        ...LikedSongsTile_connection
      }
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

  ${LikedSongsTile.fragments.connection}
  ${PlaylistTile.fragments.playlist}
`;

const PAGINATED_QUERY = gql`
  query CollectionPlaylistsRoutePaginatedQuery($offset: Int, $limit: Int) {
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

  if (!data.me || !data.me.playlists || !data.me.tracks || !data.me.episodes) {
    throw new Error('Something went wrong');
  }

  const {
    episodes: { pageInfo: episodePageInfo },
    playlists: { pageInfo: playlistPageInfo, edges: playlistEdges },
    tracks,
  } = data.me;

  const playlists = playlistEdges.map((edge) => edge.node);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Playlists</h1>
      <TileGrid gap="1.5rem" minTileWidth="200px">
        <LikedSongsTile connection={tracks} className="col-span-2" />
        <MediaTile
          to="/collection/episodes"
          title="Your Episodes"
          description={`${episodePageInfo.total} episodes`}
          coverPhoto={
            <GradientIcon
              backgroundColor="#056952"
              lucideIcon={Bookmark}
              className="w-full rounded"
              iconSize="50%"
              fill="var(--color--theme)"
            />
          }
        />
        {playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </TileGrid>
      <PaginationObserver
        fetchMore={({ variables }) =>
          fetchMore({ query: PAGINATED_QUERY, variables })
        }
        pageInfo={playlistPageInfo}
        threshold="500px"
      />
    </div>
  );
};

export const LoadingState = () => {
  return <div />;
};

export default CollectionPlaylistsRoute;
