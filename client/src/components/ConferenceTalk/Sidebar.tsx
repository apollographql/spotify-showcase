import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { Library } from 'lucide-react';
import Layout from '../Layout';
import { SidebarQuery, SidebarQueryVariables } from '../../types/api';
import { fragmentRegistry } from '../../apollo/fragmentRegistry';
import SidebarPlaylists from '../SidebarPlaylists';
import SidebarSection from '../SidebarSection';
import SidebarTitle from '../SidebarTitle';
import { SidebarLoadingState } from '../SidebarLoadingState';

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
          ...SidebarPlaylists_pageInfo
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
    throw new Error('Oops, no playlists');
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

Sidebar.LoadingState = SidebarLoadingState;
