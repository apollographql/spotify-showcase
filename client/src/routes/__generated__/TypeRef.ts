/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { __TypeKind } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: TypeRef
// ====================================================

export interface TypeRef_ofType_ofType_ofType_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
}

export interface TypeRef_ofType_ofType_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType_ofType_ofType_ofType_ofType_ofType_ofType | null;
}

export interface TypeRef_ofType_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType_ofType_ofType_ofType_ofType_ofType | null;
}

export interface TypeRef_ofType_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType_ofType_ofType_ofType_ofType | null;
}

export interface TypeRef_ofType_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType_ofType_ofType_ofType | null;
}

export interface TypeRef_ofType_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType_ofType_ofType | null;
}

export interface TypeRef_ofType {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType_ofType | null;
}

export interface TypeRef {
  __typename: "__Type";
  kind: __TypeKind;
  name: string | null;
  ofType: TypeRef_ofType | null;
}
