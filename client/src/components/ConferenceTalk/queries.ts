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
