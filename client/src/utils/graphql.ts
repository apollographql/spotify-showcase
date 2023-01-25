import { gql } from '@apollo/client';
import { __TypeKind } from '../types/api';

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

interface SchemaType {
  name: string | null;
  kind: __TypeKind;
  ofType?: SchemaType | null;
}

export const toSDL = (type: SchemaType): string => {
  switch (type.kind) {
    case __TypeKind.NonNull:
      return `${toSDL(type.ofType!)}!`;
    case __TypeKind.List:
      return `[${toSDL(type.ofType!)}]`;
    default:
      return type.name ?? '';
  }
};
