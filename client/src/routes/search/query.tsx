import React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
// import { useQuery } from './empty';
import { useNavigate } from 'react-router-dom';
import {
  SearchType,
  SearchRouteQuery,
  SearchRouteQueryVariables,
} from '../../types/api';
import ArtistTile from '../../components/ArtistTile';
import Page from '../../components/Page';
import TileGrid from '../../components/TileGrid';
import { SearchPageContextType } from './empty';

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
        <h1>Loading</h1>
      </div>
    </Page>
  );
};

const DataFetching = ({ query }: SearchPageContextType) => {
  const { data } = useSuspenseQuery<
    SearchRouteQuery,
    SearchRouteQueryVariables
  >(SEARCH_ROUTE_QUERY, {
    variables: { q: query, type: SearchType.Artist },
    // fetchPolicy: 'network-only',
  });
  const artists = data.search?.artists?.edges?.map((edge) => edge.node) ?? [];

  return (
    <Page className="p-[var(--main-content--padding)]">
      <TileGrid gap="1rem" minTileWidth="200px">
        {artists.map((artist) => (
          <ArtistTile key={artist.id} artist={artist} />
        ))}
      </TileGrid>
    </Page>
  );
};

export const RouteComponent = ({ query }) => {
  const navigate = useNavigate();

  // Synchronises something external (app state reflected in URL) with the
  // latest search term.
  React.useEffect(() => {
    navigate('/search/' + encodeURIComponent(query), { replace: true });
  }, [query, navigate]);

  if (!query) {
    return null;
  }
  return <DataFetching query={query} />;
};
