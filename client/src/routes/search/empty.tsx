import React, { useDeferredValue } from 'react';
import {
  useNavigate,
  Outlet,
  useParams,
  useOutletContext,
} from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import SearchQueryForm from '../../components/SearchQueryForm';
import Page from '../../components/Page';

type ContextType = { query: string };

export function useSearchQuery() {
  return useOutletContext<ContextType>();
}

export const RouteComponent = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState(params.query ?? '');
  const deferredQuery = useDeferredValue(query);

  React.useEffect(() => {
    navigate('/search/' + encodeURIComponent(deferredQuery));
  }, [deferredQuery, navigate]);

  return (
    <Page className="p-[var(--main-content--padding)]">
      <SearchQueryForm
        initialValue={query}
        onSubmit={(data) => setQuery(data.query)}
      />
      {deferredQuery ? (
        <Outlet context={{ query: deferredQuery } satisfies ContextType} />
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
