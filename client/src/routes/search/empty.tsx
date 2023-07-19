import React, { Suspense, useDeferredValue } from 'react';
import { useParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
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

export const RouteComponent = () => {
  const params = useParams();
  const [query, setQuery] = React.useState(params.query ?? '');
  const deferredQuery = useDeferredValue(query);

  return (
    <Page className="p-[var(--main-content--padding)]">
      <SearchQueryForm
        initialValue={query}
        onSubmit={(data) => setQuery(data.query)}
      />
      {deferredQuery ? (
        <Suspense fallback={<LoadingState />}>
          <QueryRouteComponent query={deferredQuery} />
        </Suspense>
      ) : (
        <Page.EmptyState
          icon={<SearchIcon />}
          title="Search for an artist"
          description={"Enter an artist's name to get started"}
        />
      )}
    </Page>
  );
};
