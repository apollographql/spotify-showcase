import { gql } from '@apollo/client';

export const CURRENT_USER_MENU_QUERY = gql`
  query CurrentUserMenuQuery {
    me {
      profile @synthetics(timeout: 1000) {
        id
        ...CurrentUserMenuFields
      }
    }
  }
`;

export const SIDEBAR_QUERY = gql`
  query SidebarQuery($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit) @synthetics(timeout: 2000) {
        edges {
          node {
            id
            ...SidebarQueryFields
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

export const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
    me {
      player @synthetics(timeout: 3000) {
        ...PlaybarQueryFields
      }
    }
  }
`;
