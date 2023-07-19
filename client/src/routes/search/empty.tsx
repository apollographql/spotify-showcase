import React, { Suspense, useDeferredValue } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import Skeleton from '../../components/Skeleton';
import SearchQueryForm from '../../components/SearchQueryForm';
import Page from '../../components/Page';
import { RouteComponent as QueryRouteComponent } from './query';
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

export type SearchPageContextType = { query: string };

export function useQuery() {
  return useOutletContext<SearchPageContextType>();
}

export const RouteComponent = () => {
  const params = useParams();
  const [query, setQuery] = React.useState(params.query ?? '');
  const deferredQuery = useDeferredValue(query);

  console.log({ query, deferredQuery });
  return (
    <Page className="p-[var(--main-content--padding)]">
      <SearchQueryForm
        initialValue={query}
        onSubmit={(data) => {
          setQuery(data.query as string);
        }}
      />
      <Suspense fallback={<LoadingState />}>
        <QueryRouteComponent query={deferredQuery} />
      </Suspense>
    </Page>
  );
};
