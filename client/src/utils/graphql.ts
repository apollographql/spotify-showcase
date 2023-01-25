import { gql } from '@apollo/client';

export const BARE_INTROSPECTION_FRAGMENT = gql`
  fragment BareIntrospectionFragment on Query {
    __schema {
      types {
        name
        kind
        fields {
          name
          description
          type {
            ...TypeRef
          }
        }
      }
    }
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
