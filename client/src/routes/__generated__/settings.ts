import * as Types from '../../types/globalTypes.codegen';

export type SettingsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SettingsQuery = {
  __typename: 'Query';
  developer: {
    __typename: 'Developer';
    fieldConfigs: Array<{
      __typename: 'FieldConfig';
      timeout: number;
      errorRate: any;
      schemaField: {
        __typename: 'SchemaField';
        fieldName: string;
        typename: string;
      };
    }>;
  };
};
