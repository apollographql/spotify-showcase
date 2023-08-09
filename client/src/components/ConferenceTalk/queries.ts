import { gql } from '@apollo/client';

export const CURRENT_USER_MENU_QUERY = gql`
  query CurrentUserMenuQuery {
    me {
      profile {
        id
        ...CurrentUserMenuFields
      }
    }
  }
`;

export const SIDEBAR_QUERY = gql`
  query SidebarQuery($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit) {
        ...SidebarQueryFields
      }
    }
  }
`;

export const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
    me {
      player {
        ...PlaybarQueryFields
      }
    }
  }
`;
