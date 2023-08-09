import { gql } from '@apollo/client';

export const CURRENT_USER_MENU_QUERY = gql`
  query CurrentUserMenuQuery {
    me {
      profile @synthetics(timeout: 1000) {
        ...CurrentUserMenuFields
      }
    }
  }
`;

export const SIDEBAR_QUERY = gql`
  query SidebarQuery($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit) @synthetics(timeout: 2000) {
        ...SidebarQueryFields
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
