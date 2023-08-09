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

export const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
    me {
      player @synthetics(timeout: 3000) {
        ...PlaybarQueryFields
      }
    }
  }
`;

