import { Suspense, useDeferredValue } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useSuspenseQuery } from '@apollo/client';
import { useQuery } from './empty';
import Page from '../../components/Page';

const SEARCH_ROUTE_QUERY = gql`
  query SearchRouteQuery($q: String!, $type: [SearchType!]!) {
    search(q: $q, type: $type) {
      artists {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
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

const DataFetching = ({ query }) => {
  const { data } = useSuspenseQuery(SEARCH_ROUTE_QUERY, {
    variables: { q: query, type: ['ARTIST'] },
    skip: !query,
  });
  return (
    <Page className="p-[var(--main-content--padding)]">
      {/* <h1>Results</h1> */}
      {/* @ts-ignore */}
      {data?.search?.artists?.edges?.map(({ node }) => (
        <p key={node.id}>{node.name}</p>
      ))}
    </Page>
  );
};

export const RouteComponent = () => {
  const { query } = useQuery();
  return (
    <Page className="p-[var(--main-content--padding)]">
      <h1>Results</h1>
      <Suspense fallback={<LoadingState />}>
        <DataFetching query={query} />
      </Suspense>
    </Page>
  );
};
