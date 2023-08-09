import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { Library } from 'lucide-react';
import Layout from '../Layout';
import { SidebarQuery, SidebarQueryVariables } from '../../types/api';
import { randomBetween, range } from '../../utils/common';
import Skeleton from '../Skeleton';
import { withHighlight } from '../LoadingStateHighlighter';
import { fragmentRegistry } from '../../apollo/fragmentRegistry';
import SidebarPlaylists from '../SidebarPlaylists';
import SidebarSection from '../SidebarSection';
import SidebarTitle from '../SidebarTitle';

const SIDEBAR_QUERY: TypedDocumentNode<
  SidebarQuery,
  SidebarQueryVariables
> = gql`
  query SidebarQuery($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit) @synthetics(timeout: 2000) {
        edges {
          node {
            id
            images {
              url
            }
            ...SidebarPlaylists_playlists
          }
        }
        pageInfo {
          offset
          limit
          hasNextPage
        }
      }
    }
  }
`;

export const Sidebar = () => {
  const { data, fetchMore } = useSuspenseQuery(SIDEBAR_QUERY, {
    variables: { limit: 50 },
  });

  const me = data.me;

  if (!me || !me.playlists) {
    throw new Error('Oops');
  }

  return (
    <Layout.Sidebar>
      <SidebarSection>
        <SidebarTitle>
          <Library /> Your Library
        </SidebarTitle>
        <SidebarPlaylists
          playlists={me.playlists.edges.map((edge) => edge.node)}
          pageInfo={me.playlists.pageInfo}
          onLoadMore={fetchMore}
        />
      </SidebarSection>
    </Layout.Sidebar>
  );
};

fragmentRegistry.register(gql`
  fragment SidebarQueryFields on PlaylistConnection {
    edges {
      node {
        id
        images {
          url
        }
        ...PlaylistSidebarLink_playlist
      }
    }
    pageInfo {
      offset
      limit
      hasNextPage
    }
  }
`);

Sidebar.LoadingState = withHighlight(
  () => {
    const skeletons = range(0, randomBetween(10, 15));

    return (
      <Layout.Sidebar>
        <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
          <header className="px-4 py-2">
            <h2 className="text-muted flex gap-2 items-center py-2 text-base">
              <Library /> Your Library
            </h2>
          </header>
          <div className="overflow-y-auto flex-1 -mx-1 px-3">
            {skeletons.map((num) => (
              <li key={num} className="px-0 py-2">
                <div className="flex gap-2">
                  <Skeleton.CoverPhoto size="3rem" />
                  <div className="flex flex-col gap-4 flex-1">
                    <Skeleton.Text
                      width={`${randomBetween(40, 60)}%`}
                      fontSize="1rem"
                    />
                    <Skeleton.Text
                      width={`${randomBetween(50, 70)}%`}
                      fontSize="0.75rem"
                    />
                  </div>
                </div>
              </li>
            ))}
          </div>
        </Layout.Sidebar.Section>
      </Layout.Sidebar>
    );
  },
  { shade: '#FF40FF' }
);
