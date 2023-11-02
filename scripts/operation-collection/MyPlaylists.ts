import { gql } from 'graphql-tag';

const query = gql`
  query MyPlaylists($offset: Int, $limit: Int) {
    me {
      playlists(offset: $offset, limit: $limit) {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            name
            uri
          }
        }
      }
    }
  }
`;

export { query };
