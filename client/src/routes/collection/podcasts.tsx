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
import {
  CollectionPodcastsRouteQuery,
  CollectionPodcastsRouteQueryVariables,
} from '../../types/api';

const COLLECTION_PODCASTS_ROUTE_QUERY: TypedDocumentNode<
  CollectionPodcastsRouteQuery,
  CollectionPodcastsRouteQueryVariables
> = gql`
  query CollectionPodcastsRouteQuery {
    me {
      shows {
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

  if (!data.me || !data.me.shows) {
    throw new Error('Something went wrong');
  }

  const shows = data.me.shows.edges.map((edge) => edge.node);
  const pageInfo = data.me.shows.pageInfo;

  return (
    <div>
      <TileGrid gap="1.5rem" minTileWidth="200px">
        {shows.map((show) => (
          <MediaTile
            key={show.id}
            coverPhoto={<CoverPhoto image={show.images[0]} />}
            title={show.name}
            description={show.publisher}
            to={`/shows/${show.id}`}
          />
        ))}
      </TileGrid>
      <OffsetBasedPaginationObserver
        pageInfo={pageInfo}
        fetchMore={fetchMore}
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
