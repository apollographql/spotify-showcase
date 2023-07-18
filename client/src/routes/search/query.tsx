import { useDeferredValue } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useSuspenseQuery } from '@apollo/client';
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
        <h1>Hello</h1>
      </div>
    </Page>
  );
};

export const RouteComponent = ({ query }) => {
  const params = useParams();
  // const deferredQuery = useDeferredValue(params.query);
  const { data } = useSuspenseQuery(SEARCH_ROUTE_QUERY, {
    variables: { q: query, type: ['ARTIST'] },
    skip: !query,
  });
  console.log({ data });
  return (
    <Page className="p-[var(--main-content--padding)]">
      <h1>Results</h1>
      {/* @ts-ignore */}
      {data?.search?.artists?.edges?.map(({ node }) => (<p key={node.id}>{node.name}</p>))}
    </Page>
  );
};
