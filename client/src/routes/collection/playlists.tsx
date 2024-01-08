import { gql, useSuspenseQuery } from '@apollo/client';
import {
  CollectionPlaylistsRouteQuery,
  CollectionTracksRouteQueryVariables,
} from '../../types/api';
import PlaylistTile from '../../components/PlaylistTile';
import TileGrid from '../../components/TileGrid';
import OffsetBasedPaginationObserver from '../../components/OffsetBasedPaginationObserver';
import LikedSongsTile from '../../components/LikedSongsTile';
import MediaTile from '../../components/MediaTile';
import GradientIcon from '../../components/GradientIcon';
import { Bookmark } from 'lucide-react';
import Skeleton from '../../components/Skeleton';

const COLLECTION_PLAYLISTS_ROUTE_QUERY = gql`
  query CollectionPlaylistsRouteQuery($offset: Int, $limit: Int) {
    me {
      user {
        id
      }
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
`;

export const RouteComponent = () => {
  const { data, fetchMore } = useSuspenseQuery<
    CollectionPlaylistsRouteQuery,
    CollectionTracksRouteQueryVariables
  >(COLLECTION_PLAYLISTS_ROUTE_QUERY, { variables: { limit: 50 } });

  if (!data.me || !data.me.playlists || !data.me.tracks || !data.me.episodes) {
    throw new Error('Something went wrong');
  }

  const {
    user: currentUser,
    episodes: { pageInfo: episodePageInfo },
    playlists: { pageInfo: playlistPageInfo, edges: playlistEdges },
    tracks,
  } = data.me;

  const playlists = playlistEdges.map((edge) => edge.node);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Playlists</h1>
      <TileGrid gap="1.5rem" minTileWidth="200px">
        <LikedSongsTile
          connection={tracks}
          className="col-span-2"
          currentUser={currentUser}
        />
        <MediaTile to="/collection/episodes">
          <GradientIcon
            backgroundColor="#056952"
            lucideIcon={Bookmark}
            className="w-full rounded"
            iconSize="50%"
            fill="var(--color--theme)"
          />
          <div className="flex flex-col">
            <MediaTile.Title>Your Episodes</MediaTile.Title>
            <MediaTile.Details>
              <span>{episodePageInfo.total} episodes</span>
            </MediaTile.Details>
          </div>
        </MediaTile>
        {playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </TileGrid>
      <OffsetBasedPaginationObserver
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
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-0 text-2xl">Playlists</h1>
      <Skeleton.TileGrid
        gap="1rem"
        template={<Skeleton.MediaTile description />}
        tileCount={15}
        minTileWidth="200px"
      />
    </div>
  );
};
