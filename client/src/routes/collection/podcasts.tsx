import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
  TypedDocumentNode,
} from '@apollo/client';
import CoverPhoto from '../../components/CoverPhoto';
import MediaTile from '../../components/MediaTile';
import OffsetBasedPaginationObserver from '../../components/OffsetBasedPaginationObserver';
import Skeleton from '../../components/Skeleton';
import TileGrid from '../../components/TileGrid';
import YourEpisodesTile from '../../components/YourEpisodesTile';
import {
  CollectionPodcastsRouteQuery,
  CollectionPodcastsRouteQueryVariables,
} from '../../types/api';

const COLLECTION_PODCASTS_ROUTE_QUERY: TypedDocumentNode<
  CollectionPodcastsRouteQuery,
  CollectionPodcastsRouteQueryVariables
> = gql`
  query CollectionPodcastsRouteQuery($limit: Int, $offset: Int) {
    me {
      episodes(limit: 10) {
        ...YourEpisodesTile_connection
      }
      shows(offset: $offset, limit: $limit) {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            name
            publisher
            images {
              url
            }
          }
        }
      }
    }
  }

  ${YourEpisodesTile.fragments.connection}
`;

const PAGINATED_QUERY = gql`
  query CollectionPodcastsRoutePaginatedQuery($limit: Int, $offset: Int) {
    me {
      shows(limit: $limit, offset: $offset) {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            name
            publisher
            images {
              url
            }
          }
        }
      }
    }
  }
`;

const CollectionPodcastsRoute = () => {
  const { data, fetchMore } = useSuspenseQuery(COLLECTION_PODCASTS_ROUTE_QUERY);

  if (!data.me || !data.me.shows || !data.me.episodes) {
    throw new Error('Something went wrong');
  }

  const {
    episodes,
    shows: { pageInfo, edges },
  } = data.me;

  return (
    <div>
      <TileGrid gap="1.5rem" minTileWidth="200px">
        <YourEpisodesTile connection={episodes} className="col-span-2" />
        {edges.map(({ node }) => (
          <MediaTile
            key={node.id}
            coverPhoto={<CoverPhoto image={node.images[0]} />}
            title={node.name}
            description={node.publisher}
            to={`/shows/${node.id}`}
          />
        ))}
      </TileGrid>
      <OffsetBasedPaginationObserver
        pageInfo={pageInfo}
        fetchMore={(config) => fetchMore({ ...config, query: PAGINATED_QUERY })}
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
export default CollectionPodcastsRoute;
