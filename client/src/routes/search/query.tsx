import { gql, useSuspenseQuery } from '@apollo/client';
import {
  SearchType,
  SearchRouteQuery,
  SearchRouteQueryVariables,
} from '../../types/api';
import Skeleton from '../../components/Skeleton';
import ArtistTile from '../../components/ArtistTile';
import Page from '../../components/Page';
import TileGrid from '../../components/TileGrid';
import { useSearchQuery } from './empty';

const SEARCH_ROUTE_QUERY = gql`
  query SearchRouteQuery($q: String!, $type: [SearchType!]!) {
    search(q: $q, type: $type) {
      artists {
        edges {
          node {
            id
            ...ArtistTile_artist
          }
        }
      }
    }
  }

  ${ArtistTile.fragments.artist}
`;

export const LoadingState = () => {
  return (
    <Page className="p-[var(--main-content--padding)]">
      <div className="flex flex-col gap-4">
        <Skeleton.TileGrid
          gap="1rem"
          template={<Skeleton.MediaTile description coverPhotoShape="circle" />}
          tileCount={15}
          minTileWidth="200px"
        />
      </div>
    </Page>
  );
};

export const RouteComponent = () => {
  const { query } = useSearchQuery();
  const { data } = useSuspenseQuery<
    SearchRouteQuery,
    SearchRouteQueryVariables
  >(SEARCH_ROUTE_QUERY, {
    variables: { q: query, type: SearchType.Artist },
  });
  const artists = data.search?.artists?.edges?.map((edge) => edge.node) ?? [];

  return (
    <Page className="p-[var(--main-content--padding)]">
      <TileGrid gap="1rem" minTileWidth="200px">
        {artists.map((artist) => (
          <ArtistTile ease={false} key={artist.id} artist={artist} />
        ))}
      </TileGrid>
    </Page>
  );
};
