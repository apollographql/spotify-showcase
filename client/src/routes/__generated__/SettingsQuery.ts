/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SettingsQuery
// ====================================================

export interface SettingsQuery_developer_fieldConfigs_schemaField {
  __typename: "SchemaField";
  /**
   * The name of the field in the type (ex: `firstName`)
   */
  fieldName: string;
  /**
   * The parent type name in the schema (ex: `User`)
   */
  typename: string;
}

export interface SettingsQuery_developer_fieldConfigs {
  __typename: "FieldConfig";
  /**
   * The schema field that includes this config
   */
  schemaField: SettingsQuery_developer_fieldConfigs_schemaField;
  /**
   * The synthetic timeout configured for the field.
   */
  timeout: number;
  /**
   * The synthetic error rate configured for the field.
   */
  errorRate: any;
}

export interface SettingsQuery_developer {
  __typename: "Developer";
  /**
   * A list of configured GraphQL fields. Only fields that have non-zero timeouts
   * and error rates will be listed.
   */
  fieldConfigs: SettingsQuery_developer_fieldConfigs[];
}

export interface SettingsQuery {
  /**
   * Get a list of developer-specific settings, such as GraphQL field configuration.
   */
  developer: SettingsQuery_developer;
}
