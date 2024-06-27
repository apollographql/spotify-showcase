import * as Types from '../../types/globalTypes.codegen';

export type UpdateFieldConfigMutationVariables = Types.Exact<{
  input: Types.UpdateFieldConfigInput;
}>;

export type UpdateFieldConfigMutation = {
  __typename: 'Mutation';
  updateFieldConfig: {
    __typename: 'UpdateFieldConfigPayload';
    fieldConfig: {
      __typename: 'FieldConfig';
      timeout: number;
      errorRate: any;
      schemaField: {
        __typename: 'SchemaField';
        fieldName: string;
        typename: string;
      };
    } | null;
  } | null;
};
