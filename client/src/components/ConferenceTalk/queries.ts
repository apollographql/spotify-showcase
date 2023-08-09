import { gql } from '@apollo/client';

export const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
    me {
      player @synthetics(timeout: 3000) {
        ...PlaybarQueryFields
      }
    }
  }
`;
