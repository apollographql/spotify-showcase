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

interface QueryRouteComponentProps {
  query: string;
}

export const RouteComponent = ({ query }: QueryRouteComponentProps) => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery<
    SearchRouteQuery,
    SearchRouteQueryVariables
  >(SEARCH_ROUTE_QUERY, {
    variables: { q: query, type: SearchType.Artist },
  });
  const artists = data.search?.artists?.edges?.map((edge) => edge.node) ?? [];

  // Synchronises something external (app state reflected in URL) with the
  // latest search query.
  React.useEffect(() => {
    navigate('/search/' + encodeURIComponent(query), { replace: true });
  }, [query, navigate]);

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
