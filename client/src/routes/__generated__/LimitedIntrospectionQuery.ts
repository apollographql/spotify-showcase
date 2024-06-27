/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { __TypeKind } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: LimitedIntrospectionQuery
// ====================================================

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType_ofType_ofType_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType_ofType_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields_type {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: LimitedIntrospectionQuery___schema_types_fields_type_ofType | null;
}

export interface LimitedIntrospectionQuery___schema_types_fields {
  __typename: "__Field";
  name: string;
  description: string | null;
  type: LimitedIntrospectionQuery___schema_types_fields_type;
}

export interface LimitedIntrospectionQuery___schema_types {
  __typename: "__Type";
  name: string | null;
  kind: __TypeKind;
  fields: LimitedIntrospectionQuery___schema_types_fields[] | null;
}

export interface LimitedIntrospectionQuery___schema {
  __typename: "__Schema";
  /**
   * A list of all types supported by this server.
   */
  types: LimitedIntrospectionQuery___schema_types[];
}

export interface LimitedIntrospectionQuery {
  __schema: LimitedIntrospectionQuery___schema;
}
